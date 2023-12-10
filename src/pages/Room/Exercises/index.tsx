import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Loading } from '../../../components';
import QuizSessionService from '../../../service/quizSession.service';

import Detail from './Detail';
import Main from './Main';
import Review from './Review';

import 'react-toastify/dist/ReactToastify.css';

const Exercises: React.FC = () => {
  const params = useParams();

  const { data: quiz, isLoading } = useQuery({
    enabled: !!params?.quizId,
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      {params?.quizId === undefined ? (
        <Main />
      ) : isLoading ? (
        <Loading />
      ) : quiz ? (
        quiz.status === 'ENDED' ? (
          <Review quiz={quiz} />
        ) : (
          <Detail quiz={quiz} />
        )
      ) : null}
      <ToastContainer position='bottom-right' draggable={false} />
    </>
  );
};

export default Exercises;
