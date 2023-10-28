import { useState } from 'react';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { ConcreteQuestion, QuizSession } from '../../../../types';

const DesktopOngoing: React.FC<{
  quiz: QuizSession;
  handleAnswer: (question: ConcreteQuestion) => void;
}> = ({ quiz, handleAnswer }) => {
  const [page, setPage] = useState(1);

  return (
    <main
      id='quiz-content'
      className='with-nav-height relative hidden w-full overflow-y-auto overflow-x-hidden pr-[256px]
      md:block lg:pr-[360px] xl:pr-[430px] 2xl:pr-[520px] 3xl:pr-[600px]'
    >
      <div className='flex w-full flex-col items-start justify-start bg-white p-5 lg:p-8 3xl:p-20'>
        <div className='flex w-full flex-col space-y-4 lg:space-y-5 3xl:space-y-6'>
          <h3 className='text-xl font-semibold text-[#666] lg:text-2xl 3xl:text-3xl'>
            {quiz.fromQuiz.subject.name}
          </h3>
          <h1 className='text-2xl font-bold lg:text-3xl 3xl:text-4xl'>{quiz.fromQuiz.name}</h1>

          <div className='flex flex-1 flex-row gap-x-4'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                15 phút 00 giây
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='text-xs text-[#666] lg:text-sm 3xl:text-base'>45 câu</p>
            </div>
          </div>

          <div className='flex flex-row gap-x-4'>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Trang hiện tại: <span className='text-[#4285F4]'>{page}/3</span>
              </p>
            </div>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Tiến độ: <span className='text-[#4285F4]'>20% (10/50)</span>
              </p>
            </div>
          </div>

          <div className='flex flex-col space-y-4'>
            {quiz.questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                question={question}
                status={quiz.status}
                questionNumber={index + 1}
                handleChange={handleAnswer}
              />
            ))}
          </div>
          <Pagination totalCount={2} pageSize={2} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <QuestionBoard quiz={quiz} />
    </main>
  );
};

export default DesktopOngoing;
