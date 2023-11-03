import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Icon } from '../../../components';
// import { useDebounce } from '../../../hooks';
import { Page, Wrapper } from '../../../layout';
// import ChapterService from '../../../service/chapter.service';
// import QuestionTemplateService from '../../../service/questionTemplate.service';
// import SubjectService from '../../../service/subject.service';
import QuizTemplateService from '../../../service/quiz.service';
import { Quiz } from '../../../types';

const ViewExercisePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.exerciseid ?? '';
  const [exercises, setExercises] = useState<Quiz>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    QuizTemplateService.getById(id, true)
      .then((res) => {
        const result = res.data.payload;
        console.log('>>> result: ', result);
        setExercises(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Xem bài tập rèn luyện
          </p>
        </div>
        <div className='w-full p-4'>
          <button
            type='button'
            onClick={() => navigate(-1)}
            className='mb-2 flex items-center hover:underline'
          >
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </button>
          <div className='h-full w-full rounded-lg bg-white p-4 lg:p-6 3xl:p-8'>
            <main className='flex flex-col gap-y-4'>
              {loading ? (
                <>
                  <p className='mb-5 w-full px-6 lg:px-8 3xl:px-10'>
                    <Skeleton width={'100%'} baseColor='#9DCCFF' height={56} />
                  </p>
                  <p className='w-full px-6 lg:px-8 3xl:px-10'>
                    {
                      <Skeleton
                        count={10}
                        className='my-2 box-content lg:my-4 3xl:my-6'
                        width={'100%'}
                        height={40}
                        baseColor='#9DCCFF'
                      />
                    }
                  </p>
                </>
              ) : (
                <>
                  <div className='flex flex-col gap-y-1'>
                    <label
                      className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                      htmlFor='question_name'
                    >
                      Tên
                    </label>
                    <input
                      id='question_name'
                      className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                      value={exercises?.name}
                      placeholder={''}
                      disabled
                    />
                  </div>
                  <div className='flex flex-row gap-x-8'>
                    <div className='flex w-full flex-col gap-y-1'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Môn</p>
                      <div className='flex w-full flex-1 items-center rounded-lg border border-[#CCC] bg-[#efefef4d]  p-1 text-xs font-medium text-[#252641] lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                        {exercises?.subject?.name}
                      </div>
                    </div>
                    <div className='flex w-full flex-col gap-y-1'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Chương</p>
                      <div className='flex w-full flex-1 items-center rounded-lg border border-[#CCC] bg-[#efefef4d]  p-1 text-xs font-medium text-[#252641] lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                        {exercises?.chapter?.name}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>
                        Thời gian làm bài (hh:mm:ss)
                      </p>
                      <div className='flex justify-around'>
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={Math.floor((exercises?.duration ?? 0) / 3600000)}
                          type='number'
                          disabled
                        />
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={Math.floor((exercises?.duration ?? 0) / 60000) % 60}
                          type='number'
                          disabled
                        />
                        <input
                          className='flex w-[30%] rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                          value={Math.floor((exercises?.duration ?? 0) / 1000) % 60}
                          type='number'
                          disabled
                        />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'>Số câu hỏi</p>
                      <input
                        className='flex w-24 flex-1 rounded-lg border border-[#D9D9D9] p-1 text-center text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                        value={exercises?.sampleSize}
                        placeholder={'0'}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-1'>
                    <label
                      className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                      htmlFor='description'
                    >
                      Chú thích
                    </label>
                    <textarea
                      id='description'
                      rows={10}
                      className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                      value={exercises?.description}
                      placeholder={''}
                      disabled
                    />
                  </div>
                  <div className='flex flex-col gap-y-8'>
                    <div className='flex flex-row items-center gap-x-8'>
                      <label
                        className='flex text-base lg:text-lg 3xl:text-xl'
                        htmlFor='search_question'
                      >
                        Các câu hỏi có thể ra
                      </label>
                    </div>
                    <div>
                      <div className='mb-5 flex flex-1 flex-shrink-0 flex-row gap-x-4 px-6 lg:px-8 3xl:px-10'>
                        <p className='flex flex-[2.5] text-base font-semibold text-[#4285f4] lg:text-lg 3xl:text-xl'>
                          Tên
                        </p>
                        <p className='flex flex-[2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                          Môn
                        </p>
                        <p className='flex flex-[1.2] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                          Chương
                        </p>
                        <p className='flex flex-[1.5] text-base font-semibold text-[#4285F4] lg:text-lg 3xl:text-xl'>
                          Thời gian tạo
                        </p>
                      </div>
                      {exercises?.potentialQuestions?.map((question) => (
                        <div
                          key={question._id}
                          className='flex flex-1 flex-shrink-0 flex-row items-center gap-x-4 border-b border-b-[#CCC]/60
                        px-6 py-2 lg:py-4 lg:px-8 3xl:py-6 3xl:px-10'
                        >
                          <p className='flex flex-[2.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question.name}
                          </p>
                          <p className='flex flex-[2] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question?.subject?.name}
                          </p>
                          <p className='flex flex-[1.2] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {question?.chapter?.name}
                          </p>
                          <p className='flex flex-[1.5] text-xs font-medium lg:text-sm 3xl:text-base'>
                            {new Date(question.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='my-5 flex flex-row-reverse gap-x-8'>
                    <Link
                      to={`/admin/exercises/edit/${id}`}
                      className='w-fit cursor-pointer rounded-lg bg-[#4285F4]/80 px-1 transition-all duration-200 hover:bg-[#4285F4] lg:px-3 3xl:px-5'
                    >
                      <p className='p-1 text-xs font-medium text-white lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                        Chỉnh sửa
                      </p>
                    </Link>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default ViewExercisePage;
