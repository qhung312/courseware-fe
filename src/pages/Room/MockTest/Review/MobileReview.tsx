import { chunk } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Histogram, Icon, Pagination, QuestionBoard, QuestionCard } from '../../../../components';
import { ExamSession, Summary } from '../../../../types';
import { parseDuration } from '../../../../utils/helper';

const MobileReview: React.FC<{ exam: ExamSession; summary: Summary }> = ({ exam, summary }) => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const currentSet = Array.from({ length: pageSize }, (_a, index) => (page - 1) * pageSize + index);
  const [questionChunks, setQuestionChunks] = useState(chunk(exam.questions, 4));

  useEffect(() => {
    setQuestionChunks(chunk(exam.questions, pageSize));
  }, [exam]);

  return (
    <div className='with-nav-height relative w-full overflow-y-auto overflow-x-hidden md:hidden'>
      <div className='flex w-full flex-col items-start justify-start bg-[#F2F2F2] p-5 md:hidden'>
        <div className='flex w-full flex-col'>
          <h1 className='text-2xl font-bold'>
            <span className='text-2xl font-bold text-[#4285F4]'>Xem lại: </span>
            {exam.fromExam.name}
          </h1>
          <h3 className='text-xl font-medium'>Môn: {exam.fromExam.subject.name}</h3>
          <div className='mt-2 flex w-fit flex-row gap-x-2 rounded-lg border border-[#4285F4]/30 bg-white p-2'>
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.Clock className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>{parseDuration(exam.duration)}</p>
            </div>
            <span className='h-6 w-0 border-l-[0.5px] border-[#666]' />
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.List className='h-4 w-auto' fill='#49BBBD' />
              <p className='text-sm'>{(exam.standardizedScore ?? 0).toFixed(2)} điểm</p>
            </div>
          </div>

          <div className='mt-7 w-fit rounded-lg bg-[#4285F4] p-3'>
            <p className='text-sm text-white'>
              Trang: {page}/{questionChunks.length}
            </p>
          </div>

          <Histogram scores={summary.completedScores} />

          <div className='mt-5 mb-4 flex flex-col space-y-4'>
            {questionChunks[page - 1]?.map((question, index) => (
              <QuestionCard
                key={`mobile-question-${question.questionId}-review`}
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
        setCurrentSetIndex={(index: number) =>
          setPage((prev) => {
            const currentPage = Math.ceil(index / pageSize);

            if (currentPage !== prev) {
              return currentPage;
            }
            return prev;
          })
        }
        currentSet={currentSet}
        handleReview={() => navigate(-1)}
      />
    </div>
  );
};

export default MobileReview;
