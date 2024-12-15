import ErrorInfo from 'src/components/error/ErrorInfo';
import { useRouter } from 'next/router';

const ReviewsPage = () => {
  const router = useRouter();
  return <ErrorInfo message='Not yet implemented' statusCode={503} originalPath={router.asPath} />;
};

export default ReviewsPage;
