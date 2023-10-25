import _ from 'lodash';
import { Fragment, useCallback, useState } from 'react';

import { Icon, Markdown, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { ConcreteQuestion } from '../../../../types';
import { Quiz } from '../../../../types/quiz';

const MobileReview: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
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
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col space-y-4'>
          <h1 className='text-2xl font-bold'>
            <span className='text-2xl font-bold text-[#4285F4]'>Xem lại: </span>
            {quiz.fromTemplate.name}
          </h1>
          <h3 className='text-xl font-medium'>Môn: {quiz.fromTemplate.subject.name}</h3>
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
            {quiz.questions.map((question) =>
              question.subQuestions.map((subQuestion, index) => (
                <Fragment key={subQuestion._id}>
                  <QuestionCard
                    question={subQuestion}
                    status={quiz.status}
                    questionNumber={index + 1}
                  />
                  <div className='flex h-full w-full flex-col gap-y-4'>
                    <div className='flex h-full w-full flex-1 flex-col rounded-lg border border-[#49CCCF] bg-white p-4'>
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
                    <div className='flex h-full w-full flex-1 flex-col rounded-lg border border-[#49CCCF] bg-white p-4'>
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
          <Pagination totalCount={100} pageSize={2} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <QuestionBoard quiz={quiz} />
    </div>
  );
};

export default MobileReview;
