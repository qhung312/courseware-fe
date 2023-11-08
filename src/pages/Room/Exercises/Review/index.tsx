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
  const {
    data: quiz,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
    refetchOnWindowFocus: true,
  });
  const { width } = useWindowDimensions();

  if (isLoading || isFetching || !quiz) {
    return <Loading />;
  }

  return (
    <Page title={`${quiz.fromQuiz.subject.name} - ${quiz.fromQuiz.chapter.name}`}>
      {width < 768 ? <MobileReview quiz={quiz} /> : <DesktopReview quiz={quiz} />}
    </Page>
  );
};

export default Review;
