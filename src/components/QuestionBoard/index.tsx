import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useWindowDimensions } from '../../hooks';
import QuizSessionService from '../../service/quizSession.service';
import { QuizSession } from '../../types';

import Desktop from './Desktop';
import Mobile from './Mobile';

const QuestionBoard: React.FC<{ quiz: QuizSession; currentSet: number[] }> = ({
  quiz,
  currentSet,
}) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathTokens = pathname.split('/');
  const params = useParams();
  const queryClient = useQueryClient();

  const submit = useMutation({
    mutationFn: async () => {
      await QuizSessionService.submit(quiz._id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['quiz', params.quizId, params.sessionId]);
      navigate(
        `/room/exercises/${params.subjectId}/quiz/${params.quizId}/review/session/${params.sessionId}`
      );
    },
  });

  if (width < 768) {
    return (
      <Mobile
        quiz={quiz}
        currentSet={currentSet}
        submit={
          pathTokens.includes('review')
            ? () => navigate(`/room/exercises/${params.subjectId}`)
            : submit.mutate
        }
      />
    );
  }

  return (
    <Desktop
      quiz={quiz}
      currentSet={currentSet}
      submit={
        pathTokens.includes('review')
          ? () => navigate(`/room/exercises/${params.subjectId}`)
          : submit.mutate
      }
    />
  );
};

export default QuestionBoard;
