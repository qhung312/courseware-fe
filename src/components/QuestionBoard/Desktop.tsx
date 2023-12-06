import _, { chunk } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { Icon, FinishModal } from '..';
import { QuizSession, QuizStatus } from '../../types';
import { calculateProgress, parseCountdown } from '../../utils/helper';

const Desktop: React.FC<{
  quiz: QuizSession;
  currentSet: number[];
  setCurrentSetIndex: (index: number) => void;
  submit: () => void;
}> = ({ quiz, submit, currentSet, setCurrentSetIndex }) => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Date.now() + quiz.timeLeft);
  const [starList] = useLocalStorage<number[]>(`quiz-${params.quizId}-starList`, []);

  const maxPage = Math.ceil(quiz.questions.length / 40);
  const questionChunks = chunk(quiz.questions, 40);

  const result = useMemo(() => calculateProgress(quiz.questions), [quiz]);

  const onFinish = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setTimeLeft(Date.now() + quiz.timeLeft);
  }, [quiz]);

  return (
    <>
      <div
        id='question-sidebar'
        className='with-nav-height fixed right-0 bottom-0 z-10 block w-[256px] space-y-4 bg-[#9DCCFF]/30
      p-4 transition-all duration-500 lg:w-[360px] xl:w-[430px] 2xl:w-[520px] 3xl:w-[600px]'
      >
        <div className='flex flex-col items-start justify-center space-y-4 lg:space-y-7 3xl:space-y-9'>
          <div
            className={`flex w-full flex-1 flex-row flex-wrap items-center justify-between gap-x-3 gap-y-3 rounded-lg 
          lg:gap-x-4 3xl:gap-x-5 ${quiz.status === 'ENDED' ? '' : 'bg-white p-4 3xl:p-5'}`}
          >
            {quiz.status === 'ENDED' ? (
              <>
                <div
                  className='flex flex-1 flex-row items-center gap-x-4 rounded-lg border border-[#49CCCF] bg-white
              p-4 3xl:gap-x-5 3xl:p-5'
                >
                  <div className='flex flex-row items-center justify-center rounded-lg bg-[#49CCCF] p-2'>
                    <Icon.CorrectTotal className='h-8 w-auto' fill='white' fillOpacity={87} />
                  </div>
                  <div className='flex flex-col items-start gap-y-2'>
                    <p className='w-fit whitespace-nowrap text-base font-medium lg:text-lg 3xl:text-xl'>
                      Số câu trả lời đúng
                    </p>
                    <p className='text-lg font-semibold text-[#666] lg:text-xl 3xl:text-2xl'>
                      {result.totalCorrect}
                    </p>
                  </div>
                </div>
                <div
                  className='flex flex-1 flex-row items-center gap-x-4 rounded-lg border border-[#49CCCF] bg-white
              p-4 3xl:gap-x-5 3xl:p-5'
                >
                  <div className='flex flex-row items-center justify-center rounded-lg bg-[#5B72EE] p-2'>
                    <Icon.PieChart className='h-8 w-auto' fill='white' fillOpacity={87} />
                  </div>
                  <div className='flex flex-col items-start gap-y-2'>
                    <p className='w-fit whitespace-nowrap text-base font-medium lg:text-lg 3xl:text-xl'>
                      Tỉ lệ trả lời đúng
                    </p>
                    <p className='text-lg font-semibold text-[#666] lg:text-xl 3xl:text-2xl'>
                      {result.correctPercentage}%
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className='text-base font-medium lg:text-lg 3xl:text-2xl'>
                  Thời gian còn lại:
                </h2>
                <Countdown
                  date={timeLeft}
                  onTick={(props) => {
                    setTimeLeft(Date.now() + props.total);
                  }}
                  renderer={(props) => (
                    <p className='text-base font-medium text-[#4285F4] lg:text-lg 3xl:text-2xl'>
                      {parseCountdown(props.total)}
                    </p>
                  )}
                />
              </>
            )}
          </div>

          <div
            className='flex w-full flex-col items-start justify-between space-y-4 rounded-lg 
          border border-[#4285F4] bg-white p-4 3xl:p-5'
          >
            <h2 className='text-base font-medium lg:text-lg 3xl:text-2xl'>Danh sách câu hỏi</h2>
            <div className='flex w-full flex-1 flex-wrap items-center justify-start gap-x-2 gap-y-2'>
              {questionChunks[page - 1]?.map((question, index) => (
                <button
                  onClick={() => {
                    setCurrentSetIndex(question.questionId);
                    document
                      .getElementById(`question-${question.questionId}-card`)
                      ?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'start',
                      });
                  }}
                  key={`desktop-${question.questionId}-list-${quiz._id}`}
                  className={`flex h-10 w-10 items-center justify-center 3xl:h-[52px] 3xl:w-[52px] ${
                    starList.includes((page - 1) * 40 + index + 1)
                      ? 'bg-[#FBCB43]'
                      : question.isCorrect !== undefined
                      ? question.isCorrect
                        ? 'bg-[#49BBBD]'
                        : 'bg-[#DB4437]'
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
            <div className='flex w-full flex-row flex-wrap-reverse items-center justify-center gap-x-4 gap-y-4'>
              <button
                onClick={onFinish}
                type='button'
                className='flex-2 flex w-fit rounded-lg bg-[#49CCCF] p-2'
              >
                <p className='text text-base font-semibold text-white'>
                  Hoàn thành {quiz.status === 'ONGOING' ? 'bài làm' : 'xem lại'}
                </p>
              </button>
              {questionChunks.length > 1 && (
                <ul className='flex flex-row items-center justify-center gap-x-4'>
                  <li className='flex h-fit w-fit'>
                    <button
                      type='button'
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#49CCCF] ${
                        page === 1 ? 'opacity-50' : ''
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
                        page === maxPage ? 'opacity-50' : ''
                      }`}
                      disabled={page === maxPage}
                      onClick={() => setPage(page + 1)}
                    >
                      <Icon.Chevron className='h-7 w-7 rotate-90 fill-white' />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <FinishModal
        title={quiz.status === QuizStatus.ONGOING ? 'Hoàn thành bài làm' : 'Hoàn thành xem lại'}
        message={
          quiz.status === QuizStatus.ONGOING
            ? 'Bạn có chắc chắn muốn hoàn thành bài làm?'
            : 'Bạn có chắc chắn muốn hoàn thành xem lại?'
        }
        isOpen={isOpen}
        handleOpen={setIsOpen}
        accept={submit}
        cancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default Desktop;
