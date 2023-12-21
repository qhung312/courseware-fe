import { useQuery } from '@tanstack/react-query';

import { Loading } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import ExamSessionService from '../../../../service/examSession.service';
import { ExamSession } from '../../../../types';

import DesktopReview from './DesktopReview';
import MobileReview from './MobileReview';

const Review: React.FC<{ exam: ExamSession }> = ({ exam }) => {
  const { width } = useWindowDimensions();

  const { data: summary } = useQuery({
    queryKey: ['exam-summary', exam._id],
    queryFn: async () => {
      const { data } = await ExamSessionService.getSummary(exam._id);
      return data.payload;
    },
    refetchOnWindowFocus: false,
  });

  if (!summary) {
    return <Loading />;
  }

  return (
    <Page
      title={`Xem lại ${exam.fromExam.subject.name ? ` - ${exam.fromExam.subject.name}` : ''}${
        exam.fromExam.name ? ` - ${exam.fromExam.name}` : ''
      }`}
    >
      {width < 768 ? (
        <MobileReview exam={exam} summary={summary} />
      ) : (
        <DesktopReview exam={exam} summary={summary} />
      )}
    </Page>
  );
};

export default Review;
