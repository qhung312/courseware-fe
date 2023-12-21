import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import { socket } from '../../../../socket';
import { QuizSession, SocketEvent } from '../../../../types';

import DesktopOngoing from './DesktopOngoing';
import MobileOngoing from './MobileOngoing';

const Detail: React.FC<{
  quiz: QuizSession;
  handleSubmit: UseMutationResult<void, unknown, void, unknown>;
  setIsEnding: Dispatch<SetStateAction<boolean>>;
}> = ({ quiz, handleSubmit, setIsEnding }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onEndQuizSession = () => {
      toast.success('Đã nộp bài!');
      queryClient.invalidateQueries([params.sessionId]);
      setIsEnding(true);
    };

    socket.on(SocketEvent.END_QUIZ_SESSION, onEndQuizSession);

    return () => {
      socket.off(SocketEvent.END_QUIZ_SESSION, onEndQuizSession);
    };
  }, [params, navigate, queryClient, pathname, setIsEnding]);

  return (
    <Page
      title={`${quiz.fromQuiz.subject.name ? ` - ${quiz.fromQuiz.subject.name}` : ''}${
        quiz.fromQuiz.name ? ` - ${quiz.fromQuiz.name}` : ''
      }`}
    >
      {width < 768 ? (
        <MobileOngoing quiz={quiz} handleSubmit={handleSubmit} />
      ) : (
        <DesktopOngoing quiz={quiz} handleSubmit={handleSubmit} />
      )}
    </Page>
  );
};

export default Detail;
