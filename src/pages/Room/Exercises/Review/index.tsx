import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import { QuizSession } from '../../../../types';

import DesktopReview from './DesktopReview';
import MobileReview from './MobileReview';

const Review: React.FC<{ quiz: QuizSession }> = ({ quiz }) => {
  const { width } = useWindowDimensions();

  return (
    <Page
      title={`Xem lại${quiz.fromQuiz.subject.name ? ` - ${quiz.fromQuiz.subject.name}` : ''}${
        quiz.fromQuiz.name ? ` - ${quiz.fromQuiz.name}` : ''
      }`}
    >
      {width < 768 ? <MobileReview quiz={quiz} /> : <DesktopReview quiz={quiz} />}
    </Page>
  );
};

export default Review;
