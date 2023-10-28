import { useWindowDimensions } from '../../hooks';
import { QuizSession } from '../../types';

import Desktop from './Desktop';
import Mobile from './Mobile';

const QuestionBoard: React.FC<{ quiz: QuizSession }> = ({ quiz }) => {
  const { width } = useWindowDimensions();

  if (width < 768) {
    return <Mobile quiz={quiz} />;
  }

  return <Desktop quiz={quiz} />;
};

export default QuestionBoard;
