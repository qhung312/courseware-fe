import { useState } from 'react';

import { Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { Quiz, ConcreteQuestion } from '../../../../types';

const MobileOngoing: React.FC<{
  quiz: Quiz;
  handleAnswer: (question: ConcreteQuestion['subQuestions'][0]) => void;
}> = ({ quiz, handleAnswer }) => {
  const [page, setPage] = useState(1);

  return (
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col space-y-4'>
          <h1 className='text-2xl font-bold'>{quiz.fromTemplate.name}</h1>
          <h3 className='text-xl'>Môn: {quiz.fromTemplate.subject.name}</h3>
          <div className='flex w-fit flex-row gap-x-2 rounded-lg border border-[#4285F4]/30 bg-white p-2'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>12 phút 23 giây</p>
            </div>
            <span className='h-6 w-0 border-l-[0.5px] border-[#666]' />
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>20% (10/50)</p>
            </div>
          </div>

          <div className='w-fit rounded-lg bg-[#4285F4] p-3'>
            <p className='text-sm text-white'>Trang: {page}/3</p>
          </div>

          <div className='flex flex-col space-y-4'>
            {quiz.questions.map((question) =>
              question.subQuestions.map((subQuestion, index) => (
                <QuestionCard
                  key={subQuestion._id}
                  question={subQuestion}
                  status={quiz.status}
                  questionNumber={index + 1}
                  handleChange={handleAnswer}
                />
              ))
            )}
          </div>
          <Pagination totalCount={100} pageSize={2} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <QuestionBoard quiz={quiz} />
    </div>
  );
};

export default MobileOngoing;
