import { chunk, reduce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { QuizSession } from '../../../../types';
import { parseDuration } from '../../../../utils/helper';

const MobileOngoing: React.FC<{
  quiz: QuizSession;
}> = ({ quiz }) => {
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const [questionChunks, setQuestionChunks] = useState(chunk(quiz.questions, 4));
  const [timeLeft, setTimeLeft] = useState(Date.now() + quiz.timeLeft);
  const navigate = useNavigate();
  const params = useParams();

  const currentSet = Array.from({ length: 4 }, (_, index) => (page - 1) * pageSize + index);

  useEffect(() => {
    setQuestionChunks(chunk(quiz.questions, 4));
    setTimeLeft(Date.now() + quiz.timeLeft);
  }, [quiz]);

  const calculateProgress = useMemo(() => {
    const current = reduce(
      quiz.questions,
      (acc, question) => {
        if (question.userAnswerField !== undefined || question.userAnswerKeys !== undefined) {
          return acc + 1;
        }
        return acc;
      },
      0
    );

    return {
      total: quiz.questions.length,
      current,
      percentage: Math.round((current / quiz.questions.length) * 100),
    };
  }, [quiz]);

  return (
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex h-full w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col space-y-4'>
          <h1 className='text-2xl font-bold'>{quiz.fromQuiz.name}</h1>
          <h3 className='text-xl'>Môn: {quiz.fromQuiz.subject.name}</h3>
          <div className='flex w-fit flex-row gap-x-2 rounded-lg border border-[#4285F4]/30 bg-white p-2'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto' fill='#49BBBD' />
              <Countdown
                date={timeLeft}
                onComplete={() =>
                  navigate(
                    `/room/exercises/${params.subjectId}/quiz/${params.quizId}/review/session/${params.sessionId}`
                  )
                }
                onTick={(props) => setTimeLeft(Date.now() + props.total)}
                renderer={(props) => {
                  return <p className='text-sm'>{parseDuration(props.total)}</p>;
                }}
              />
            </div>
            <span className='h-6 w-0 border-l-[0.5px] border-[#666]' />
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>{`${calculateProgress.percentage}% (${calculateProgress.current}/${calculateProgress.total})`}</p>
            </div>
          </div>

          <div className='w-fit rounded-lg bg-[#4285F4] p-3'>
            <p className='text-sm text-white'>
              Trang: {page}/{questionChunks.length}
            </p>
          </div>

          <div className='flex flex-col space-y-4'>
            {questionChunks[page - 1]?.map((question, index) => (
              <QuestionCard
                key={`mobile-${question.questionId}-${quiz._id}`}
                question={question}
                status={quiz.status}
                questionNumber={(page - 1) * pageSize + index + 1}
              />
            ))}
          </div>
          <Pagination
            totalCount={quiz.questions.length}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
      <QuestionBoard quiz={quiz} currentSet={currentSet} />
    </div>
  );
};

export default MobileOngoing;
