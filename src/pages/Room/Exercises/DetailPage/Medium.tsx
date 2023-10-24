import _ from 'lodash';
import { useCallback, useState } from 'react';

import { Icon, Pagination } from '../../../../components';
import QuestionCard from '../../../../components/QuestionCard';
import Quiz from '../../../../data/exercises';
import { ConcreteQuestion } from '../../../../types/question';

const QuestionBoard: React.FC<{ quiz: typeof Quiz }> = ({ quiz }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(quiz.questions[0].subQuestions.length / 40);

  return (
    <div
      className={`fixed top-0 z-10 block h-full w-full space-y-4 bg-white pt-[84px] transition-all duration-500 md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        className={`relative bg-[#9DCCFF] p-3 ${
          isOpen ? 'translate-x-0 rounded-r-full' : '-translate-x-full rounded-l-full opacity-40'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon.Chevron className={`h-6 w-auto ${isOpen ? 'rotate-90' : '-rotate-90'}`} fill='#666' />
      </button>
      <div className='flex flex-col items-start justify-between space-y-4 px-4'>
        <h2 className='text-xl font-medium'>Danh sách câu hỏi</h2>
        <div className='flex w-full flex-1 flex-wrap items-center justify-start gap-x-2 gap-y-2'>
          {quiz.questions.map((question) =>
            question.subQuestions.map((subQuestion, index) => (
              <div
                key={subQuestion._id}
                className={`border- flex h-10 w-10 items-center justify-center ${
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
                    ? 'bg-[#F4B400]'
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
        <div className='flex w-full flex-1 flex-row items-center justify-between'>
          <button type='button' className='flex-2 flex rounded-lg bg-[#49CCCF] px-4 py-2'>
            <p className='text-base font-semibold text-white'>Hoàn thành bài làm</p>
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
      </div>
    </div>
  );
};

const Medium: React.FC = () => {
  const [page, setPage] = useState(1);
  const [quiz, setQuiz] = useState(Quiz);

  const onQuestionChange = useCallback((question: ConcreteQuestion['subQuestions'][0]) => {
    setQuiz((prev) => {
      const newQuestions = prev.questions.map((q) => {
        return {
          ...q,
          subQuestions: q.subQuestions.map((subQ) => {
            if (subQ._id === question._id) {
              return question;
            }
            return subQ;
          }),
        };
      });
      return { ...prev, questions: newQuestions };
    });
  }, []);

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
                  handleChange={onQuestionChange}
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

export default Medium;
