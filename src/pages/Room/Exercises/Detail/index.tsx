import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import QuizSessionService from '../../../../service/quizSession.service';
import { socket } from '../../../../socket';
import { QuizStatus, SocketEvent } from '../../../../types';

import DesktopOngoing from './DesktopOngoing';
import MobileOngoing from './MobileOngoing';

const Detail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onEndQuizSession = async () => {
      await queryClient.invalidateQueries(['quiz', params.quizId, params.sessionId]);
      navigate(
        `/room/exercises/${params.subjectId}/quiz/${params.quizId}/review/session/${params.sessionId}`
      );
    };

    socket.on(SocketEvent.END_QUIZ_SESSION, onEndQuizSession);

    return () => {
      socket.off(SocketEvent.END_QUIZ_SESSION, onEndQuizSession);
    };
  }, [params, navigate, queryClient]);

  useEffect(() => {
    if (quiz?.status === QuizStatus.ENDED) {
      navigate(
        `/room/exercises/${params.subjectId}/quiz/${params.quizId}/review/session/${params.sessionId}`
      );
    }
  }, [quiz, navigate, params]);

  if (isLoading || !quiz) {
    return (
      <Page title='Loading...'>
        <Loading />
      </Page>
    );
  }

  return (
    <Page title={`${quiz?.fromQuiz.subject.name} - ${quiz?.fromQuiz.chapter.name}`}>
      {width < 768 ? <MobileOngoing quiz={quiz} /> : <DesktopOngoing quiz={quiz} />}
    </Page>
  );
};

export default Detail;
