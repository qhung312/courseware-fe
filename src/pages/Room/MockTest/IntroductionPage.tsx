import { Link } from 'react-router-dom';

import { Footer, Icon, LazyLoadImage } from '../../../components';
import { Page } from '../../../layout';
// import './index.css';

const MockTestPage = () => {
  return (
    <Page title='Thi thử'>
      <main className='with-nav-height flex flex-col gap-y-5 overflow-y-auto text-[16px] md:text-[14px] lg:gap-y-12 lg:text-[18px] xl:text-[20px] 2xl:gap-y-16 3xl:gap-y-20'>
        <div className='w-full'>
          <LazyLoadImage
            className='header z-[1] block aspect-[52/25] md:aspect-[4/1]'
            src={require('../../../assets/images/MockTest_1.jpg')}
            placeHolderSrc={require('../../../assets/images/MockTest_1-placeholder.jpg')}
            alt='tstt_alt'
            objectFit='cover'
          />
        </div>
        <div className='mb-6 flex w-full flex-col gap-y-7 px-5 md:gap-y-12 md:px-12 lg:mb-8 lg:gap-y-20 lg:px-24 2xl:mb-10 2xl:gap-y-24 2xl:px-32 3xl:mb-12 3xl:gap-y-28 3xl:px-40'>
          <div className='flex w-full flex-col items-center justify-center gap-y-2'>
            <div className='flex w-full items-start'>
              <h1 className='text-start text-[28px] font-bold text-[#2F327D] md:text-[24px] md:text-2xl md:text-[#2F327D] lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                Thi thử
              </h1>
            </div>
            <div className='flex w-full flex-col justify-between gap-y-5 md:flex-row-reverse md:gap-x-12 lg:gap-x-20 2xl:gap-x-24 3xl:gap-x-28'>
              <div className='flex w-full flex-col items-start gap-y-2 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                <h2 className='text-start text-2xl font-semibold text-black lg:text-3xl 2xl:text-4xl'>
                  Giới thiệu
                </h2>
                <p className='text-start text-[16px] leading-7 text-[#696984] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                  Đối với hoạt động thi thử, các bạn sẽ tham gia vào một bài kiểm tra để đánh giá
                  kiến thức và kỹ năng của bản thân. Trên môi trường trực tuyến, các bạn sinh viên
                  sẽ trả lời các câu hỏi hoặc hoàn thành các bài tập được thiết kế để phản ánh nội
                  dung học tập trên trường. Hoạt động này sẽ giúp bạn tự đánh giá mức độ hiểu biết,
                  chuẩn bị tốt nhất cho kỳ thi chính thức, và cũng có thể cung cấp phản hồi quan
                  trọng về sự tiến bộ của bạn trong quá trình học tập.
                </p>
              </div>
              <div className='2xl: grid w-full grid-cols-1 gap-y-5 gap-x-10 md:grid-cols-2 md:gap-x-8 md:py-4 lg:gap-x-9 lg:py-6 2xl:gap-x-10 2xl:py-8'>
                <div className='flex flex-row items-center rounded-[20px] p-4 shadow-lg md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                  <div className='flex aspect-square h-full items-center justify-center rounded-lg bg-[#49BBBD]/30 md:max-h-14 lg:max-h-16 2xl:max-h-20'>
                    <Icon.UpRightArrowIcon className='aspect-square w-[54px] fill-[#49BBBD] md:w-4 lg:w-5 2xl:w-6' />
                  </div>
                  <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Cải thiện kĩ năng làm bài
                  </p>
                </div>
                <div className='flex flex-row items-center rounded-[20px] p-4 shadow-lg md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                  <div className='flex aspect-square h-full items-center justify-center rounded-lg bg-[#9DCCFF]/30 md:max-h-14 lg:max-h-16 2xl:max-h-20'>
                    <Icon.Pen className='aspect-square w-[54px] fill-[#9DCCFF] md:w-4 lg:w-5 2xl:w-6' />
                  </div>
                  <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Làm quen với môi trường thi cử
                  </p>
                </div>
                <div className='flex flex-row items-center rounded-[20px] p-4 shadow-lg md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                  <div className='flex aspect-square h-full items-center justify-center rounded-lg bg-[#9DCCFF]/30 md:max-h-14 lg:max-h-16 2xl:max-h-20'>
                    <Icon.FiveWingStarIcon className='aspect-square w-[54px] fill-[#9DCCFF] md:w-4 lg:w-5 2xl:w-6' />
                  </div>
                  <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Nâng cao điểm thi thật
                  </p>
                </div>
                <div className='flex flex-row items-center rounded-[20px] p-4 shadow-lg md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                  <div className='flex aspect-square h-full items-center justify-center rounded-lg bg-[#49BBBD]/30 md:max-h-14 lg:max-h-16 2xl:max-h-20'>
                    <Icon.DocumentPageIcon className='aspect-square w-[54px] fill-[#49BBBD] md:w-4 lg:w-5 2xl:w-6' />
                  </div>
                  <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Ôn tập kiến thức đại cương
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col items-start gap-y-5 bg-[#9DCCFF]/20 px-5 pt-10 pb-16 md:gap-y-6 md:px-12 lg:gap-y-8 lg:px-24 lg:pt-12 lg:pb-20 2xl:gap-y-10 2xl:px-32 2xl:pt-16 2xl:pb-24 3xl:px-40 3xl:pt-20 3xl:pb-28'>
          <h2 className='text-start text-2xl font-semibold text-black lg:text-3xl 2xl:text-4xl'>
            Các đợt thi thử
          </h2>
          <div className='grid w-full grid-cols-1 justify-between gap-y-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 2xl:gap-x-20'>
            <div className='flex flex-col gap-y-7 rounded-[20px] bg-white p-4 shadow-lg md:gap-y-6 lg:gap-y-8 lg:p-6 2xl:gap-y-12 2xl:p-8'>
              <LazyLoadImage
                className='header z-[1] block aspect-[2/1] rounded-[20px]'
                src={require('../../../assets/images/MockTest_2.jpg')}
                placeHolderSrc={require('../../../assets/images/MockTest_2-placeholder.jpg')}
                alt='tstt_alt'
                objectFit='cover'
              />
              <div className='flex w-full flex-col items-start gap-y-4 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                <h3 className='text-start text-xl font-medium text-[#2F327D] lg:text-[28px] 2xl:text-[32px]'>
                  Thi thử Giữa Kì
                </h3>
                <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#7BCFA9] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                  <div className='aspect-square w-5 rounded-full bg-[#33B679] lg:w-7 2xl:w-8 3xl:w-9' />
                  <p className='text-start text-[16px] font-semibold leading-5 text-white lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Đang diễn ra
                  </p>
                </div>
                <p className='text-start text-[16px] font-normal leading-7 text-[#696984] lg:text-[18px] lg:leading-8 2xl:text-[22px] 2xl:leading-10'>
                  Đăng ký thi thử giữa kỳ online là cơ hội để đánh giá kiến thức và kỹ năng của mình
                  qua những câu hỏi ôn tập bám sát thực tế.
                </p>
                <div className='flex w-full items-center justify-start gap-x-1 lg:gap-x-2 2xl:gap-x-3'>
                  <Icon.CalendarIcon className='aspect-square w-5 fill-[#49BBBD] 2xl:w-6' />
                  <p className='text-start text-[16px] font-normal leading-7 text-[#2D3436] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Mở từ xx/xx/xxxx đến xx/xx/xxxx
                  </p>
                </div>
              </div>
              <div className='flex w-full flex-row items-center justify-between'>
                <Link to='/room/tests/detail' className='flex cursor-pointer'>
                  <p className='text-start text-[16px] font-normal leading-7 text-[#696984] underline lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Chi tiết
                  </p>
                </Link>
                <div className='flex flex-row items-center gap-x-1 lg:gap-x-2 2xl:gap-x-3'>
                  <Icon.Exercise className='aspect-[6/5] w-5 fill-[#49BBBD] 2xl:w-6' />
                  <p className='text-start text-[16px] font-normal leading-7 text-[#696984] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    8 Môn học
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-y-7 rounded-[20px] bg-white p-4 shadow-lg md:gap-y-6 lg:gap-y-8 lg:p-6 2xl:gap-y-12 2xl:p-8'>
              <LazyLoadImage
                className='header z-[1] block aspect-[2/1] rounded-[20px]'
                src={require('../../../assets/images/MockTest_3.jpg')}
                placeHolderSrc={require('../../../assets/images/MockTest_3-placeholder.jpg')}
                alt='tstt_alt'
                objectFit='cover'
              />
              <div className='flex w-full flex-col items-start gap-y-4 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                <h3 className='text-start text-xl font-medium text-[#2F327D] lg:text-[28px] 2xl:text-[32px]'>
                  Thi thử Cuối Kì
                </h3>
                <div className='flex flex-row items-center gap-x-4 rounded-full bg-[#F2F2F2] py-1 pl-2 pr-4 2xl:py-[6px] 2xl:pr-6'>
                  <div className='aspect-square w-5 rounded-full bg-[#CCCCCC] lg:w-7 2xl:w-8 3xl:w-9' />
                  <p className='text-start text-[16px] font-semibold leading-5 text-[#252641] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Chưa mở
                  </p>
                </div>
                <p className='text-start text-[16px] font-normal leading-7 text-[#696984] lg:text-[18px] lg:leading-8 2xl:text-[22px] 2xl:leading-10'>
                  Tham gia thi thử cuối kì để co sự chuẩn bị tốt nhất cho kỳ thi sắp tới qua những
                  câu hỏi, bài tập nhằm kiểm tra kiến thức của bản thân.
                </p>
                <div className='flex w-full items-center justify-start gap-x-1 lg:gap-x-2 2xl:gap-x-3'>
                  <Icon.CalendarIcon className='aspect-square w-5 fill-[#999999] 2xl:w-6' />
                  <p className='text-start text-[16px] font-normal leading-7 text-[#2D3436] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Dự kiến mở vào xx/xx/xxxx
                  </p>
                </div>
              </div>
              <div className='flex w-full flex-row items-center justify-between'>
                <Link to='/room/tests/detail/0' className='flex cursor-pointer'>
                  <p className='text-start text-[16px] font-normal leading-7 text-[#696984] underline lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    Chi tiết
                  </p>
                </Link>
                <div className='flex flex-row items-center gap-x-1 lg:gap-x-2 2xl:gap-x-3'>
                  <Icon.Exercise className='aspect-[6/5] w-5 fill-[#999999] 2xl:w-6' />
                  <p className='text-start text-[16px] font-normal leading-7 text-[#696984] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-9'>
                    8 Môn học
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default MockTestPage;
