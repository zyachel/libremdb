import ErrorInfo from '../components/error/ErrorInfo';

const Error404 = () => {
  return <ErrorInfo message='Not found, sorry.' statusCode={404} />;
};

export default Error404;
