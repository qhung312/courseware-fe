import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Loading } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import QuizSessionService from '../../../../service/quizSession.service';

import DesktopReview from './DesktopReview';
import MobileReview from './MobileReview';

const Review: React.FC = () => {
  const params = useParams();
  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
  });
  const { width } = useWindowDimensions();

  if (isLoading || !quiz) {
    return <Loading />;
  }

  return (
    <Page title={`Xem lại - ${quiz.fromQuiz.subject.name} - ${quiz.fromQuiz.name}`}>
      {width < 768 ? <MobileReview quiz={quiz} /> : <DesktopReview quiz={quiz} />}
    </Page>
  );
};

export default Review;
