import { useWindowDimensions } from '../../hooks';
import { QuizSession } from '../../types';

import Desktop from './Desktop';
import Mobile from './Mobile';

const QuestionBoard: React.FC<{
  quiz: QuizSession;
  currentSet: number[];
  setCurrentSetIndex: (index: number) => void;
  handleSubmit: () => void;
}> = ({ quiz, currentSet, handleSubmit, setCurrentSetIndex }) => {
  const { width } = useWindowDimensions();

  if (width < 768) {
    return (
      <Mobile
        quiz={quiz}
        currentSet={currentSet}
        setCurrentSetIndex={setCurrentSetIndex}
        submit={handleSubmit}
      />
    );
  }

  return (
    <Desktop
      quiz={quiz}
      currentSet={currentSet}
      setCurrentSetIndex={setCurrentSetIndex}
      submit={handleSubmit}
    />
  );
};

export default QuestionBoard;
