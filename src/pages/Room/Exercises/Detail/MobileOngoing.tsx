import { UseMutationResult } from '@tanstack/react-query';
import { chunk } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { QuizSession } from '../../../../types';
import { calculateProgress, parseDuration } from '../../../../utils/helper';

const MobileOngoing: React.FC<{
  quiz: QuizSession;
  handleSubmit: UseMutationResult<void, unknown, void, unknown>;
}> = ({ quiz, handleSubmit }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [questionChunks, setQuestionChunks] = useState(chunk(quiz.questions, 4));
  const [timeLeft, setTimeLeft] = useState(Date.now() + quiz.timeLeft);

  const currentSet = Array.from({ length: pageSize }, (_, index) => (page - 1) * pageSize + index);

  useEffect(() => {
    setQuestionChunks(chunk(quiz.questions, pageSize));
    setTimeLeft(Date.now() + quiz.timeLeft);
  }, [quiz]);

  const progress = useMemo(() => calculateProgress(quiz.questions), [quiz]);

  return (
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex h-fit w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col'>
          <h1 className='text-2xl font-bold'>{quiz.fromQuiz.name}</h1>
          <h3 className='text-xl'>Môn: {quiz.fromQuiz.subject.name}</h3>
          <div className='mt-2 flex w-fit flex-row gap-x-2 rounded-lg border border-[#4285F4]/30 bg-white p-2'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto' fill='#49BBBD' />
              <Countdown
                date={timeLeft}
                onTick={(props) => setTimeLeft(Date.now() + props.total)}
                renderer={(props) => {
                  return <p className='text-sm'>{parseDuration(props.total)}</p>;
                }}
              />
            </div>
            <span className='h-6 w-0 border-l-[0.5px] border-[#666]' />
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>{`${progress.percentage}% (${progress.current}/${progress.total})`}</p>
            </div>
          </div>

          <div className='mt-7 w-fit rounded-lg bg-[#4285F4] p-3'>
            <p className='text-sm text-white'>
              Trang: {page}/{questionChunks.length}
            </p>
          </div>

          <div className='mt-5 mb-4 flex flex-col space-y-4'>
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
      <QuestionBoard
        quiz={quiz}
        currentSet={currentSet}
        setCurrentSetIndex={(index: number) =>
          setPage((prev) => {
            const currentPage = Math.ceil(index / pageSize);

            if (currentPage !== prev) {
              return currentPage;
            }
            return prev;
          })
        }
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default MobileOngoing;
