import { Link, useNavigate, useParams } from 'react-router-dom';

import './index.css';
import { Icon } from '../../../components';
import { Page, Wrapper } from '../../../layout';
// import { EXAM_TYPE_OPTIONS, SEMESTER_OPTIONS } from '../../../types/examArchive';

const MaterialView = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='w-full bg-[#4285F4]/90 py-4'>
          <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl'>
            Xem thông tin tài liệu
          </p>
        </div>
        <div className='w-full p-4'>
          <Link className='mb-2 flex items-center hover:underline' to='/admin/exam-archive/manage'>
            <Icon.Chevron className='h-5 -rotate-90 fill-black' />
            <p className='text-sm text-[#5B5B5B]'>Quay lại</p>
          </Link>
          <div
            className='h-full w-full rounded-lg bg-white px-8 py-2
            lg:px-10 lg:py-4 3xl:px-12 3xl:py-6'
          >
            <form className='flex flex-col gap-y-6'>
              <div className='flex w-full flex-col items-start justify-center'>
                <label className='mb-2 w-full' htmlFor='exam-name'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>
                    Tên đề thi
                  </p>
                </label>
                <div
                  id='exam-name'
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs font-medium
                  lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                >
                  {params.id}
                </div>
              </div>
              <div className='flex w-full flex-1 flex-row items-center justify-start gap-x-4'>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Môn</p>
                  <div className='flex h-full w-full flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                    <span>Giải tích 1</span>
                  </div>
                </div>
                <div className='flex w-full flex-1 flex-col'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Chương</p>
                  <div className='flex h-full w-full flex-1 rounded-lg border border-[#CCC] p-1 text-xs font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'>
                    <span>Chương 1: Đạo hàm</span>
                  </div>
                </div>
              </div>
              <div className='flex w-full flex-col items-start justify-center'>
                <label className='mb-2 w-full' htmlFor='exam-description'>
                  <p className='w-full text-sm font-semibold lg:text-base 3xl:text-xl'>Chú thích</p>
                </label>
                <div
                  className='flex w-full rounded-lg border border-[#CCC] p-1 text-xs
                  font-medium lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base'
                >
                  Không có chú thích nào cả
                </div>
              </div>
            </form>
          </div>
          <button
            type='button'
            onClick={() => navigate(`/admin/material/edit/${params.id}`)}
            className='w-full cursor-pointer bg-[#4285F4]/80 py-4 hover:bg-[#4285F4]'
          >
            <p className='text-center text-sm font-bold text-white md:text-2xl 3xl:text-4xl '>
              Chỉnh sửa tài liệu
            </p>
          </button>
        </div>
      </Wrapper>
    </Page>
  );
};

export default MaterialView;
