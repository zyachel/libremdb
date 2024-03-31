import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { cleanQueryStr } from 'src/utils/helpers';
import { QueryTypes } from 'src/interfaces/shared/search';
import { resultTypes, resultTitleTypes, findFilterable } from 'src/utils/constants/find';
import styles from 'src/styles/modules/components/form/find.module.scss';

type Props = {
  className?: string;
};

const Form = ({ className }: Props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // title types can't be selected unless type selected is 'title'
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
    const query = formData.get('q');
    if (typeof query !== 'string' || !query.trim()) return setIsDisabled(false);

    const queryParams = Object.fromEntries(
      formData.entries() as IterableIterator<[string, string]>
    );
    const queryStr = cleanQueryStr(queryParams, findFilterable);

    router.push(`/find?${queryStr}`);
    formEl.reset();
  };

  return (
    <form
      action='/find'
      onSubmit={submitHandler}
      ref={formRef}
      className={`${className} ${styles.form}`}
    >
      <p className='heading heading__primary'>Search</p>

      <p className={styles.searchbar}>
        <svg
          className={`icon ${styles.searchbar__icon}`}
          focusable='false'
          aria-hidden='true'
          role='img'
        >
          <use href='/svg/sprite.svg#icon-search'></use>
        </svg>
        <input
          id='searchbar'
          type='search'
          name='q'
          placeholder='movies, people...'
          className={styles.searchbar__input}
          required
          minLength={2}
        />
        <label className='visually-hidden' htmlFor='searchbar'>
          Search for anything
        </label>
      </p>
      <fieldset className={styles.types} onChange={typesChangeHandler}>
        <legend className={`heading ${styles.types__heading}`}>Filter by Type</legend>
        <RadioBtns data={resultTypes} className={styles.type} />
      </fieldset>
      <fieldset className={styles.titleTypes} disabled={isDisabled}>
        <legend className={`heading ${styles.titleTypes__heading}`}>Filter by Title Type</legend>
        <RadioBtns data={resultTitleTypes} className={styles.titleType} />
      </fieldset>
      <p className={styles.exact}>
        <label htmlFor='exact'>Exact Matches</label>
        <input type='checkbox' name='exact' id='exact' value='true' />
      </p>
      <div className={styles.buttons}>
        <button type='reset' className={styles.button}>
          Clear
        </button>
        <button type='submit' className={styles.button}>
          Submit
        </button>
      </div>
    </form>
  );
};

const RadioBtns = ({
  data,
  className,
}: {
  data: typeof resultTypes | typeof resultTitleTypes;
  className: string;
}) => (
  <>
    {data.types.map(({ name, val }) => (
      <p className={className} key={val}>
        <input
          type='radio'
          name={data.key}
          id={`${data.key}:${val}`}
          value={val}
          className='visually-hidden'
        />
        <label htmlFor={`${data.key}:${val}`}>{name}</label>
      </p>
    ))}
  </>
);

export default Form;
