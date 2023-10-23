import { useParams } from 'react-router-dom';

import DetailPage from './DetailPage';
import MainPage from './MainPage';

const Exercises: React.FC = () => {
  const params = useParams();
  console.log(params);

  if (params?.quizId === undefined) {
    return <MainPage />;
  }

  return <DetailPage />;
};

export default Exercises;
