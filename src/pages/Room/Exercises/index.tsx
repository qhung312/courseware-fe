import { useParams } from 'react-router-dom';

import Detail from './Detail';
import Main from './Main';

const Exercises: React.FC = () => {
  const params = useParams();

  if (params?.quizId === undefined) {
    return <Main />;
  }

  return <Detail />;
};

export default Exercises;
