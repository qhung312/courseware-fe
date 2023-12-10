import { UseMutationResult } from '@tanstack/react-query';
import { chunk, reduce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { QuizSession } from '../../../../types';
import { parseDuration } from '../../../../utils/helper';

const DesktopOngoing: React.FC<{
  quiz: QuizSession;
  handleSubmit: UseMutationResult<void, unknown, void, unknown>;
}> = ({ quiz, handleSubmit }) => {
  const pageSize = 5;

  const [page, setPage] = useState(1);
  const [questionChunks, setQuestionChunks] = useState(chunk(quiz.questions, 4));

  const currentSet = Array.from({ length: pageSize }, (_, index) => (page - 1) * pageSize + index);

  useEffect(() => {
    setQuestionChunks(chunk(quiz.questions, pageSize));
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
    <main
      id='quiz-content'
      className='with-nav-height relative hidden w-full overflow-y-auto overflow-x-hidden pr-[256px]
      md:block lg:pr-[360px] xl:pr-[430px] 2xl:pr-[520px] 3xl:pr-[600px]'
    >
      <div className='flex h-full w-full flex-col items-start justify-start bg-white p-5 lg:p-8 3xl:p-10'>
        <div className='flex w-full flex-col'>
          <h3 className='text-xl font-semibold text-[#666] lg:text-2xl 3xl:text-3xl'>
            {quiz.fromQuiz.subject.name}
          </h3>
          <h1 className='text-2xl font-bold lg:text-3xl 3xl:text-4xl'>{quiz.fromQuiz.name}</h1>

          <div className='mt-1 flex flex-1 flex-row gap-x-4 lg:mt-2 3xl:mt-3'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                {parseDuration(quiz.duration)}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='text-xs text-[#666] lg:text-sm 3xl:text-base'>
                {quiz.questions.length} câu
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-row gap-x-4 lg:mt-6 3xl:mt-8'>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Trang hiện tại:{' '}
                <span className='text-[#4285F4]'>
                  {page}/{questionChunks.length}
                </span>
              </p>
            </div>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Tiến độ:{' '}
                <span className='text-[#4285F4]'>{`${calculateProgress.percentage}% (${calculateProgress.current}/${calculateProgress.total})`}</span>
              </p>
            </div>
          </div>

          <div className='mt-5 mb-10 flex flex-col space-y-4 lg:mt-8 3xl:mt-10'>
            {questionChunks[page - 1]?.map((question, index) => (
              <QuestionCard
                key={`desktop-${question.questionId}-${quiz._id}`}
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
        setCurrentSetIndex={(index: number) =>
          setPage((prev) => {
            const currentPage = Math.ceil(index / pageSize);

            if (currentPage !== prev) {
              return currentPage;
            }
            return prev;
          })
        }
        currentSet={currentSet}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};

export default DesktopOngoing;
