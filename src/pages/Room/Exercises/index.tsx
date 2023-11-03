import { useLocation, useParams } from 'react-router-dom';

import Detail from './Detail';
import Main from './Main';
import Review from './Review';

const Exercises: React.FC = () => {
  const { pathname } = useLocation();
  const pathTokens = pathname.split('/');
  const params = useParams();

  if (params?.quizId === undefined) {
    return <Main />;
  }

  if (pathTokens.includes('review')) {
    return <Review />;
  }

  return <Detail />;
};

export default Exercises;
