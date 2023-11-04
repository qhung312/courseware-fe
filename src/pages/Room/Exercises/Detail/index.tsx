import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Loading } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import QuizSessionService from '../../../../service/quizSession.service';

import DesktopOngoing from './DesktopOngoing';
import MobileOngoing from './MobileOngoing';

const Detail: React.FC = () => {
  const params = useParams();
  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
    staleTime: Infinity,
  });
  const { width } = useWindowDimensions();

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
