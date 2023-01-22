import ErrorInfo from '../components/error/ErrorInfo';

const Error500 = () => {
  return <ErrorInfo message='Server messed up, sorry.' statusCode={500} />;
};
export default Error500;
