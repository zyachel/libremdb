import { useRouter } from 'next/router';
import { formatNumber } from 'src/utils/helpers';
import { CardResult } from 'src/components/card';
import TitleReviews from 'src/interfaces/shared/titleReviews';

type Props = {
  meta: TitleReviews['meta'];
  className?: string;
};

const Card = ({ meta, className }: Props) => {
  return (
    <CardResult
      as='div'
      showImage
      name={`${meta.title} ${meta.year}`}
      link={`/title/${meta.titleId}`}
      image={meta.image ?? undefined}
      className={className}
    >
      <h1 className='heading heading__primary'>User Reviews</h1>
      <p>{formatNumber(meta.numReviews)} reviews</p>
    </CardResult>
  );
};

type BasicCardProps = {
  meta: TitleReviewsCursored['meta'];
  className?: string;
};
export const BasicCard = ({ meta, className }: BasicCardProps) => {
  const { titleId } = useRouter().query;

  return (
    <CardResult
      as='div'
      showImage
      name={meta.title ?? ''}
      link={`/title/${titleId}`}
      className={className}
    >
      <h1 className='heading heading__primary'>User Reviews</h1>
    </CardResult>
  );
};

export default Card;
