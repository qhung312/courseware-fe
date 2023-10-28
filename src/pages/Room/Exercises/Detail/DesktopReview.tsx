import _ from 'lodash';
import { Fragment, useCallback, useState } from 'react';

import { Icon, Markdown, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { ConcreteQuestion, Quiz } from '../../../../types';

const DesktopReview: React.FC<{
  quiz: Quiz;
}> = ({ quiz }) => {
  const [page, setPage] = useState(1);

  const extractUserAnswer = useCallback((question: ConcreteQuestion['subQuestions'][0]) => {
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    switch (question.type) {
      case 'MULTIPLE_CHOICE_SINGLE_ANSWER':
        return `${
          question.userAnswerKey === undefined
            ? 'Không trả lời'
            : optionLabels[
                _.findIndex(question.options, (option) => option.key === question.userAnswerKey)
              ]
        }`;
      case 'MULTIPLE_CHOICE_MULTIPLE_ANSWERS':
        return `${
          question.userAnswerKeys === undefined
            ? 'Không trả lời'
            : question.userAnswerKeys.join(', ')
        }`;
      default:
        return 'Không trả lời';
    }
  }, []);

  const extractAnswer = useCallback((question: ConcreteQuestion['subQuestions'][0]) => {
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    switch (question.type) {
      case 'MULTIPLE_CHOICE_SINGLE_ANSWER':
        return `${
          question.answerKey === undefined
            ? 'Không trả lời'
            : optionLabels[
                _.findIndex(question.options, (option) => option.key === question.answerKey)
              ]
        }`;
      case 'MULTIPLE_CHOICE_MULTIPLE_ANSWERS':
        return `${
          question.answerKeys === undefined ? 'Không trả lời' : question.answerKeys.join(', ')
        }`;
      default:
        return 'Không trả lời';
    }
  }, []);

  return (
    <main
      id='quiz-content'
      className='with-nav-height relative hidden w-full overflow-y-auto overflow-x-hidden pr-[256px]
      md:block lg:pr-[360px] xl:pr-[430px] 2xl:pr-[520px] 3xl:pr-[600px]'
    >
      <div className='flex w-full flex-col items-start justify-start bg-white p-5 lg:p-8 3xl:p-20'>
        <div className='flex w-full flex-col space-y-4 lg:space-y-5 3xl:space-y-6'>
          <h3 className='text-xl font-semibold text-[#666] lg:text-2xl 3xl:text-3xl'>
            {quiz.fromTemplate.subject.name}
          </h3>
          <h1 className='text-2xl font-bold lg:text-3xl 3xl:text-4xl'>{quiz.fromTemplate.name}</h1>

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
            {quiz.questions.map((question) =>
              question.subQuestions.map((subQuestion, index) => (
                <Fragment key={subQuestion._id}>
                  <QuestionCard
                    question={subQuestion}
                    status={quiz.status}
                    questionNumber={index + 1}
                  />
                  <div className='flex h-full w-full flex-row gap-x-4'>
                    <div className='flex h-full flex-1 flex-col rounded-lg border border-[#49CCCF] bg-white p-4'>
                      <h3 className='mb-2 text-xl font-semibold'>Đáp án</h3>
                      <div className='flex flex-col items-start justify-center gap-y-1'>
                        <div className='flex flex-row items-center gap-x-2'>
                          <Icon.UserAnswer className='h-5 w-auto' fill='#49BBBD' />
                          <p className='text-base font-semibold text-[#666]'>
                            Đáp án bạn chọn: {extractUserAnswer(subQuestion)}
                          </p>
                        </div>
                        <div className='flex flex-row items-center gap-x-2'>
                          <Icon.Answer className='h-5 w-auto' fill='#49BBBD' />
                          <p className='text-base font-semibold text-[#666]'>
                            Đáp án đúng: {extractAnswer(subQuestion)}
                          </p>
                        </div>
                      </div>
                      <span className='my-4 border-t border-[#666]' />
                      <h3 className='mb-2 text-xl font-semibold'>Giải thích</h3>
                      <Markdown>{subQuestion.explanation}</Markdown>
                    </div>
                    <div className='flex flex-1 flex-col rounded-lg border border-[#49CCCF] bg-white p-4'>
                      <div className='mb-2 flex flex-row items-center gap-x-2'>
                        <Icon.Pen fill='#49CCCF' className='h-5 w-auto' />
                        <h3 className='text-xl font-semibold'>Ghi chú</h3>
                      </div>
                      <textarea className='h-full w-full resize-none focus:outline-none' />
                    </div>
                  </div>
                </Fragment>
              ))
            )}
          </div>
          <Pagination totalCount={2} pageSize={2} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <QuestionBoard quiz={quiz} />
    </main>
  );
};

export default DesktopReview;