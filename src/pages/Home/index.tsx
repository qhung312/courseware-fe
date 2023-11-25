import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './index.css';

import { chunk } from 'lodash';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import { CarouselIndicator, Footer, LazyLoadImage, UserSharingCard } from '../../components';
import { CarouselData as data, EventsAndActivities as eventsData } from '../../data/CarouselData';
import { useWindowDimensions } from '../../hooks';
import { Page } from '../../layout';

const HomePage = () => {
  const { width } = useWindowDimensions();
  const [eventsChunk, setEventsChunk] = useState<Array<typeof eventsData>>([]);

  useEffect(() => {
    const section = document.getElementById('homepage-section-1');
    const introduction = document.getElementById('homepage-introduction');
    if (width >= 1024 && section && introduction) {
      section.style.height = `${introduction.getBoundingClientRect().height + 60}px`;
    } else {
      section?.style.removeProperty('height');
    }
  }, [width]);

  useEffect(() => {
    setTimeout(() => {
      if (width < 640) {
        setEventsChunk(chunk(eventsData, 1));
      } else if (width < 1024) {
        setEventsChunk(chunk(eventsData, 2));
      } else if (width < 2000) {
        setEventsChunk(chunk(eventsData, 3));
      } else {
        setEventsChunk(chunk(eventsData, 4));
      }
    }, 200);
  }, [width]);

  return (
    <Page>
      <main className='with-nav-height flex w-full flex-col items-center justify-start overflow-y-auto bg-inherit'>
        <div
          className='ml-0 mr-0 flex w-full flex-1 flex-col items-center justify-center space-y-10 px-4 py-10 md:px-5
          lg:space-y-20 lg:py-[60px] lg:px-10 xl:px-[60px] xl:py-20 2xl:px-20 3xl:space-y-[100px] 3xl:px-[100px]'
        >
          <section
            id='homepage-section-1'
            className='flex w-full flex-col gap-y-5 gap-x-10 lg:flex-row'
          >
            <div
              id='homepage-introduction'
              className='flex h-fit w-full min-w-fit flex-1 flex-col items-start justify-start  text-[#4D4D4D] lg:min-w-0'
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
            <div className='relative h-full w-full flex-1'>
              <div className='absolute -top-2 -left-2 z-0 aspect-square w-[52px] rounded-lg bg-[#4285F4] lg:hidden' />
              <div className='absolute -bottom-2 -right-2 z-0 aspect-square w-[90px] rounded-lg bg-[#A0C3FF] lg:hidden' />
              <div className='absolute -bottom-8 left-0 z-0 aspect-square w-[20px] rounded-full bg-[#A0C3FF] lg:hidden' />

              <Carousel
                showThumbs={false}
                showStatus={false}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
                swipeable
                autoPlay
                infiniteLoop
                interval={10000}
                transitionTime={1000}
                showArrows={false}
                renderIndicator={CarouselIndicator}
                stopOnHover
                className='-ml-2 -mr-2 h-full min-w-full'
              >
                {data.map((item, index) => (
                  <div className='relative h-full w-full min-w-full px-2' key={item.id}>
                    <LazyLoadImage
                      src={item.imgSrc}
                      placeHolderSrc={item.imgPlaceholder}
                      containerClassName='w-full'
                      alt={`slider background ${index}`}
                      className='w-full rounded-lg'
                      objectFit='cover'
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </section>
          <section className='relative flex w-screen overflow-hidden rounded-lg md:w-full'>
            <div className='absolute top-0 left-0 right-0 bottom-0 z-0 w-full'>
              <div className='absolute z-[1] h-full w-full bg-[#4285F4]/70' />
              <LazyLoadImage
                src={require('../../assets/images/Banner.jpg')}
                alt='banner'
                placeHolderSrc={require('../../assets/images/Banner-placeholder.jpg')}
                containerClassName='w-full'
                className='mt-[-22%] h-auto'
                objectFit='cover'
              />
            </div>
            <div className='relative z-[3] flex w-full flex-row flex-wrap items-center justify-between gap-y-[60px] gap-x-10 p-5'>
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
            {eventsChunk.length !== 0 && (
              <Carousel
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
                swipeable
                autoPlay
                infiniteLoop
                interval={5000}
                transitionTime={1000}
                renderIndicator={CarouselIndicator}
                stopOnHover
                className='-mx-5 w-[calc(100%+40px)]'
              >
                {eventsChunk.map((events, index) => (
                  <div
                    key={`chunks-${index}`}
                    className='flex w-full flex-1 flex-row items-center 
                    justify-start gap-x-6 px-5 pb-10 lg:pb-20 3xl:pb-[100px]'
                  >
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className='relative aspect-square h-auto w-full'
                        style={{ flex: `${events.length / eventsChunk[0]?.length}` }}
                      >
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
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            )}
          </section>
          <section className='flex w-full flex-col items-start justify-start space-y-5 lg:space-y-10 3xl:space-y-[60px]'>
            <h2 className='whitespace-normal text-left text-lg font-semibold lg:text-2xl 3xl:text-3xl'>
              <span className='text-[#4285F4]'>Lắng nghe</span> và{' '}
              <span className='text-[#4285F4]'>chia sẻ</span>
            </h2>
            <div className='flex w-full flex-row flex-wrap items-start justify-center gap-y-10 gap-x-6 lg:gap-x-10 3xl:gap-x-20'>
              <Carousel
                showThumbs={false}
                showStatus={false}
                preventMovementUntilSwipeScrollTolerance={true}
                swipeScrollTolerance={50}
                swipeable
                autoPlay
                emulateTouch
                infiniteLoop
                interval={10000}
                transitionTime={1000}
                renderIndicator={CarouselIndicator}
                showArrows={false}
                stopOnHover={false}
                className='-mx-2 w-full md:w-[48%] md:flex-[0.9] xl:w-[53%] xl:flex-[1.1]'
              >
                <div className='w-full px-2 pb-10 lg:pb-[60px] 3xl:pb-[100px]'>
                  <UserSharingCard
                    name='Kim Chi'
                    profileImg={require('../../assets/images/KimChiProfile.jpg')}
                    sharing='Tui có một tật xấu là tới sát thi thì hay bị rối lên không thể hệ thống kiến thức đầy đủ, tài liệu này đã giúp tui không ít. Đặc biệt là Hóa đại cương ><'
                  />
                </div>
                <div className='w-full px-2 pb-10 lg:pb-[60px] 3xl:pb-[100px]'>
                  <UserSharingCard
                    name='Diệu My'
                    profileImg={require('../../assets/images/DieuMyProfile.png')}
                    sharing='Tài liệu rất chi tiết và đầy đủ, tui rất khâm phục các bạn đã dày công biên soạn tài liệu này. Cảm ơn CTCT.'
                  />
                </div>
                <div className='w-full px-2 pb-10 lg:pb-[60px] 3xl:pb-[100px]'>
                  <UserSharingCard
                    name='Quang Vinh'
                    profileImg={require('../../assets/images/AvatarPic.png')}
                    sharing='Cảm ơn CTCT vì kho tài liệu quý giá này, rất chỉn chu.'
                  />
                </div>
              </Carousel>
              <div className='relative h-fit w-full flex-1 xl:h-full'>
                <div className='absolute -top-2 -left-2 z-0 aspect-square w-[52px] rounded-lg bg-[#23BDEE] lg:-top-3 lg:-left-3 lg:w-[90px] 3xl:-top-5 3xl:-left-5 3xl:w-[140px]' />
                <div className='absolute -bottom-2 -right-2 z-0 aspect-square w-[52px] rounded-lg bg-[#23BDEE] lg:-bottom-3 lg:-right-3 lg:w-[90px] 3xl:-bottom-5 3xl:-right-5 3xl:w-[140px]' />
                <img
                  src={require('../../assets/images/stubVideo.png')}
                  alt='video'
                  className='relative z-[2] h-full w-full rounded-lg object-cover'
                />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default HomePage;
