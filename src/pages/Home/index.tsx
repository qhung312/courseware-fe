import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './index.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import EventBackground from '../../assets/images/EventBackground.png';
import { ReactComponent as LargeCTCTLogo } from '../../assets/svgs/LargeLogoCTCT.svg';
import { CarouselArrow, CarouselIndicator, Footer, Icon } from '../../components';
import { CarouselData as data } from '../../data/CarouselData';

const Home = () => {
  return (
    <>
      <main
        className='flex w-[100vw] flex-col items-center justify-start gap-y-[120px] bg-inherit 
      md:gap-y-[200px]'
      >
        <section
          className='h-[calc(100vh-72px)] w-full md:h-[calc(100vh-110.6px)] 
        xl:h-[calc(100vh-111px)]'
        >
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            emulateTouch
            infiniteLoop
            interval={3000}
            transitionTime={1000}
            renderIndicator={CarouselIndicator}
            renderArrowPrev={CarouselArrow.Prev}
            renderArrowNext={CarouselArrow.Next}
            stopOnHover={false}
          >
            {data.map((item) => (
              <div className='relative h-full w-full' key={item.id}>
                <img src={item.imgSrc} alt='bg' className='h-full w-full object-cover' />
                <div
                  className='absolute bottom-[16px] flex flex-row items-center bg-white/75 px-1 
                py-1
                md:bottom-[48px] xl:bottom-[56px]'
                >
                  <p
                    className='relative ml-[16px] mr-[8px] text-[12px] font-bold text-[#4D4D4D] 
                  md:ml-[40px] md:mr-[24px] md:text-[24px] xl:ml-[64px] xl:mr-[32px] xl:text-[48px]'
                  >
                    {item.title}
                  </p>
                  <Link to={item.to}>
                    <Icon.ArrowRightFill
                      className='mr-[4px] aspect-square h-auto w-3
                    md:mr-[12px] md:w-5 xl:mr-[16px] xl:w-8'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
        <section
          className='flex flex-row flex-wrap items-center justify-center 
        gap-x-[20px] gap-y-8 px-6 md:gap-x-[40px] md:px-8 xl:px-12 2xl:gap-x-[80px]'
        >
          <LargeCTCTLogo
            className='aspect-auto h-auto w-[200px] 
          md:w-[300px] xl:w-[400px]'
          />
          <div
            className='flex w-full flex-col items-start justify-start 
          md:w-[360px] xl:w-[500px] 2xl:w-[600px]'
          >
            <p
              className='mb-[16px] self-center text-[16px] font-bold
            md:mb-[32px] md:text-[24px] xl:mb-[48px] xl:text-[32px]'
            >
              Who We Are
            </p>
            <p className='text-[12px] leading-relaxed md:text-[16px] xl:text-[24px]'>
              <strong>Chúng Ta Cùng Tiến</strong> là Câu lạc bộ học thuật được thành lập dưới sự
              quản lý của Trung tâm Hỗ trợ Sinh viên và Việc làm.
            </p>
            <p className='text-[12px] leading-relaxed md:text-[16px] xl:text-[24px]'>
              Với khẩu hiệu “We Learn We Share”, Chúng Ta Cùng Tiến luôn mang trong mình một trọng
              trách là tổ chức hoạt động vì lợi ích của sinh viên và kết nối, đồng hành cùng sinh
              viên.
            </p>
            <p className='text-[12px] leading-relaxed md:text-[16px] xl:text-[24px]'>
              CLB là tập hợp của những cá nhân Vững mạnh kiến thức trong <strong>CHUYÊN MÔN</strong>
              ; Tiên phong sáng tạo trong <strong>TRUYỀN THÔNG</strong>; Năng động thích ứng trong{' '}
              <strong>SỰ KIỆN</strong>; và Thân thiện, hài hòa trong{' '}
              <strong>NHÂN SỰ HẬU CẦN</strong>.
            </p>
          </div>
        </section>
        <section
          className='flex flex-row flex-wrap items-center justify-center 
        gap-x-[20px] gap-y-8 px-6 md:gap-x-[40px] md:px-8 xl:px-12 2xl:gap-x-[80px]'
        >
          <img
            src={require('../../assets/images/stubVideo.png')}
            alt='video'
            className='2xl-rounded-2xl aspect-video h-auto w-[80%] rounded-md 
          md:w-[400px] md:rounded-lg lg:w-[500px] xl:w-[600px] xl:rounded-xl 2xl:w-[720px]'
          />
          <div className='flex w-[80%] flex-col md:w-[260px] lg:w-[400px] xl:w-[420px] 2xl:w-[500px]'>
            <div className='flex flex-row flex-wrap items-center justify-center'>
              <p className='text-center text-[24px] font-bold lg:text-[32px] 2xl:text-[48px]'>
                Cộng đồng không ngừng&nbsp;
              </p>
              <p className='text-center text-[24px] font-bold lg:text-[32px] 2xl:text-[48px]'>
                <span className='text-[#00A3FF]'>phát triển</span> và{' '}
                <span className='text-[#00A3FF]'>mở rộng</span>
              </p>
            </div>
            <div className='mt-[16px] flex flex-row items-center justify-center gap-x-[24px] md:mt-[24px]'>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-[16px] font-bold text-[#00A3FF] md:text-[24px] xl:text-[32px]'>
                  30 000+
                </p>
                <p className='text-[12px] md:text-[16px] xl:text-[24px]'>sinh viên</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-[16px] font-bold text-[#00A3FF] md:text-[24px] xl:text-[32px]'>
                  7
                </p>
                <p className='text-[12px] md:text-[16px] xl:text-[24px]'>môn học</p>
              </div>
            </div>
          </div>
        </section>
        <section
          className='flex aspect-[1920/1048] h-auto w-full flex-row items-center justify-center 
        gap-x-[40px] bg-no-repeat px-6 py-4 md:gap-x-[80px] md:px-[90px] md:py-[80px] xl:px-[120px] xl:py-[100px] 2xl:px-[180px]'
          style={{ backgroundImage: `url(${EventBackground})`, backgroundSize: 'contain' }}
        >
          <p
            className='whitespace-normal text-center text-white 
          md:w-[300px] md:text-[24px] md:font-bold xl:text-[48px]'
          >
            Những sự kiện đã tổ chức
          </p>
          <div className='flex flex-col items-end justify-end gap-y-[8px]'>
            <Link to='/about-us/activities' className='flex flex-row items-center'>
              <p className='text-center text-[8px] text-white md:text-[16px] xl:text-[24px]'>
                Xem tất cả
              </p>
              <Icon.ArrowRight
                fill={'white'}
                className='ml-[8px] aspect-square h-auto w-2
              md:ml-[16px] md:w-4 xl:ml-[24px] xl:w-8'
              />
            </Link>
            <Carousel
              showThumbs={false}
              showStatus={false}
              autoPlay
              emulateTouch
              infiniteLoop
              interval={3000}
              transitionTime={1000}
              renderIndicator={CarouselIndicator}
              renderArrowPrev={CarouselArrow.Prev}
              renderArrowNext={CarouselArrow.Next}
              stopOnHover={false}
              className='w-[200px] md:w-[400px] xl:w-[800px]'
            >
              <div>
                <img
                  src={require('../../assets/images/EventPic.png')}
                  alt='bg'
                  className='h-auto max-w-[100%]'
                />
                <div
                  className='absolute bottom-[16px] flex flex-row items-center bg-white/75 px-1 py-1 
                md:bottom-[40px]
                xl:bottom-[48px]'
                >
                  <p
                    className='relative ml-[16px] mr-[8px] text-[12px] font-bold text-[#4D4D4D] 
                md:ml-[40px] md:mr-[24px] md:text-[24px] md:font-bold xl:ml-[64px] xl:mr-[32px]
                xl:text-[48px]'
                  >
                    Hội sách 2022
                  </p>
                  <Link to='/about-us/activities'>
                    <Icon.ArrowRightFill
                      className='mr-[4px] aspect-square h-auto w-3
                    md:mr-[12px] md:w-5 xl:mr-[16px] xl:w-8'
                    />
                  </Link>
                </div>
              </div>
              <div>
                <img
                  src={require('../../assets/images/EventPic.png')}
                  alt='bg'
                  className='h-auto max-w-[100%]'
                />
                <div
                  className='absolute bottom-[16px] flex flex-row items-center bg-white/75 px-1 py-1 
                md:bottom-[40px]
                xl:bottom-[48px]'
                >
                  <p
                    className='relative ml-[16px] mr-[8px] text-[12px] font-bold text-[#4D4D4D] 
                md:ml-[40px] md:mr-[24px] md:text-[24px] md:font-bold xl:ml-[64px] xl:mr-[32px]
                xl:text-[48px]'
                  >
                    Hội sách 2022
                  </p>
                  <Link to='/about-us/activities'>
                    <Icon.ArrowRightFill
                      className='mr-[4px] aspect-square h-auto w-3
                  md:mr-[12px] md:w-5 xl:mr-[16px] xl:w-8'
                    />
                  </Link>
                </div>
              </div>
            </Carousel>
          </div>
        </section>
        <section
          className='mb-[120px] flex w-full flex-col items-center 
        justify-center gap-x-[40px] px-6 md:mb-[200px] md:px-[50px] xl:px-[120px]
        2xl:px-[180px]'
        >
          <p className='self-start font-bold text-[#252641] md:text-[24px] xl:text-[32px]'>
            Lắng nghe và chia sẻ
          </p>
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            emulateTouch
            infiniteLoop
            interval={3000}
            transitionTime={1000}
            renderIndicator={CarouselIndicator}
            showArrows={false}
            stopOnHover={false}
            className='h-[280px] w-full md:h-[400px] lg:h-[440px] xl:h-[540px]'
          >
            <div
              className='flex h-[200px] flex-row items-center justify-between gap-x-[12px] 
            md:h-fit md:gap-x-[24px]'
            >
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
            </div>
            <div className='flex h-[200px] flex-row items-center justify-between gap-x-[12px] md:h-fit md:gap-x-[24px]'>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
            </div>
            <div className='flex h-[200px] flex-row items-center justify-between gap-x-[12px] md:h-fit md:gap-x-[24px]'>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
              <div
                className='flex h-full w-[30%] flex-col items-center justify-center 
            rounded-lg bg-white px-4 py-3 md:w-[200px] md:py-5 md:px-6 lg:w-[300px] xl:w-[360px] xl:px-8 xl:py-7'
              >
                <img
                  src={require('../../assets/images/AvatarPic.png')}
                  alt='avatar'
                  className='mb-[8px] h-auto max-w-[32px] rounded-full md:mb-[12px] md:max-w-[48px] xl:mb-[16px]'
                />
                <p className='mb-[12px] text-[12px] text-[#252641] md:mb-[16px] xl:mb-[20px]'>
                  Trần Thị B
                </p>
                <div
                  className='mb-[8px] aspect-[46/28] h-auto w-4 self-start 
              md:mb-[12px] md:w-6 xl:mb-[16px] xl:w-10'
                >
                  <Icon.OpenQuote className='h-full w-full' />
                </div>
                <p className='line-clamp h-full text-left text-[12px] font-medium text-[#252641] md:text-[16px]'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempos
                  Lorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                </p>
                <div
                  className='mt-[8px] aspect-[46/28] h-auto w-4 self-end
              md:mt-[12px] md:w-6 xl:mt-[16px] xl:w-10'
                >
                  <Icon.CloseQuote className='h-full w-full' />
                </div>
              </div>
            </div>
          </Carousel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
