import { UseMutationResult, useQuery } from '@tanstack/react-query';

import { useWindowDimensions } from '../../hooks';
import ExamSessionService from '../../service/examSession.service';
import QuizSessionService from '../../service/quizSession.service';
import { ExamSession, QuizSession } from '../../types';

import Desktop from './Desktop';
import Mobile from './Mobile';

const QuestionBoard: React.FC<{
  quiz?: QuizSession;
  exam?: ExamSession;
  currentSet: number[];
  setCurrentSetIndex: (index: number) => void;
  handleSubmit?: UseMutationResult<void, unknown, void, unknown>;
  handleReview?: () => void;
}> = ({
  quiz: placeholderQuiz,
  exam: placeholderExam,
  currentSet,
  handleSubmit,
  setCurrentSetIndex,
  handleReview,
}) => {
  const { width } = useWindowDimensions();

  const { data: quiz } = useQuery({
    queryKey: [placeholderQuiz?._id, 'question board'],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(placeholderQuiz?._id as string);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    placeholderData: placeholderQuiz,
    enabled: !!placeholderQuiz,
  });

  const { data: exam } = useQuery({
    queryKey: [placeholderExam?._id, 'question board'],
    queryFn: async () => {
      const { data } = await ExamSessionService.getById(placeholderExam?._id as string);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    placeholderData: placeholderExam,
    enabled: !!placeholderExam,
  });

  if (!quiz && !exam) {
    return null;
  }

  if (width < 768) {
    return (
      <Mobile
        quiz={quiz}
        exam={exam}
        currentSet={currentSet}
        setCurrentSetIndex={setCurrentSetIndex}
        submit={handleSubmit}
        handleReview={handleReview}
      />
    );
  }

  return (
    <Desktop
      quiz={quiz}
      exam={exam}
      currentSet={currentSet}
      setCurrentSetIndex={setCurrentSetIndex}
      submit={handleSubmit}
      handleReview={handleReview}
    />
  );
};

export default QuestionBoard;
