import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import ExamSessionService from '../../../service/examSession.service';
import { ExamSession, SessionStatus } from '../../../types';

import Ongoing from './Ongoing';
import Review from './Review';

const MockTest: FC = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEnding, setIsEnding] = useState(false);
  const [exam, setExam] = useState<ExamSession>();

  const { data: readOnlyExam, isLoading } = useQuery({
    enabled: !!params?.sessionId,
    queryKey: ['exam-session', params.sessionId],
    queryFn: async () => {
      const { data } = await ExamSessionService.getById(params.sessionId as string);
      setIsEnding(false);
      setExam(data.payload);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: 'always',
  });

  const submit = useMutation({
    mutationFn: async () => {
      await ExamSessionService.submit(params.sessionId as string);
      queryClient.invalidateQueries(['exam-session', exam?.fromExam._id]);
      queryClient.invalidateQueries(['exam-session', params.sessionId]);
    },
    onError: () => {
      toast.error('Đã có lỗi trong lúc nộp bài!');
    },
  });

  useEffect(() => {
    if (
      exam?.status === SessionStatus.ENDED &&
      pathname === `/room/tests/session/${params.sessionId}`
    ) {
      navigate(`/room/tests/review/session/${params.sessionId}`, { replace: true });
    }
  }, [exam, navigate, params, pathname]);

  if (isLoading || submit.isLoading || isEnding || !exam || !readOnlyExam) {
    return <Loading />;
  }

  return readOnlyExam.status === SessionStatus.ONGOING ? (
    <Ongoing exam={exam} handleSubmit={submit} setIsEnding={setIsEnding} setExam={setExam} />
  ) : (
    <Review exam={readOnlyExam} />
  );
};

export default MockTest;
