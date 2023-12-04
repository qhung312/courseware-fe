import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { Outlet, useLocation } from 'react-router-dom';

import IntroductionPlaceHolder from '../../assets/images/Introduction-placeholder.jpg';
import IntroductionImg from '../../assets/images/IntroductionPic.jpg';
import MissionPlaceholder from '../../assets/images/Mission-small.png';
import MissionImg from '../../assets/images/Mission.jpg';
import VisionPlaceholder from '../../assets/images/Vision-small.jpg';
import VisionImg from '../../assets/images/Vision.jpg';
import { Footer, LazyLoadImage } from '../../components';
import { Page } from '../../layout';

const AboutUsPage = () => {
  const { pathname } = useLocation();

  return pathname === '/about-us' ? (
    <Page title='Về chúng tôi'>
      <main className='flex w-full flex-col items-center px-4 md:px-5 lg:px-10 xl:px-20 3xl:px-[100px]'>
        {/* Banner */}
        <div className='relative flex w-full flex-col items-center justify-center space-y-16 py-8 md:py-12 lg:space-y-0 lg:py-16 xl:py-24 2xl:py-[124px]'>
          <div className='z-[4] lg:absolute lg:text-white'>
            <h1 className='text-center text-[28px] font-bold md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'>
              CHÚNG TA CÙNG TIẾN
            </h1>
            <h3 className='text-center text-xl font-semibold italic opacity-50 lg:text-2xl xl:text-3xl 2xl:text-4xl'>
              We Learn - We Share
            </h3>
          </div>
          <div className='relative w-full p-3 sm:p-4 md:p-0'>
            <div className='absolute top-0 left-0 z-0 aspect-square w-[52px] rounded-lg bg-[#4285F4] sm:w-[72px] md:-top-4 md:-left-4 md:w-24 md:rounded-xl lg:-top-5 lg:-left-5 lg:w-32 xl:-top-6 xl:-left-6 xl:w-40 xl:rounded-2xl 2xl:-top-8 2xl:-left-8 2xl:w-52 2xl:rounded-3xl' />
            <div className='absolute bottom-0 right-0 z-0 aspect-square w-[90px] rounded-lg bg-[#A0C3FF] sm:w-[72px] md:-bottom-4 md:-right-4 md:w-32 md:rounded-xl lg:-bottom-5 lg:-right-5 lg:w-40 xl:-bottom-6 xl:-right-6 xl:w-52 xl:rounded-2xl 2xl:-bottom-8 2xl:-right-8 2xl:w-64 2xl:rounded-3xl' />

            <div className='absolute -bottom-8 left-0 z-0 aspect-square w-[20px] rounded-full bg-[#A0C3FF]  md:-left-6 md:-bottom-16 md:w-8 lg:-bottom-20 lg:w-10 xl:-bottom-24 xl:w-12 2xl:-bottom-32 2xl:w-16' />

            <LazyLoadImage
              containerClassName='overflow-hidden w-full block aspect-[360/200]'
              className='z-[1] block aspect-[360/200] rounded-lg md:rounded-xl lg:brightness-[50%] xl:rounded-2xl 2xl:rounded-3xl'
              src={IntroductionImg}
              placeHolderSrc={IntroductionPlaceHolder}
              alt='introduction_pic'
              objectFit='cover'
            />
          </div>
        </div>

        {/* Section 1 */}
        <div className='flex w-full flex-col space-y-16 py-8 md:justify-between md:gap-x-12 md:py-12 lg:flex-row lg:space-y-0 lg:py-16 xl:py-24 2xl:gap-x-20 2xl:py-[124px]'>
          <div className='space-y-3 md:max-w-md md:space-y-4 xl:max-w-xl xl:space-y-5 2xl:max-w-2xl '>
            <h2 className='text-center text-[28px] font-bold md:text-start md:uppercase lg:text-[32px] xl:text-[36px] 2xl:text-[40px]'>
              Giới thiệu
            </h2>
            <p className='text-justify text-[12px] text-[#696984] lg:text-[16px] 2xl:text-[22px]'>
              Chúng Ta Cùng Tiến là Câu lạc bộ học thuật được thành lập dưới sự quản lý của Trung
              tâm Hỗ trợ Sinh viên và Việc làm. CLB là tập hợp của những cá nhân Vững mạnh kiến thức
              trong CHUYÊN MÔN; Tiên phong sáng tạo trong TRUYỀN THÔNG; Năng động thích ứng trong SỰ
              KIỆN; và Thân thiện, hài hòa trong NHÂN SỰ HẬU CẦN.
            </p>
          </div>
          <div className='space-y-3 md:max-w-md md:space-y-4 md:self-end lg:self-auto xl:max-w-xl xl:space-y-5 2xl:max-w-2xl '>
            <h2 className='text-center text-[28px] font-bold md:text-end md:uppercase lg:text-start lg:text-[32px] xl:text-[36px] 2xl:text-[40px]'>
              THÀNH LẬP
            </h2>
            <p className='text-justify text-[12px] text-[#696984] lg:text-[16px] 2xl:text-[22px]'>
              Tiền thân của Chúng Ta Cùng Tiến là Đội nhóm phát triển Matlab hỗ trợ học tập trong bộ
              môn Giải tích 1. Đến năm 2013, Chương trình Chúng Ta Cùng Tiến ra đời nhằm mục đích
              giúp đỡ sinh viên học tập với lực lượng nòng cốt là các sinh viên tài năng. Đến hiện
              nay trở thành một CLB lớn với đội ngũ nhân sự nòng cốt mạnh mẽ, chất lượng trong các
              ban.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className='flex w-[calc(100%+32px)] flex-col items-center justify-center bg-[#4285F4] px-[72px] py-8 md:w-[calc(100%+40px)] md:py-12 md:px-5 lg:w-[calc(100%+80px)] lg:px-10 xl:w-[calc(100%+160px)] xl:py-24 xl:px-20 2xl:py-[124px] 3xl:w-[calc(100%+200px)] 3xl:px-[100px]'>
          <div className='w-full space-y-3 md:max-w-xs md:space-y-4 lg:max-w-md xl:max-w-xl xl:space-y-5 2xl:max-w-2xl '>
            <h1 className='text-center text-[28px] font-bold text-white md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'>
              We <span className='text-[#F4B301]'>Learn</span> - We{' '}
              <span className='text-[#F4B301]'>Share</span>
            </h1>
            <p className='text-center text-[12px] font-medium text-white opacity-80 lg:text-[16px] 2xl:text-[22px]'>
              Với khẩu hiệu “We Learn We Share”, Chúng Ta Cùng Tiến luôn mang trong mình một trọng
              trách là tổ chức hoạt động vì lợi ích của sinh viên và kết nối, đồng hành cùng sinh
              viên.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className='flex w-full flex-col-reverse py-8 md:flex-row md:justify-between md:gap-x-12 md:py-12 lg:py-16 xl:py-24 2xl:gap-x-20 2xl:py-[124px]'>
          <div className='flex flex-1 items-center'>
            <div className='w-full space-y-3 md:max-w-xs md:space-y-4 lg:max-w-md xl:max-w-xl xl:space-y-5 2xl:max-w-2xl '>
              <h2 className='text-center text-[28px] font-bold md:text-start md:uppercase lg:text-[32px] xl:text-[36px] 2xl:text-[40px]'>
                SỨ MỆNH
              </h2>
              <p className='text-center text-[12px] text-[#696984] md:text-justify lg:text-[16px] 2xl:text-[22px]'>
                Chúng Ta Cùng Tiến luôn giữ vững tinh thần thiện nguyện là một tổ chức phi lợi nhuận
                hoạt động vì lợi ích của sinh viên; luôn đồng hành, lắng nghe nhằm đưa đến những giá
                trị tốt nhất cho sinh viên và cộng đồng. 
              </p>
            </div>
          </div>
          <div className='mb-8 flex-1 md:mb-0'>
            <LazyLoadImage
              className='rounded-lg'
              containerClassName='block aspect-[360/200]'
              src={MissionImg}
              placeHolderSrc={MissionPlaceholder}
              alt='introduction_pic'
              objectFit='cover'
            />
          </div>
        </div>

        {/* Section 4 */}
        <div className='flex w-full flex-col-reverse py-8 md:flex-row md:justify-between md:gap-x-12 md:py-12 lg:py-16 xl:py-24 2xl:gap-x-20 2xl:py-[124px]'>
          <div className='flex flex-1 items-center'>
            <div className='w-full space-y-3 md:max-w-xs md:space-y-4 lg:max-w-md xl:max-w-xl xl:space-y-5 2xl:max-w-2xl '>
              <h2 className='text-center text-[28px] font-bold md:text-start md:uppercase lg:text-[32px] xl:text-[36px] 2xl:text-[40px]'>
                TẦM NHÌN
              </h2>
              <p className='text-center text-[12px] text-[#696984] md:text-justify lg:text-[16px] 2xl:text-[22px]'>
                <span className='font-bold'>
                  Giữ vững, sáng tạo và phát triển tạo nên những giá trị lớn cho sinh viên, xã hội.
                </span>{' '}
                <br className='md:hidden' />
                Là một Câu lạc bộ có độ uy tín cao và nhận được sự tin cậy trong cộng đồng sinh viên
                Bách Khoa nói riêng và sinh viên các trường đại học nói chung.
              </p>
            </div>
          </div>
          <div className='mb-8 flex-1 md:mb-0'>
            <LazyLoadImage
              className='rounded-lg'
              containerClassName='block aspect-[360/200]'
              src={VisionImg}
              placeHolderSrc={VisionPlaceholder}
              alt='introduction_pic'
              objectFit='cover'
            />
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  ) : (
    <Outlet />
  );
};

export default AboutUsPage;
