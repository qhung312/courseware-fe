import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import QuizSessionService from '../../../service/quizSession.service';

import Detail from './Detail';
import Main from './Main';
import Review from './Review';

const Exercises: React.FC = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEnding, setIsEnding] = useState(false);

  const { data: quiz, isLoading } = useQuery({
    enabled: !!params?.quizId,
    queryKey: [params.sessionId],
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
      queryClient.invalidateQueries([params.sessionId]);
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
      ) : isLoading || submit.isLoading || isEnding ? (
        <Loading />
      ) : quiz ? (
        quiz.status === 'ENDED' ? (
          <Review quiz={quiz} />
        ) : (
          <Detail quiz={quiz} handleSubmit={submit} setIsEnding={setIsEnding} />
        )
      ) : null}
    </>
  );
};

export default Exercises;
