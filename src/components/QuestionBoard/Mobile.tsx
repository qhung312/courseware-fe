import _ from 'lodash';
import { useState } from 'react';

import { QuizSession } from '../../types';
import Icon from '../Icon';

const Mobile: React.FC<{ quiz: QuizSession }> = ({ quiz }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(quiz.questions.length / 40);

  return (
    <div
      className={`with-nav-height fixed bottom-0 right-0 z-10 block h-full w-full 
      bg-white transition-all duration-500 ${
        isOpen ? 'translate-x-0 overflow-y-auto' : 'translate-x-full'
      }`}
    >
      <button
        id='question-board-toggle'
        className={`sticky top-4 z-[10000] mt-4 flex bg-[#9DCCFF] p-3 transition-all duration-500 ${
          isOpen ? 'translate-x-0 rounded-r-full' : '-translate-x-full rounded-l-full opacity-40'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon.Chevron className={`h-6 w-auto ${isOpen ? 'rotate-90' : '-rotate-90'}`} fill='#666' />
      </button>
      <div className='flex flex-col items-start justify-between space-y-4 p-4'>
        <h2 className='text-xl font-medium'>Danh sách câu hỏi</h2>
        <div className='flex w-full flex-1 flex-wrap items-center justify-start gap-x-2 gap-y-2'>
          {quiz.questions.map((question, index) => (
            <div
              key={question._id}
              className={`flex h-10 w-10 items-center justify-center ${
                question.isCorrect !== undefined
                  ? question.isCorrect
                    ? 'bg-[#49BBBD]'
                    : 'bg-[#DB4437]'
                  : _.some(
                      [question.userAnswerKeys, question.userAnswerField],
                      (v) => !_.isEmpty(v)
                    )
                  ? 'bg-[#4285F4]'
                  : question.starred
                  ? 'bg-[#FBCB43]'
                  : 'border border-[#4285F4]/50 bg-transparent'
              }`}
            >
              <p
                className={`text-center text-base font-semibold ${
                  _.some(
                    [question.userAnswerKeys, question.userAnswerField],
                    (v) => !_.isEmpty(v)
                  ) || question.starred
                    ? 'text-white'
                    : ''
                }`}
              >
                {index + 1}
              </p>
            </div>
          ))}
        </div>
        <div className='flex w-full flex-1 flex-row items-center justify-between'>
          <button type='button' className='flex-2 flex rounded-lg bg-[#49CCCF] px-4 py-2'>
            <p className='text-base font-semibold text-white'>
              Hoàn thành {quiz.status === 'ENDED' ? 'xem lại' : 'bài làm'}
            </p>
          </button>
          <ul className='flex flex-row items-center justify-center gap-x-4'>
            <li className='flex h-fit w-fit'>
              <button
                type='button'
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#49CCCF] ${
                  page === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <Icon.Chevron className='h-7 w-7 -rotate-90 fill-white' />
              </button>
            </li>
            <li className='flex h-fit w-fit'>
              <p className='text-base font-semibold'>{page}</p>
            </li>
            <li className='flex h-fit w-fit'>
              <button
                type='button'
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#49CCCF] ${
                  page === maxPage ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={page === maxPage}
                onClick={() => setPage(page + 1)}
              >
                <Icon.Chevron className='h-7 w-7 rotate-90 fill-white' />
              </button>
            </li>
          </ul>
        </div>
        {quiz.status === 'ENDED' ? (
          <>
            <div className='flex w-full flex-row items-center gap-x-6 rounded-lg bg-white px-4 py-5 shadow-2xl shadow-[#2F327D]/10'>
              <div className='flex h-16 w-16 flex-row items-center justify-center rounded-lg bg-[#49CCCF]/30'>
                <Icon.CorrectTotal className='h-10 w-auto' fill='#49CCCF' />
              </div>
              <div className='flex flex-col items-start gap-y-4'>
                <p className='text-lg font-semibold'>Số câu trả lời đúng</p>
                <p className='text-xl font-bold text-[#666]'>100</p>
              </div>
            </div>
            <div className='flex w-full flex-row items-center gap-x-6 rounded-lg bg-white px-4 py-5 shadow-2xl shadow-[#2F327D]/10'>
              <div className='flex h-16 w-16 flex-row items-center justify-center rounded-lg bg-[#5B72EE]/30'>
                <Icon.PieChart className='h-10 w-auto' fill='#5B72EE' />
              </div>
              <div className='flex flex-col items-start gap-y-4'>
                <p className='text-lg font-semibold'>Tỉ lệ trả lời đúng</p>
                <p className='text-xl font-bold text-[#666]'>30%</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Mobile;
