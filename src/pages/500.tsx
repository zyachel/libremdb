import ErrorInfo from '../components/error/ErrorInfo';

const Error500 = () => {
  return <ErrorInfo message="server messed up, sorry." statusCode={500} />;
};
export default Error500;
