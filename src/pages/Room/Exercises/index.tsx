import { useParams } from 'react-router-dom';

import DetailPage from './DetailPage';
import MainPage from './MainPage';

const Exercises: React.FC = () => {
  const params = useParams();

  if (params?.chapterId === undefined) {
    return <MainPage />;
  }

  return <DetailPage />;
};

export default Exercises;
