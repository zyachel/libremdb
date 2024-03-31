import { FormEventHandler, useRef } from 'react';
import { useRouter } from 'next/router';
import { cleanQueryStr } from 'src/utils/helpers';
import { direction, keys, ratings, sortBy } from 'src/utils/constants/titleReviewsFilters';
import styles from 'src/styles/modules/components/titleReviews/form.module.scss';

type Props = {
  className?: string;
  titleId: string;
};

const Filters = ({ className, titleId }: Props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const formEl = formRef.current!;
    const formData = new FormData(formEl);

    const entries = Object.fromEntries(formData.entries()) as Record<string, string>;
    const queryStr = cleanQueryStr(entries, keys);

    router.push(`/title/${titleId}/reviews?${queryStr}`);
  };

  return (
    <form
      action={`/title/${titleId}/reviews`}
      onSubmit={submitHandler}
      ref={formRef}
      className={`${className} ${styles.form}`}
    >
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Filter by Rating</legend>
        <RadioBtns data={ratings} className={styles.radio} />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Sort by</legend>
        <RadioBtns data={sortBy} className={styles.radio} />
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={`heading ${styles.fieldset__heading}`}>Direction</legend>
        <RadioBtns data={direction} className={styles.radio} />
      </fieldset>
      <p className={styles.exact}>
        <label htmlFor='spoiler'>Hide Spoilers</label>
        <input type='checkbox' name='spoiler' id='spoiler' value='hide' />
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
  data: typeof ratings | typeof sortBy | typeof direction;
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

export default Filters;
