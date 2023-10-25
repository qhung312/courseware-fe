import _ from 'lodash';
import { useState } from 'react';

import { Quiz } from '../../types';
import Icon from '../Icon';

const Desktop: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(quiz.questions[0].subQuestions.length / 40);

  return (
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
                className='flex flex-1 flex-row items-center gap-x-3 rounded-lg border border-[#49CCCF]
              bg-white p-4 3xl:p-5'
              >
                <div className='flex flex-row items-center justify-center rounded-lg bg-[#49CCCF] p-2'>
                  <Icon.CorrectTotal className='h-8 w-auto' fill='white' fillOpacity={87} />
                </div>
                <div className='flex flex-col items-start gap-y-2'>
                  <p className='w-fit whitespace-nowrap text-base font-medium lg:text-lg 3xl:text-xl'>
                    Số câu trả lời đúng
                  </p>
                  <p className='text-lg font-semibold text-[#666] lg:text-xl 3xl:text-2xl'>100</p>
                </div>
              </div>
              <div
                className='flex flex-1 flex-row items-center gap-x-3 rounded-lg border border-[#49CCCF]
              bg-white p-4 3xl:p-5'
              >
                <div className='flex flex-row items-center justify-center rounded-lg bg-[#5B72EE] p-2'>
                  <Icon.PieChart className='h-8 w-auto' fill='white' fillOpacity={87} />
                </div>
                <div className='flex flex-col items-start gap-y-2'>
                  <p className='w-fit whitespace-nowrap text-base font-medium lg:text-lg 3xl:text-xl'>
                    Tỉ lệ trả lời đúng
                  </p>
                  <p className='text-lg font-semibold text-[#666] lg:text-xl 3xl:text-2xl'>30%</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className='text-base font-medium lg:text-lg 3xl:text-2xl'>Thời gian còn lại:</h2>
              <p className='text-[#4285F4]'>12:23</p>
            </>
          )}
        </div>

        <div
          className='flex w-full flex-col items-start justify-between space-y-4 rounded-lg 
          border border-[#4285F4] bg-white p-4 3xl:p-5'
        >
          <h2 className='text-base font-medium lg:text-lg 3xl:text-2xl'>Danh sách câu hỏi</h2>
          <div className='flex w-full flex-1 flex-wrap items-center justify-start gap-x-2 gap-y-2'>
            {quiz.questions.map((question) =>
              question.subQuestions.map((subQuestion, index) => (
                <div
                  key={subQuestion._id}
                  className={`flex h-10 w-10 items-center justify-center 3xl:h-[52px] 3xl:w-[52px] ${
                    subQuestion.isCorrect !== undefined
                      ? subQuestion.isCorrect
                        ? 'bg-[#49BBBD]'
                        : 'bg-[#DB4437]'
                      : _.some(
                          [
                            subQuestion.userAnswerKeys,
                            subQuestion.userAnswerField,
                            subQuestion.userAnswerKey,
                          ],
                          (v) => !_.isEmpty(v)
                        ) || subQuestion.userAnswerKey !== undefined
                      ? 'bg-[#4285F4]'
                      : subQuestion.starred
                      ? 'bg-[#FBCB43]'
                      : 'border border-[#4285F4]/50 bg-transparent'
                  }`}
                >
                  <p
                    className={`text-center text-base font-semibold ${
                      _.some(
                        [subQuestion.userAnswerKeys, subQuestion.userAnswerField],
                        (v) => !_.isEmpty(v)
                      ) ||
                      subQuestion.userAnswerKey !== undefined ||
                      subQuestion.starred
                        ? 'text-white'
                        : ''
                    }`}
                  >
                    {index + 1}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className='flex w-full flex-row items-center justify-between gap-x-4 gap-y-4'>
            <button type='button' className='flex-2 flex w-fit rounded-lg bg-[#49CCCF] p-2'>
              <p className='text text-base font-semibold text-white'>
                Hoàn thành {quiz.status === 'ONGOING' ? 'bài làm' : 'xem lại'}
              </p>
            </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
