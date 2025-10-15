import { ChangeEvent, ChangeEventHandler, FormEventHandler, TouchEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { direction, keys, ratings, sortBy } from 'src/utils/constants/titleReviewsFilters';
import styles from 'src/styles/modules/components/titleReviews/form.module.scss';

type Props = {
  className?: string;
  titleId: string;
};

interface FormState {
  ratings: string,
  sortBy: string,
  direction: string,
  spoilers: boolean
}

const Filters = ({ className, titleId }: Props) => {
  const router = useRouter();

  // restore filter settings from URL query params
  const params = router.query;
  const orderingStr = (params['sort'] ?? '').toString().split(" ");
  const [formState, setFormState] = useState<FormState>({
    ratings: params['rating']?.toString() ?? ratings.types[0].val,
    sortBy: orderingStr.length == 2 ? orderingStr[0] : sortBy.types[0].val,
    direction: orderingStr.length == 2 ? orderingStr[1] : direction.types[0].val,
    spoilers: params['spoiler'] ? true : false,
  })

  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    // build new url query params matching the scheme of IMDB
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('rating', formState.ratings);
    urlSearchParams.append('sort', `${formState.sortBy} ${formState.direction}`);
    if (formState.spoilers) urlSearchParams.append('spoiler', 'EXCLUDE');

    router.push(`/title/${titleId}/reviews?${urlSearchParams.toString()}`);
  };

  return (
    <form
      action={`/title/${titleId}/reviews`}
      onSubmit={submitHandler}
      className={`${className} ${styles.form}`}
    >
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Filter by Rating</legend>
        <RadioBtns data={ratings} className={styles.radio} handleChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({...formState, ratings: e.target.value})} defaultValue={formState.ratings} />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Sort by</legend>
        <RadioBtns data={sortBy} className={styles.radio} handleChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({...formState, sortBy: e.target.value})} defaultValue={formState.sortBy} />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Direction</legend>
        <RadioBtns data={direction} className={styles.radio} handleChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({...formState, direction: e.target.value})} defaultValue={formState.direction} />
      </fieldset>
      <p className={styles.exact}>
        <label htmlFor='spoiler'>Hide Spoilers</label>
        <input type='checkbox' name='spoiler' id='spoiler' value='hide' onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState({...formState, spoilers: e.target.value == 'hide'})} defaultChecked={formState.spoilers} />
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
  defaultValue,
  className,
  handleChange,
}: {
  data: typeof ratings | typeof sortBy | typeof direction;
  className: string;
  defaultValue: string,
  handleChange: ChangeEventHandler<HTMLInputElement>;
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
          onChange={handleChange}
          defaultChecked={val == defaultValue}
        />
        <label htmlFor={`${data.key}:${val}`}>{name}</label>
      </p>
    ))}
  </>
);

export default Filters;
