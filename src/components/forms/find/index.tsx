import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { cleanQueryStr } from '../../../utils/helpers';
import { resultTypes, resultTitleTypes } from '../../../utils/constants/find';

import styles from '../../../styles/modules/components/form/find.module.scss';
import { QueryTypes } from '../../../interfaces/shared/search';

/**
 * helper function to render similar radio btns. saves from boilerplate.
 * @param data radio btn obj
 * @param parentClass class under which radio input and label will be
 * @returns JSX array of radios
 */
const renderRadioBtns = (
  data: typeof resultTypes | typeof resultTitleTypes,
  parentClass: string
) => {
  return data.types.map(({ name, val }) => (
    <p className={parentClass} key={val}>
      <input
        type="radio"
        name={data.key}
        id={`${data.key}:${val}`}
        value={val}
        className="visually-hidden"
      />
      <label htmlFor={`${data.key}:${val}`}>{name}</label>
    </p>
  ));
};

type Props = {
  className?: string;
};

// MAIN FUNCTION
const Form = ({ className }: Props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // title types can't be selected unless type selected is 'title'. below is the logic for disabling/enabling titleTypes.
  const typesChangeHandler: ChangeEventHandler<HTMLFieldSetElement> = e => {
    const el = e.target as unknown as HTMLInputElement; // we have only radios that'll fire change event.
    const value = el.value as QueryTypes;

    if (value === 'tt') setIsDisabled(false);
    else setIsDisabled(true);
  };

  // preventing page refresh and instead handling submission through js
  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const formEl = formRef.current!;
    const formData = new FormData(formEl);
    const query = (formData.get('q') as string).trim();

    const entries = [...formData.entries()] as [string, string][];
    const queryStr = cleanQueryStr(entries);

    if (query) router.push(`/find?${queryStr}`);
    formEl.reset();
  };

  return (
    <form
      action="/find"
      onSubmit={submitHandler}
      ref={formRef}
      className={`${className} ${styles.form}`}
    >
      <p className="heading heading__primary">Search</p>

      <p className={styles.searchbar}>
        <svg
          className={`icon ${styles.searchbar__icon}`}
          focusable="false"
          aria-hidden="true"
          role="img"
        >
          <use href="/svg/sprite.svg#icon-search"></use>
        </svg>
        <input
          id="searchbar"
          type="search"
          name="q"
          placeholder="movies, people..."
          className={styles.searchbar__input}
        />
        <label className="visually-hidden" htmlFor="searchbar">
          Search for anything
        </label>
      </p>
      <fieldset className={styles.types} onChange={typesChangeHandler}>
        <legend className={`heading ${styles.types__heading}`}>
          Filter by Type
        </legend>
        {renderRadioBtns(resultTypes, styles.type)}
      </fieldset>
      <fieldset className={styles.titleTypes} disabled={isDisabled}>
        <legend className={`heading ${styles.titleTypes__heading}`}>
          Filter by Title Type
        </legend>
        {renderRadioBtns(resultTitleTypes, styles.titleType)}
      </fieldset>
      <p className={styles.exact}>
        <label htmlFor="exact">Exact Matches</label>
        <input type="checkbox" name="exact" id="exact" value="true" />
      </p>
      <div className={styles.buttons}>
        <button type="reset" className={styles.button}>
          Clear
        </button>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
