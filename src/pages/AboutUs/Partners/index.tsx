/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
import { FC, useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Footer, Icon, LazyLoadImage } from '../../../components';
import { projects as data } from '../../../data/FessiorProjects';
import { useWindowDimensions } from '../../../hooks';
import { Page } from '../../../layout';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import './index.css';

const Fessior: FC = () => {
  const { width } = useWindowDimensions();
  const [projects] = useState(data);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  useEffect(() => {
    if (width < 768) {
      setSlidesPerView(1);
    } else if (width < 1280) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  }, [width]);

  return (
    <Page title='Đơn vị hợp tác - Fessior Community'>
      <main className='flex flex-col px-6 py-5 lg:px-10 lg:py-7 xl:px-20 3xl:px-[100px] 3xl:py-9'>
        <section
          id='fessior-banner'
          className='relative -mx-6 -mt-5 h-fit w-screen md:m-0 md:w-full'
        >
          <LazyLoadImage
            src={require('../../../assets/images/FessiorBanner.jpg')}
            placeHolderSrc={require('../../../assets/images/FessiorBanner-placeholder.jpg')}
            alt='Banner của Fessior Community'
            objectFit='cover'
            containerClassName='absolute w-full overflow-hidden h-full md:rounded-lg'
            className='h-full object-[50%_70%] brightness-[0.4]'
          />
          <div className='relative z-[3] px-6 py-9 font-semibold lg:px-10 lg:py-[60px] xl:px-[50px] xl:py-20 3xl:px-[60px] 3xl:py-[100px]'>
            <h2 className='text-xl text-white lg:text-2xl xl:text-3xl 3xl:text-4xl'>ĐỐI TÁC</h2>
            <h1 className='text-3xl text-[#9DCCFF] lg:text-4xl xl:text-5xl 3xl:text-6xl'>
              Fessior Community
            </h1>
            <h2 className='text-xl text-white lg:text-2xl xl:text-3xl 3xl:text-4xl'>
              “Bridge the Gap
            </h2>
            <h2 className='text-xl text-white lg:text-2xl xl:text-3xl 3xl:text-4xl'>
              between Theory and Practice”
            </h2>
          </div>
        </section>

        <section id='fessior-introduction' className='mt-7 flex flex-col'>
          <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
            Giới thiệu
          </h3>
          <div className='mt-1 flex flex-row items-center gap-x-3'>
            <div className='leading-snug text-[#0B2878]'>
              <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>Fessior</h2>
              <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>
                Community
              </h2>
            </div>
            <Icon.LogoFessior className='h-auto w-[160px] md:h-[100px] md:w-auto' />
          </div>
          <p className='mt-3 text-justify text-base leading-loose text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
            Fessior là một ban thuộc câu lạc bộ Google Developer Student Club - Đại học Bách khoa,
            ĐHQG TP.HCM. Sứ mệnh của Fessior là phát triển các dự án về công nghệ nhằm mang lại
            những giá trị thiết thực cho xã hội và xây dựng nên một cộng đồng những sinh viên yêu
            thích công nghệ.
          </p>
          <div className='relative mt-5'>
            <div className='absolute -bottom-3 -right-3 aspect-square w-[120px] rounded-lg bg-[#D3E7FF]' />

            <LazyLoadImage
              src={require('../../../assets/images/Fessior1.jpg')}
              placeHolderSrc={require('../../../assets/images/Fessior1-placeholder.jpg')}
              alt='Fessior Community 1'
              objectFit='cover'
              className='aspect-square h-auto w-full rounded-lg object-right'
            />
          </div>
        </section>

        <section id='fessior-mission' className='mt-10 flex flex-col'>
          <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
            Sứ mệnh
          </h3>
          <div className='mt-1 flex flex-row items-center gap-x-3'>
            <div className='leading-snug text-[#0B2878]'>
              <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>
                Phát triển
              </h2>
              <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>
                Dự án Cộng đồng
              </h2>
            </div>
          </div>
          <p className='mt-3 text-justify text-base leading-loose text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
            Fessior Community là một nhánh của Fessior định hướng vào phát triển các dự án cộng đồng
            cùng với các đối tác, tổ chức khác trong và ngoài trường. Hoạt động của nhóm sẽ bao gồm
            việc phát triển các sản phẩm công nghệ phục vụ nhu cầu của các bạn sinh viên trong và
            ngoài câu lạc bộ, đồng thời nâng cao khả năng tiếp cận các dự án thực tế cho sinh viên
            Trường Đại học Bách khoa.
          </p>
          <div className='relative mt-8'>
            <div className='absolute -top-3 -right-3 aspect-square w-[120px] rounded-lg bg-[#4285F4]/50' />
            <div className='absolute -bottom-3 -left-3 aspect-square w-[120px] rounded-lg bg-[#4285F4]/50' />

            <LazyLoadImage
              src={require('../../../assets/images/Fessior2.jpg')}
              placeHolderSrc={require('../../../assets/images/Fessior2-placeholder.jpg')}
              alt='Fessior Community 2'
              objectFit='cover'
              className='h-auto w-full rounded-lg'
            />
          </div>
        </section>

        <section
          className='-mx-6 mt-[72px] w-screen rounded-lg bg-[#9DCCFF]/20 px-6 py-8 
          lg:-mx-10 lg:px-10 xl:-mx-20 xl:px-20 xl:py-10 3xl:-mx-[100px] 3xl:py-[60px] 3xl:px-[100px]'
        >
          <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
            Hoạt động
          </h3>
          <h2 className='mt-1 text-[24px] font-semibold leading-snug text-[#0B2878] lg:text-[32px] 3xl:text-[40px]'>
            Những dự án nổi bật
          </h2>
          <div className='relative h-max'>
            <Swiper
              spaceBetween={60}
              slidesPerView={slidesPerView}
              slidesPerGroup={1}
              loop
              loopPreventsSlide
              autoplay={{ delay: 3000 }}
              speed={1200}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (_index, className) {
                  return '<span class="' + className + '"></span>';
                },
                type: 'bullets',
              }}
              modules={[Autoplay, Pagination]}
              initialSlide={1}
              className='mt-5 flex h-max'
            >
              {projects.map((project) => (
                <SwiperSlide
                  key={project.title}
                  className='h-max rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)]'
                  style={{
                    width: `${(1 / slidesPerView) * 100}%`,
                  }}
                >
                  <LazyLoadImage
                    src={project.imageSrc}
                    placeHolderSrc={project.placeholderSrc}
                    alt={project.title}
                    objectFit='cover'
                    className='h-[160px] rounded-lg lg:h-[180px] xl:h-[200px] 3xl:h-[240px]'
                  />
                  <h4 className='mt-4 text-[24px] font-medium leading-loose lg:mt-6 lg:text-[26px] 3xl:mt-8 3xl:text-[28px]'>
                    {project.title}
                  </h4>
                  <p className='mt-3 text-justify text-[16px] leading-loose text-[#696984] lg:text-[18px] 3xl:text-[20px]'>
                    {project.description}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='relative w-full'>
              <div className='swiper-pagination'></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Page>
  );
};

export default Fessior;
