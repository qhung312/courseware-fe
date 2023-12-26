import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import { socket } from '../../../../socket';
import { ExamSession, SocketEvent } from '../../../../types';

import DesktopOngoing from './DesktopOngoing';
import MobileOngoing from './MobileOngoing';

const Detail: React.FC<{
  exam: ExamSession;
  handleSubmit: UseMutationResult<void, unknown, void, unknown>;
  setIsEnding: Dispatch<SetStateAction<boolean>>;
  setExam: Dispatch<SetStateAction<ExamSession | undefined>>;
}> = ({ exam, handleSubmit, setIsEnding, setExam }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  useEffect(() => {
    const onEndExamSession = () => {
      toast.success('Đã nộp bài!');
      setIsEnding(true);
      queryClient.invalidateQueries(['exam-session', exam?.fromExam._id]);
      queryClient.invalidateQueries(['exam-session', params.sessionId]);
    };

    socket.on(SocketEvent.END_EXAM_SESSION, onEndExamSession);

    return () => {
      socket.off(SocketEvent.END_EXAM_SESSION, onEndExamSession);
    };
  }, [params, navigate, queryClient, pathname, setIsEnding, exam]);

  return (
    <Page
      title={`${exam.fromExam.subject.name ? ` - ${exam.fromExam.subject.name}` : ''}${
        exam.fromExam.name ? ` - ${exam.fromExam.name}` : ''
      }`}
    >
      {width < 768 ? (
        <MobileOngoing exam={exam} handleSubmit={handleSubmit} setExam={setExam} />
      ) : (
        <DesktopOngoing exam={exam} handleSubmit={handleSubmit} setExam={setExam} />
      )}
    </Page>
  );
};

export default Detail;
