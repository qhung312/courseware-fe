import { useState } from 'react';

import Quiz from '../../../../data/exercises';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';

import DesktopReview from './DesktopReview';
import MobileReview from './MobileReview';

const OngoingDetail: React.FC = () => {
  const [quiz] = useState(Quiz);
  const { width } = useWindowDimensions();

  return (
    <Page title={`${quiz.fromQuiz.subject.name} - ${quiz.fromQuiz.chapter.name}`}>
      {width < 768 ? <MobileReview quiz={quiz} /> : <DesktopReview quiz={quiz} />}
    </Page>
  );
};

export default OngoingDetail;
