import { UseMutationResult } from '@tanstack/react-query';
import _, { chunk } from 'lodash';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { Icon, FinishModal } from '..';
import { QuizSession, QuizStatus } from '../../types';
import { calculateProgress } from '../../utils/helper';

const Mobile: React.FC<{
  quiz: QuizSession;
  currentSet: number[];
  setCurrentSetIndex: (index: number) => void;
  handleReview?: () => void;
  submit?: UseMutationResult<void, unknown, void, unknown>;
}> = ({ quiz, submit, currentSet, setCurrentSetIndex, handleReview }) => {
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [starList] = useLocalStorage<number[]>(`quiz-${params.quizId}-starList`, []);

  const result = useMemo(() => calculateProgress(quiz.questions), [quiz]);

  const maxPage = Math.ceil(quiz.questions.length / 40);
  const questionChunks = chunk(quiz.questions, 40);

  const onFinish = () => {
    if (!submit?.isLoading) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
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
          <Icon.Chevron
            className={`h-6 w-auto ${isOpen ? 'rotate-90' : '-rotate-90'}`}
            fill='#666'
          />
        </button>
        <div className='flex flex-col items-start justify-between space-y-4 p-4'>
          <h2 className='text-xl font-medium'>Danh sách câu hỏi</h2>
          <div className='flex w-full flex-1 flex-wrap items-center justify-start gap-x-2 gap-y-2'>
            {questionChunks[page - 1]?.map((question, index) => (
              <button
                onClick={() => {
                  setCurrentSetIndex(question.questionId);
                  document.getElementById(`question-${question.questionId}-card`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'start',
                  });
                  setTimeout(() => {
                    setIsOpen(false);
                  }, 400);
                }}
                key={`mobile-${question.questionId}-list-${quiz._id}`}
                className={`flex h-10 w-10 items-center justify-center ${
                  question.isCorrect !== undefined
                    ? question.isCorrect
                      ? 'bg-[#49BBBD]'
                      : 'bg-[#DB4437]'
                    : starList.includes((page - 1) * 40 + index + 1)
                    ? 'bg-[#FBCB43]'
                    : _.some(
                        [question.userAnswerKeys, question.userAnswerField],
                        (v) => !_.isEmpty(v)
                      )
                    ? 'bg-[#4285F4]'
                    : 'border border-[#4285F4]/50 bg-transparent'
                } ${
                  currentSet.includes((page - 1) * 40 + index)
                    ? 'border-[3px] border-[#FBCB43]'
                    : ''
                }`}
              >
                <p
                  className={`text-center text-base font-semibold ${
                    _.some(
                      [question.userAnswerKeys, question.userAnswerField],
                      (v) => !_.isEmpty(v)
                    ) ||
                    quiz.status === QuizStatus.ENDED ||
                    starList.includes((page - 1) * 40 + index + 1)
                      ? 'text-white'
                      : ''
                  }`}
                >
                  {(page - 1) * 40 + index + 1}
                </p>
              </button>
            ))}
          </div>
          <div className='flex w-full flex-1 flex-row items-center justify-between'>
            <button
              onClick={onFinish}
              disabled={submit?.isLoading}
              type='button'
              className='flex-2 flex rounded-lg bg-[#49CCCF] px-4 py-2'
            >
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
              <div className='flex w-full flex-row items-center gap-x-4 rounded-lg bg-white px-4 py-5 shadow-2xl shadow-[#2F327D]/10'>
                <div className='flex h-16 w-16 flex-row items-center justify-center rounded-lg bg-[#49CCCF]/30'>
                  <Icon.CorrectTotal className='h-10 w-auto' fill='#49CCCF' />
                </div>
                <div className='flex flex-col items-start gap-y-4'>
                  <p className='text-lg font-semibold'>Số câu trả lời đúng</p>
                  <p className='text-xl font-bold text-[#666]'>{result.totalCorrect}</p>
                </div>
              </div>
              <div className='flex w-full flex-row items-center gap-x-4 rounded-lg bg-white px-4 py-5 shadow-2xl shadow-[#2F327D]/10'>
                <div className='flex h-16 w-16 flex-row items-center justify-center rounded-lg bg-[#5B72EE]/30'>
                  <Icon.PieChart className='h-10 w-auto' fill='#5B72EE' />
                </div>
                <div className='flex flex-col items-start gap-y-4'>
                  <p className='text-lg font-semibold'>Tỉ lệ trả lời đúng</p>
                  <p className='text-xl font-bold text-[#666]'>{result.correctPercentage}%</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <FinishModal
        title={quiz.status === QuizStatus.ONGOING ? 'Hoàn thành bài làm' : 'Hoàn thành xem lại'}
        message={
          quiz.status === QuizStatus.ONGOING
            ? 'Bạn có chắc chắn muốn hoàn thành bài làm?'
            : 'Bạn có chắc chắn muốn hoàn thành xem lại?'
        }
        isOpen={isModalOpen}
        handleOpen={setIsModalOpen}
        accept={handleReview || submit?.mutate}
        isLoading={!!submit && submit.isLoading}
        cancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Mobile;
