import { chunk } from 'lodash';
import { useEffect, useState } from 'react';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { QuizSession } from '../../../../types';

const MobileReview: React.FC<{ quiz: QuizSession }> = ({ quiz }) => {
  const pageSize = 4;
  const [page, setPage] = useState(1);

  const currentSet = Array.from({ length: 4 }, (_a, index) => (page - 1) * pageSize + index);
  const [questionChunks, setQuestionChunks] = useState(chunk(quiz.questions, 4));

  useEffect(() => {
    setQuestionChunks(chunk(quiz.questions, 4));
  }, [quiz]);

  return (
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col space-y-4'>
          <h1 className='text-2xl font-bold'>
            <span className='text-2xl font-bold text-[#4285F4]'>Xem lại: </span>
            {quiz.fromQuiz.name}
          </h1>
          <h3 className='text-xl font-medium'>Môn: {quiz.fromQuiz.subject.name}</h3>
          <div className='flex w-fit flex-row gap-x-2 rounded-lg border border-[#4285F4]/30 bg-white p-2'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>12 phút 23 giây</p>
            </div>
            <span className='h-6 w-0 border-l-[0.5px] border-[#666]' />
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>
                {quiz.standardizedScore ? quiz.standardizedScore : '0'} điểm
              </p>
            </div>
          </div>

          <div className='w-fit rounded-lg bg-[#4285F4] p-3'>
            <p className='text-sm text-white'>Trang: {page}/3</p>
          </div>

          <div className='flex flex-col space-y-4'>
            {questionChunks[page - 1]?.map((question, index) => (
              <QuestionCard
                key={`mobile-question-${question.questionId}-review`}
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

export default MobileReview;
