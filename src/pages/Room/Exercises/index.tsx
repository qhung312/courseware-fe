import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Loading } from '../../../components';
import QuizSessionService from '../../../service/quizSession.service';

import Detail from './Detail';
import Main from './Main';
import Review from './Review';

import 'react-toastify/dist/ReactToastify.css';

const Exercises: React.FC = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: quiz, isFetching } = useQuery({
    enabled: !!params?.quizId,
    queryKey: ['quiz', params.quizId, params.sessionId],
    queryFn: async () => {
      const { data } = await QuizSessionService.getById(params.sessionId as string);
      return data.payload;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: 'always',
  });

  const submit = useMutation({
    mutationFn: async () => {
      await QuizSessionService.submit(params.sessionId as string);
      queryClient.invalidateQueries(['quiz', params.quizId, params.sessionId]);
    },
    onError: () => {
      toast.error('Đã có lỗi trong lúc nộp bài!');
    },
  });

  useEffect(() => {
    if (
      quiz?.status === 'ENDED' &&
      pathname ===
        `/room/exercises/${params.subjectId}/quiz/${params.quizId}/session/${params.sessionId}`
    ) {
      navigate(
        `/room/exercises/${params.subjectId}/quiz/${params.quizId}/review/session/${params.sessionId}`,
        { replace: true }
      );
    }
  }, [quiz, navigate, params, pathname]);

  return (
    <>
      {params?.quizId === undefined ? (
        <Main />
      ) : isFetching ? (
        <Loading />
      ) : quiz ? (
        quiz.status === 'ENDED' ? (
          <Review quiz={quiz} />
        ) : (
          <Detail quiz={quiz} handleSubmit={submit} />
        )
      ) : null}
      <ToastContainer position='bottom-right' draggable={false} />
    </>
  );
};

export default Exercises;
