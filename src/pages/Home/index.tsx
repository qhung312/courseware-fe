/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';

import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Autoplay, Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { Footer, LazyLoadImage, SignInModal, Icon } from '../../components';
// import { CarouselData as data } from '../../data/CarouselData';
import { useWindowDimensions } from '../../hooks';
import { Page } from '../../layout';

const HomePage = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const carousel = document.getElementById('homepage-carousel');
    const introduction = document.getElementById('homepage-introduction');
    if (width >= 1024 && carousel && introduction) {
      carousel.style.height = `${introduction.getBoundingClientRect().height + 60}px`;
    } else {
      carousel?.style.removeProperty('height');
    }
  }, [width]);

  return (
    <>
      {' '}
      <Page>
        <main className='flex w-full flex-col items-center justify-start overflow-x-visible bg-inherit'>
          <div
            className='ml-0 mr-0 flex w-full flex-1 flex-col items-center justify-center overflow-x-visible py-10 px-5 md:space-y-10
          lg:space-y-20 lg:py-[60px] lg:px-10 xl:px-[60px] xl:py-20 2xl:px-20 3xl:space-y-[100px] 3xl:px-[100px]'
          >
            <section
              id='homepage-section-1'
              className='mb-10 hidden w-full flex-1 flex-col gap-y-5 gap-x-10 md:flex lg:mb-0 lg:flex-row'
            >
              <div
                id='homepage-introduction'
                className='flex h-fit w-full min-w-fit flex-1 flex-col items-start justify-start text-[#4D4D4D] lg:min-w-[45%]'
              >
                <h1
                  className='text-center text-xl font-semibold leading-normal text-[#1488D8] md:text-2xl 
                md:font-bold md:leading-normal xl:text-[32px] xl:leading-normal 3xl:leading-9'
                >
                  Giới thiệu
                </h1>
                <h2 className='mb-5 text-[28px] font-bold uppercase leading-normal text-[#030391] md:text-4xl md:font-semibold md:normal-case md:leading-normal xl:text-5xl xl:leading-normal'>
                  Hệ thống chia sẻ tài liệu
                </h2>
                <div
                  className='text-justify text-base leading-loose text-[#696984]
                lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'
                >
                  <p>
                    Nguồn tài liệu học tập đa dạng và hữu ích dành cho sinh viên. Sự hỗ trợ quý báu
                    cho việc nghiên cứu và học tập của bạn với thư viện bài giảng, tài liệu tham
                    khảo và bài tập từ nhiều lĩnh vực khác nhau.
                  </p>
                </div>
                <div className='hidden flex-col space-y-6 md:flex'>
                  <div className='flex w-fit space-x-6'>
                    <div className='flex items-center space-x-4 rounded-[20px] py-[14px] px-5 shadow-md'>
                      <Icon.School fill='#1488D8' />
                      <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                        Thư viện tài liệu
                      </p>
                    </div>
                    <div className='flex items-center space-x-4 rounded-[20px] py-[14px] px-5 shadow-md'>
                      <Icon.ClassIcon fill='#1488D8' className='h-8 w-8' />
                      <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                        Thư viện đề thi
                      </p>
                    </div>
                  </div>
                  <div className='mr-6 flex w-fit items-center space-x-4 rounded-[20px] py-[14px] px-5 shadow-md'>
                    <Icon.WhatshotIcon fill='#1488D8' className='h-8 w-8' />
                    <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                      Bài tập rèn luyện các môn học
                    </p>
                  </div>
                </div>
              </div>
              <div id='homepage-carousel' className='relative h-full w-full lg:w-[40%] xl:w-1/2'>
                <LazyLoadImage
                  className='z-[1] block aspect-[5/2] rounded-[20px]'
                  src={require('../../assets/images/Home1.jpg')}
                  placeHolderSrc={require('../../assets/images/Home1-placeholder.jpg')}
                  alt='tstt_alt'
                  objectFit='contain'
                />
              </div>
            </section>
            <section
              id='homepage-section-1'
              className='mb-10 flex w-full flex-1 flex-col gap-y-5 gap-x-10 md:hidden lg:mb-0 lg:flex-row'
            >
              <div
                id='homepage-introduction'
                className='flex h-fit w-full min-w-fit flex-1 flex-col items-center justify-start text-[#4D4D4D] lg:min-w-[45%]'
              >
                <h1 className='text-[28px] font-bold uppercase leading-normal text-[#030391] md:text-4xl md:font-semibold md:normal-case md:leading-normal xl:text-5xl xl:leading-normal'>
                  Hệ thống chia sẻ tài liệu
                </h1>
                <h2
                  className='text-center text-xl font-semibold leading-normal text-black md:text-2xl md:font-bold 
                md:leading-normal md:text-[#1488D8] xl:text-[32px] xl:leading-normal 3xl:leading-9'
                >
                  Học hỏi và sẻ chia
                </h2>
              </div>
              <div id='homepage-carousel' className='relative h-full w-full lg:w-1/2'>
                <LazyLoadImage
                  className='z-[1] block aspect-[5/2] rounded-[20px]'
                  src={require('../../assets/images/Home1.jpg')}
                  placeHolderSrc={require('../../assets/images/Home1-placeholder.jpg')}
                  alt='tstt_alt'
                  objectFit='contain'
                />
              </div>
              <div
                id='homepage-introduction'
                className='mt-10 flex h-fit w-full min-w-fit flex-1 flex-col items-start justify-start text-[#4D4D4D] lg:min-w-[45%]'
              >
                <h2
                  className='w-full text-center text-2xl font-semibold leading-normal text-[#1488D8] 
                md:text-2xl md:font-bold md:leading-normal xl:text-[32px] xl:leading-normal 3xl:leading-9'
                >
                  Giới thiệu
                </h2>
                <div
                  className='text-justify text-base leading-loose text-[#696984]
                lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'
                >
                  <p>
                    Nguồn tài liệu học tập đa dạng và hữu ích dành cho sinh viên. Sự hỗ trợ quý báu
                    cho việc nghiên cứu và học tập của bạn với thư viện bài giảng, tài liệu tham
                    khảo và bài tập từ nhiều lĩnh vực khác nhau.
                  </p>
                </div>
                <div className='mt-3 flex flex-col space-y-2'>
                  <div className='flex w-fit space-x-2'>
                    <div className='flex items-center space-x-4 rounded-[20px] py-1 px-3 shadow-md'>
                      <Icon.School fill='#1488D8' />
                      <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                        Thư viện tài liệu
                      </p>
                    </div>
                    <div className='flex items-center space-x-4 rounded-[20px] py-1 px-3 shadow-md'>
                      <Icon.ClassIcon fill='#1488D8' className='h-8 w-8' />
                      <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                        Thư viện đề thi
                      </p>
                    </div>
                  </div>
                  <div className='mr-6 flex w-fit items-center space-x-4 rounded-[20px] py-2 px-3 shadow-md'>
                    <Icon.WhatshotIcon fill='#1488D8' className='h-8 w-8' />
                    <p className='font-medium text-[#1488D8] lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'>
                      Bài tập rèn luyện các môn học
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className='mb-7 flex w-[calc(100%+40px)] flex-col gap-6 rounded-[20px] bg-[#9DCCFF]/20 px-5 py-6 md:mb-12 md:w-[108%] md:py-8 md:px-[4%] lg:mb-16 lg:gap-8 lg:py-12 2xl:mb-20 2xl:gap-10 2xl:py-16'>
              <div className='flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='flex flex-col justify-center gap-2 md:max-w-[46%] lg:gap-4 2xl:gap-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Thư viện tài liệu và đề thi
                  </h2>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Kho lưu trữ đa dạng về tài liệu học tập, bao gồm sách, bài giảng, bài viết, và
                    nhiều loại tài liệu tham khảo khác từ nhiều lĩnh vực khác nhau. Qua đó giúp sinh
                    viên dễ dàng tìm kiếm và nghiên cứu những nguồn thông tin liên quan đến chương
                    trình học của họ.
                  </p>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[5/2] rounded-[20px]'
                    src={require('../../assets/images/Home2.jpg')}
                    placeHolderSrc={require('../../assets/images/Home2-placeholder.jpg')}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col-reverse items-start justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[5/2] rounded-[20px]'
                    src={require('../../assets/images/Home3.jpg')}
                    placeHolderSrc={require('../../assets/images/Home3-placeholder.jpg')}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
                <div className='flex items-center justify-center md:max-w-[46%]'>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Mang đến cho các bạn sinh viên một bộ sưu tập đề thi và bài tập mẫu từ các học
                    kỳ trước đây. Các bạn sẽ có cơ hội được ôn tập và làm quen với định dạng và nội
                    dung kiểm tra, giúp họ tự tin hơn khi đối diện với các kỳ thi thực tế.
                  </p>
                </div>
              </div>
            </section>
            <section className='flex w-full flex-col items-center justify-center gap-y-2'>
              <div className='flex w-full items-start'>
                <h2 className='text-start text-[24px] font-semibold text-[#030391] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                  Bài tập rèn luyện
                </h2>
              </div>
              <div className='flex w-full flex-col justify-between gap-y-5 md:flex-row-reverse md:gap-x-12 lg:gap-x-20 2xl:gap-x-24 3xl:gap-x-28'>
                <div className='flex w-full flex-col items-start gap-y-2 md:gap-y-3 lg:gap-y-4 2xl:gap-y-5'>
                  <h2
                    className='text-start text-xl font-semibold text-black md:text-2xl 
                md:leading-normal xl:text-[32px]'
                  >
                    Giới thiệu
                  </h2>
                  <p className='text-start text-[16px] leading-7 text-[#696984] lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                    Các bạn sẽ tham gia vào một bài kiểm tra để đánh giá kiến thức và kỹ năng của
                    bản thân. Trên môi trường trực tuyến, sinh viên sẽ trả lời các câu hỏi hoặc hoàn
                    thành các bài tập được thiết kế để phản ánh nội dung học tập trên trường. Hoạt
                    động này sẽ giúp bạn tự đánh giá mức độ hiểu biết, chuẩn bị tốt nhất cho kỳ thi
                    chính thức, và cũng có thể cung cấp phản hồi quan trọng về sự tiến bộ của bạn
                    trong quá trình học tập.
                  </p>
                </div>
                <div className='grid w-full grid-cols-1 gap-y-5 gap-x-10 lg:grid-cols-2 lg:gap-x-8 lg:py-4 2xl:gap-x-10 2xl:py-8'>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#49BBBD]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.UpRightArrowIcon className='h-6 w-auto fill-[#49BBBD] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Cải thiện kĩ năng làm bài
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#9DCCFF]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.Pen className='h-6 w-auto fill-[#9DCCFF] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Làm quen với môi trường thi cử
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#9DCCFF]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.FiveWingStarIcon className='h-6 w-auto fill-[#9DCCFF] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Nâng cao điểm thi thật
                    </p>
                  </div>
                  <div className='flex flex-row items-center gap-x-2 rounded-[20px] p-4 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:h-auto md:gap-x-3 lg:gap-x-4 2xl:gap-x-5 2xl:p-6'>
                    <div className='flex aspect-square h-[60px] items-center justify-center rounded bg-[#49BBBD]/30 lg:h-[72px] 2xl:h-20 3xl:h-[90px]'>
                      <Icon.DocumentPageIcon className='h-6 w-auto fill-[#49BBBD] 3xl:h-[30px]' />
                    </div>
                    <p className='flex w-full justify-center whitespace-nowrap text-center text-[18px] leading-7 text-[#696984] md:flex-wrap md:whitespace-normal lg:text-[20px] lg:leading-8 2xl:text-[24px] 2xl:leading-10'>
                      Ôn tập kiến thức đại cương
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </Page>
      <SignInModal />
    </>
  );
};

export default HomePage;
