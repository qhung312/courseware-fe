import { useLocation, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Detail from './Detail';
import Main from './Main';
import Review from './Review';

const Exercises: React.FC = () => {
  const { pathname } = useLocation();
  const pathTokens = pathname.split('/');
  const params = useParams();

  return (
    <>
      {params?.quizId === undefined ? (
        <Main />
      ) : pathTokens.includes('review') ? (
        <Review />
      ) : (
        <Detail />
      )}
      <ToastContainer position='bottom-right' draggable={false} />
    </>
  );
};

export default Exercises;
