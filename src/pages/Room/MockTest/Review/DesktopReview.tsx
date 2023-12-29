import { chunk } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Histogram, Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { ExamSession, Summary } from '../../../../types';
import { parseDuration } from '../../../../utils/helper';

const DesktopReview: React.FC<{
  exam: ExamSession;
  summary: Summary;
}> = ({ exam, summary }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const pageSize = 5;

  const currentSet = Array.from({ length: pageSize }, (_a, index) => (page - 1) * pageSize + index);
  const [questionChunks, setQuestionChunks] = useState(chunk(exam.questions, 4));

  useEffect(() => {
    setQuestionChunks(chunk(exam.questions, pageSize));
  }, [exam]);

  return (
    <main
      id='exam-content'
      className='with-nav-height relative hidden w-full overflow-y-auto overflow-x-hidden md:flex'
    >
      <div className='flex min-h-full w-full flex-col items-start justify-start bg-white p-5 lg:p-8 3xl:p-10'>
        <div className='flex w-full flex-col'>
          <h3 className='text-xl font-semibold text-[#666] lg:text-2xl 3xl:text-3xl'>
            {exam.fromExam.subject.name}
          </h3>
          <h1 className='text-2xl font-bold lg:text-3xl 3xl:text-4xl'>{exam.fromExam.name}</h1>

          <div className='mt-1 flex flex-1 flex-row gap-x-4 lg:mt-2 3xl:mt-3'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='whitespace-nowrap text-xs text-[#666] lg:text-sm 3xl:text-base'>
                {parseDuration(exam.duration)}
              </p>
            </div>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto lg:h-5 3xl:h-6' fill='#666' />
              <p className='text-xs text-[#666] lg:text-sm 3xl:text-base'>
                {exam.questions.length} câu
              </p>
            </div>
          </div>

          <div className='mt-4 flex flex-row gap-x-4 lg:mt-6 3xl:mt-8'>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Trang hiện tại:{' '}
                <span className='text-[#4285F4]'>
                  {page}/{questionChunks.length}
                </span>
              </p>
            </div>
            <div className='w-fit rounded-lg border-2 border-[#49BBDD]/30 p-3 lg:p-4 3xl:p-5'>
              <p className='text-sm font-medium lg:text-base 3xl:text-xl'>
                Điểm số:{' '}
                <span className='text-[#4285F4]'>{(exam.standardizedScore ?? 0).toFixed(2)}</span>
              </p>
            </div>
          </div>

          <Histogram scores={summary.completedScores} />

          <div className='mt-5 mb-10 flex flex-col space-y-4 lg:mt-8 3xl:mt-10'>
            {questionChunks[page - 1]?.map((question, index) => (
              <QuestionCard
                key={`desktop-question-${question.questionId}-review`}
                question={question}
                status={exam.status}
                questionNumber={(page - 1) * pageSize + index + 1}
                showExplanation={false}
                showNote={false}
              />
            ))}
          </div>
          <Pagination
            totalCount={exam.questions.length}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
      <QuestionBoard
        exam={exam}
        currentSet={currentSet}
        setCurrentSetIndex={(index: number) =>
          setPage((prev) => {
            const currentPage = Math.ceil(index / pageSize);

            if (currentPage !== prev) {
              return currentPage;
            }
            return prev;
          })
        }
        handleReview={() => navigate(-1)}
      />
    </main>
  );
};

export default DesktopReview;
