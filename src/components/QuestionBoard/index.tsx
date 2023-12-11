import { UseMutationResult, useQuery } from '@tanstack/react-query';

import { useWindowDimensions } from '../../hooks';
import QuizSessionService from '../../service/quizSession.service';
import { QuizSession } from '../../types';

import Desktop from './Desktop';
import Mobile from './Mobile';

const QuestionBoard: React.FC<{
  quiz: QuizSession;
  currentSet: number[];
  setCurrentSetIndex: (index: number) => void;
  handleSubmit?: UseMutationResult<void, unknown, void, unknown>;
  handleReview?: () => void;
}> = ({ quiz: placeholderQuiz, currentSet, handleSubmit, setCurrentSetIndex, handleReview }) => {
  const { width } = useWindowDimensions();
  console.log(['quiz', placeholderQuiz.fromQuiz._id, placeholderQuiz._id, 'question board']);
  const { data: quiz } = useQuery({
    queryKey: ['quiz', placeholderQuiz.fromQuiz._id, placeholderQuiz._id, 'question board'],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(placeholderQuiz._id as string);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    placeholderData: placeholderQuiz,
  });

  if (!quiz) {
    return null;
  }

  if (width < 768) {
    return (
      <Mobile
        quiz={quiz}
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
      currentSet={currentSet}
      setCurrentSetIndex={setCurrentSetIndex}
      submit={handleSubmit}
      handleReview={handleReview}
    />
  );
};

export default QuestionBoard;
