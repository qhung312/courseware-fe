import { Link, useNavigate, useParams } from 'react-router-dom';

import { Icon } from '../../../components';
import { Page, Wrapper } from '../../../layout';
// import { EXAM_TYPE_OPTIONS, SEMESTER_OPTIONS } from '../../../types/examArchive';

const SubjectView = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Xem thông tin Môn học
          </p>
        </div>
        <div className='w-full p-4'>
          <Link className='mb-2 flex items-center hover:underline' to='/admin/exam-archive/manage'>
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </Link>
          <div
            className='h-full w-full rounded-lg bg-white px-8 py-2
            lg:px-10 lg:py-4 3xl:px-12 3xl:py-8'
          >
            <main className='flex flex-col gap-y-4'>
              {/**
               * Name field
               */}
              <div className='flex flex-col gap-y-1'>
                <label className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl' htmlFor='name'>
                  Tên
                </label>
                {/* <input
                  id='name'
                  className='flex w-full flex-1 rounded-lg border border-[#D9D9D9] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                  value={name}
                  onChange={onInputName}
                /> */}
                <div
                  id='exam-name'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs font-medium
                  lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                >
                  {params.id}
                </div>
              </div>

              {/**
               * Description field
               */}
              <div className='flex flex-col gap-y-1'>
                <label
                  className='flex flex-[2.5] text-base lg:text-lg 3xl:text-xl'
                  htmlFor='description'
                >
                  Chú thích
                </label>
                <div
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs
                  font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                >
                  Không có chú thích nào cả
                </div>
              </div>
              {/**
               * Create button
               */}
            </main>
          </div>
          <button
            type='button'
            onClick={() => navigate(`/admin/subject/edit/${params.id}`)}
            className='w-full cursor-pointer bg-[#4285F4]/80 py-4 hover:bg-[#4285F4]'
          >
            <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl '>
              Chỉnh sửa môn học
            </p>
          </button>
        </div>
      </Wrapper>
    </Page>
  );
};

export default SubjectView;
