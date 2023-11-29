/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './index.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { Footer, LazyLoadImage, UserSharingCard } from '../../components';
import { CarouselData as data, EventsAndActivities as events } from '../../data/CarouselData';
import { useWindowDimensions } from '../../hooks';
import { Page } from '../../layout';

const HomePage = () => {
  const { width } = useWindowDimensions();
  const [activitySlidesPerView, setActivitySlidesPerView] = useState<number>(1);

  useEffect(() => {
    const carousel = document.getElementById('homepage-carousel');
    const introduction = document.getElementById('homepage-introduction');
    if (width >= 1024 && carousel && introduction) {
      carousel.style.height = `${introduction.getBoundingClientRect().height + 60}px`;
    } else {
      carousel?.style.removeProperty('height');
    }
  }, [width]);

  useEffect(() => {
    if (width < 768) {
      setActivitySlidesPerView(1);
    } else if (width < 1280) {
      setActivitySlidesPerView(2);
    } else {
      setActivitySlidesPerView(3);
    }
  }, [width]);

  return (
    <Page>
      <main className='flex w-full flex-col items-center justify-start overflow-x-visible bg-inherit'>
        <div
          className='ml-0 mr-0 flex w-full flex-1 flex-col items-center justify-center space-y-10 overflow-x-visible py-10 px-5
          lg:space-y-20 lg:py-[60px] lg:px-10 xl:px-[60px] xl:py-20 2xl:px-20 3xl:space-y-[100px] 3xl:px-[100px]'
        >
          <section
            id='homepage-section-1'
            className='mb-10 flex w-full flex-1 flex-col gap-y-5 gap-x-10 lg:mb-0 lg:flex-row'
          >
            <div
              id='homepage-introduction'
              className='flex h-fit w-full min-w-fit flex-1 flex-col items-start justify-start text-[#4D4D4D] lg:min-w-[45%]'
            >
              <h1
                className='text-center text-xl font-semibold uppercase leading-normal text-[#4285F4] md:text-2xl 
                md:font-bold md:leading-normal xl:text-[32px] xl:leading-normal 3xl:leading-9'
              >
                Who We Are
              </h1>
              <h2 className='mb-5 text-[28px] font-bold uppercase leading-normal md:text-4xl md:font-semibold md:normal-case md:leading-normal md:text-[#2F327D] xl:text-5xl xl:leading-normal'>
                Chúng Ta Cùng Tiến
              </h2>
              <div
                className='text-justify text-base leading-loose text-[#696984]
                lg:text-xl lg:leading-loose 3xl:text-2xl 3xl:leading-loose'
              >
                <p>
                  <strong>Chúng Ta Cùng Tiến</strong> là Câu lạc bộ học thuật được thành lập dưới sự
                  quản lý của Trung tâm Hỗ trợ Sinh viên và Việc làm.
                </p>
                <p>
                  Với khẩu hiệu "We Learn We Share", Chúng Ta Cùng Tiến luôn mang trong mình một
                  trọng trách là tổ chức hoạt động vì lợi ích của sinh viên và kết nối, đồng hành
                  cùng sinh viên.
                </p>
                <p>
                  CLB là tập hợp của những cá nhân Vững mạnh kiến thức trong{' '}
                  <strong>CHUYÊN MÔN</strong>; Tiên phong sáng tạo trong{' '}
                  <strong>TRUYỀN THÔNG</strong>; Năng động thích ứng trong <strong>SỰ KIỆN</strong>;
                  và Thân thiện, hài hòa trong <strong>NHÂN SỰ HẬU CẦN</strong>.
                </p>
              </div>
            </div>
            <div id='homepage-carousel' className='relative h-full w-full lg:w-1/2'>
              <div className='absolute -top-2 -left-2 z-0 aspect-square w-[52px] rounded-lg bg-[#4285F4] lg:hidden' />
              <div className='absolute -bottom-2 -right-2 z-0 aspect-square w-[90px] rounded-lg bg-[#A0C3FF] lg:hidden' />
              <div className='absolute -bottom-8 left-0 z-0 aspect-square w-[20px] rounded-full bg-[#A0C3FF] lg:hidden' />

              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop
                loopPreventsSlide
                autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                speed={1200}
                pagination={{
                  el: '.homepage-swiper-pagination',
                  clickable: true,
                  renderBullet: function (_index, className) {
                    return '<span class="' + className + '"></span>';
                  },
                  type: 'bullets',
                }}
                modules={[Autoplay, Pagination]}
                initialSlide={2}
                className='flex h-full w-full flex-1'
              >
                {data.map((item, index) => (
                  <SwiperSlide className='relative h-full w-full min-w-full' key={item.id}>
                    <LazyLoadImage
                      src={item.imgSrc}
                      placeHolderSrc={item.imgPlaceholder}
                      containerClassName='w-full h-full'
                      alt={`slider background ${index}`}
                      className='h-full w-full rounded-lg object-center'
                      objectFit='cover'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='absolute w-full lg:bottom-3'>
                <div className='homepage-swiper-pagination swiper-pagination'></div>
              </div>
            </div>
          </section>
          <section className='relative -mx-4 flex w-screen overflow-hidden rounded-lg md:w-full'>
            <div className='absolute top-0 left-0 right-0 bottom-0 z-0 w-full'>
              <div className='absolute z-[8] h-full w-full bg-[#4285F4]/70' />
              <LazyLoadImage
                src={require('../../assets/images/Banner.jpg')}
                alt='banner'
                placeHolderSrc={require('../../assets/images/Banner-placeholder.jpg')}
                containerClassName='w-full h-full'
                className='inset-0 h-full w-[calc(100vw+60px)] max-w-[1000%] flex-shrink-0 object-bottom 
                md:w-full md:max-w-none md:object-[50%_70%]'
                objectFit='cover'
              />
            </div>
            <div className='relative z-10 flex w-full flex-row flex-wrap items-center justify-between gap-y-[60px] gap-x-10 p-5'>
              <h2
                className='flex-1 whitespace-nowrap text-center 
                text-2xl font-semibold text-white md:font-bold lg:text-3xl 3xl:text-5xl'
              >
                "Không Một Ai Bị Bỏ Lại Phía Sau"
              </h2>
              <div className='mx-auto flex flex-1 flex-col space-y-2 rounded-lg bg-white px-5 py-2 lg:px-10 lg:py-3 3xl:px-[60px] 3xl:py-4'>
                <div className='flex flex-row flex-wrap items-center justify-center'>
                  <p className='text-center text-lg font-bold lg:text-2xl 3xl:text-3xl'>
                    Cộng đồng không ngừng&nbsp;
                  </p>
                  <p className='text-center text-lg font-bold lg:text-2xl 3xl:text-3xl'>
                    <span className='whitespace-nowrap text-[#00A3FF]'>phát triển</span> và{' '}
                    <span className='whitespace-nowrap text-[#00A3FF]'>mở rộng</span>
                  </p>
                </div>
                <div className='flex flex-row items-center justify-center gap-x-6'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='whitespace-nowrap text-xl font-bold text-[#00A3FF] md:text-2xl lg:text-3xl 3xl:text-4xl'>
                      30000+
                    </p>
                    <p className='whitespace-nowrap text-base font-bold md:text-xl lg:text-2xl 3xl:text-3xl'>
                      Sinh viên
                    </p>
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='whitespace-nowrap text-xl font-bold text-[#00A3FF] md:text-2xl lg:text-3xl 3xl:text-4xl'>
                      7
                    </p>
                    <p className='whitespace-nowrap text-base font-bold md:text-xl lg:text-2xl 3xl:text-3xl'>
                      Môn học
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='flex h-fit w-full flex-col items-start justify-center space-y-5 lg:space-y-10 3xl:space-y-[60px]'>
            <div className='flex w-full flex-row items-center justify-between'>
              <h2 className='whitespace-normal text-left text-lg font-semibold lg:text-2xl 3xl:text-3xl'>
                Những <span className='text-[#4385F4]'>Sự kiện</span> và{' '}
                <span className='text-[#4285F4]'>Hoạt động</span>{' '}
                <span className='hidden md:inline-block'>của Câu lạc bộ</span>
              </h2>
              <div className='flex flex-col items-end justify-end gap-y-[8px]'>
                <Link to='/about-us/activities' className='flex flex-row items-center'>
                  <p className='text-center text-xs font-bold text-[#4285F4] underline lg:text-base 3xl:text-xl'>
                    Xem tất cả
                  </p>
                </Link>
              </div>
            </div>
            <div id='activities-carousel' className='relative h-full w-full overflow-hidden'>
              <Swiper
                spaceBetween={60}
                slidesPerView={activitySlidesPerView}
                slidesPerGroup={1}
                loop
                loopPreventsSlide
                autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                speed={1200}
                pagination={{
                  el: '.activities-carousel-pagination',
                  clickable: true,
                  renderBullet: function (_index, className) {
                    return '<span class="' + className + '"></span>';
                  },
                  type: 'bullets',
                }}
                modules={[Autoplay, Pagination]}
                initialSlide={0}
                className='flex h-full'
              >
                {events.map((event) => (
                  <SwiperSlide
                    key={event.id}
                    className='flex w-full flex-row items-center 
                    justify-start gap-x-6 pb-2 lg:pb-4 2xl:pb-6 3xl:pb-7'
                  >
                    <Link to={event.linkTo} className='relative aspect-square h-auto w-full'>
                      <LazyLoadImage
                        src={event.imgSrc}
                        placeHolderSrc={event.imgPlaceholder}
                        alt={event.name}
                        containerClassName='z-0 brightness-75'
                        className='rounded-lg'
                        objectFit='cover'
                      />
                      <div
                        className='absolute bottom-2 left-2 rounded-lg bg-[#49BBBD] p-2 
                        lg:left-5 lg:bottom-5 lg:p-3 3xl:p-4'
                      >
                        <p className='text-base font-semibold text-white lg:text-2xl 3xl:text-3xl'>
                          {event.name}
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='relative h-fit w-full'>
                <div className='activities-carousel-pagination swiper-pagination'></div>
              </div>
            </div>
          </section>
          <section className='flex w-full flex-col items-start justify-start space-y-5 overflow-visible lg:space-y-10 3xl:space-y-[60px]'>
            <h2 className='whitespace-normal text-left text-lg font-semibold lg:text-2xl 3xl:text-3xl'>
              <span className='text-[#4285F4]'>Lắng nghe</span> và{' '}
              <span className='text-[#4285F4]'>chia sẻ</span>
            </h2>
            <div className='flex w-full flex-row flex-wrap items-start justify-center gap-y-10 gap-x-6 overflow-visible lg:gap-x-10 3xl:gap-x-20'>
              <div
                id='feedback-carousel'
                className='relative -mx-[20px] h-full w-[calc(100%+40px)] overflow-hidden px-[20px] md:w-[48%] md:flex-[0.9] xl:w-[53%] xl:flex-[1.1]'
              >
                <Swiper
                  spaceBetween={60}
                  slidesPerView={1}
                  loop
                  loopPreventsSlide
                  autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  speed={1200}
                  pagination={{
                    el: '.feedback-carousel-pagination',
                    clickable: true,
                    renderBullet: function (_index, className) {
                      return '<span class="' + className + '"></span>';
                    },
                    type: 'bullets',
                  }}
                  modules={[Autoplay, Pagination]}
                  initialSlide={0}
                  className='flex h-full w-full'
                >
                  <SwiperSlide className='w-full pb-2 lg:pb-4 2xl:pb-6 3xl:pb-7'>
                    <UserSharingCard
                      name='Kim Chi'
                      profileImg={require('../../assets/images/KimChiProfile.jpg')}
                      sharing='Tui có một tật xấu là tới sát thi thì hay bị rối lên không thể hệ thống kiến thức đầy đủ, tài liệu này đã giúp tui không ít. Đặc biệt là Hóa đại cương ><'
                    />
                  </SwiperSlide>
                  <SwiperSlide className='w-full pb-2 lg:pb-4 2xl:pb-6 3xl:pb-7'>
                    <UserSharingCard
                      name='Diệu My'
                      profileImg={require('../../assets/images/DieuMyProfile.png')}
                      sharing='Tài liệu rất chi tiết và đầy đủ, tui rất khâm phục các bạn đã dày công biên soạn tài liệu này. Cảm ơn CTCT.'
                    />
                  </SwiperSlide>
                  <SwiperSlide className='w-full pb-2 lg:pb-4 2xl:pb-6 3xl:pb-7'>
                    <UserSharingCard
                      name='Quang Vinh'
                      profileImg={require('../../assets/images/AvatarPic.png')}
                      sharing='Cảm ơn CTCT vì kho tài liệu quý giá này, rất chỉn chu.'
                    />
                  </SwiperSlide>
                </Swiper>
                <div className='relative h-fit w-full'>
                  <div className='feedback-carousel-pagination swiper-pagination' />
                </div>
              </div>

              <div className='relative h-fit w-full flex-1 xl:h-full'>
                <div className='absolute -top-2 -left-2 z-0 aspect-square w-[52px] rounded-lg bg-[#23BDEE] lg:-top-3 lg:-left-3 lg:w-[90px] 3xl:-top-5 3xl:-left-5 3xl:w-[140px]' />
                <div className='absolute -bottom-2 -right-2 z-0 aspect-square w-[52px] rounded-lg bg-[#23BDEE] lg:-bottom-3 lg:-right-3 lg:w-[90px] 3xl:-bottom-5 3xl:-right-5 3xl:w-[140px]' />
                {/* <img
                  src={require('../../assets/images/stubVideo.png')}
                  alt='video'
                  className='relative z-[2] h-full w-full rounded-lg object-cover'
                /> */}
                <div className='relative z-[2] h-full w-full rounded-lg object-cover'>
                  <video
                    loop
                    autoPlay
                    muted
                    controls
                    className='z-[2] block h-full w-full rounded-lg object-cover'
                  >
                    <source
                      src={require('../../assets/video/introduction-video.mp4')}
                      type='video/mp4'
                    />
                  </video>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default HomePage;
