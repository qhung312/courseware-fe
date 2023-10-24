import _ from 'lodash';
import { useCallback, useState } from 'react';

import { Icon, Pagination } from '../../../../components';
import QuestionCard from '../../../../components/QuestionCard';
import Quiz from '../../../../data/exercises';
import { ConcreteQuestion } from '../../../../types/question';

const QuestionBoard: React.FC<{ quiz: typeof Quiz }> = ({ quiz }) => {
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(quiz.questions[0].subQuestions.length / 40);
  return (
    <div
      id='question-sidebar'
      className='with-nav-height fixed bottom-0 right-0 z-10 block
      w-[256px] space-y-4 bg-[#9DCCFF]/30 p-4 transition-all duration-500 lg:w-[360px] 3xl:w-[600px]'
    >
      <div className='flex flex-col items-start justify-center space-y-4 lg:space-y-7 3xl:space-y-9'>
        <div
          className='flex w-full flex-row items-center justify-between gap-x-3 rounded-lg bg-white p-4 
          lg:gap-x-10 3xl:gap-x-[100px] 3xl:p-5'
        >
          <h2 className='text-base font-medium lg:text-lg 3xl:text-2xl'>Thời gian còn lại:</h2>
          <p className='text-[#4285F4]'>12:23</p>
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
          <div className='flex flex-row items-center justify-center gap-x-4 gap-y-4'>
            <button type='button' className='flex-2 flex w-fit rounded-lg bg-[#49CCCF] p-2'>
              <p className='text text-base font-semibold text-white'>Hoàn thành bài làm</p>
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
    </div>
  );
};

const Large: React.FC = () => {
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
  // const params = useParams();

  // const quizId = params ? Number(params.chapterId) : null;

  return (
    <main
      id='quiz-content'
      className='with-nav-height relative hidden w-full overflow-y-auto overflow-x-hidden pr-[256px]
      md:block lg:pr-[360px] 3xl:pr-[600px]'
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
          <Pagination totalCount={6} pageSize={2} currentPage={page} onPageChange={setPage} />
        </div>
      </div>
      <QuestionBoard quiz={quiz} />
    </main>
  );
};

export default Large;
