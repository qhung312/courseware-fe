/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
import { FC, useEffect, useState, useRef, forwardRef } from 'react';
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

const MobileContactCard = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  return (
    <div ref={ref} className='relative mb-20 w-full rounded-lg bg-[#0B2878] p-5 text-white'>
      <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
        Thông tin liên hệ
      </h3>
      <Icon.LogoFessior className='mt-2 h-auto w-[180px]' fill='white' />
      <div className='mt-3 text-justify text-[16px] font-medium leading-snug text-white'>
        <p className='text-inherit'>
          Email:{' '}
          <a href='mailto:admin@fessior.com' target='_blank' rel='noreferrer'>
            admin@fessior.com
          </a>
        </p>
        <p className='text-inherit'>
          Fanpage:{' '}
          <a href='https://www.facebook.com/dscxhcmut' target='_blank' rel='noreferrer'>
            facebook.com/dscxhcmut
          </a>
        </p>
      </div>
      <div className='mt-5 flex flex-row items-center gap-x-3'>
        <a
          href='https://www.facebook.com/dscxhcmut'
          target='_blank'
          rel='noreferrer'
          className='rounded-lg bg-[#4285F4] p-2'
        >
          <Icon.LogoFacebook className='h-auto w-[28px]' fill='white' />
        </a>
        <a
          href='mailto:admin@fessior.com'
          target='_blank'
          rel='noreferrer'
          className='rounded-lg bg-[#4285F4] p-2'
        >
          <Icon.LogoGmail className='h-auto w-[28px]' fill='white' />
        </a>
        <a
          href='https://discord.gg/ZGuUDnysMy'
          target='_blank'
          rel='noreferrer'
          className='rounded-lg bg-[#4285F4] p-2'
        >
          <Icon.LogoDiscord className='h-auto w-[28px]' fill='white' />
        </a>
        <a
          href='https://www.linkedin.com/company/gdschcmut/mycompany/'
          target='_blank'
          rel='noreferrer'
          className='rounded-lg bg-[#4285F4] p-2'
        >
          <Icon.LogoLinkedin className='h-auto w-[28px]' fill='white' />
        </a>
      </div>
    </div>
  );
});
MobileContactCard.displayName = 'MobileContactCard';

const DesktopContactCard = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  return (
    <div
      ref={ref}
      className='relative mb-20 flex w-full flex-row items-center justify-between rounded-lg bg-[#0B2878] 
      text-white md:p-5 lg:px-[30px] xl:px-10 3xl:px-[60px]'
    >
      <div>
        <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
          Thông tin liên hệ
        </h3>
        <div className='mt-3 text-justify text-[16px] font-medium leading-snug text-white lg:text-[20px] 3xl:text-[28px]'>
          <p className='text-inherit'>
            Email:{' '}
            <a href='mailto:admin@fessior.com' target='_blank' rel='noreferrer'>
              admin@fessior.com
            </a>
          </p>
          <p className='text-inherit'>
            Fanpage:{' '}
            <a href='https://www.facebook.com/dscxhcmut' target='_blank' rel='noreferrer'>
              facebook.com/dscxhcmut
            </a>
          </p>
        </div>

        <div className='mt-6 flex flex-row items-center gap-x-3'>
          <a
            href='https://www.facebook.com/dscxhcmut'
            target='_blank'
            rel='noreferrer'
            className='rounded-lg bg-[#4285F4] p-2'
          >
            <Icon.LogoFacebook className='h-auto w-[28px]' fill='white' />
          </a>
          <a
            href='mailto:admin@fessior.com'
            target='_blank'
            rel='noreferrer'
            className='rounded-lg bg-[#4285F4] p-2'
          >
            <Icon.LogoGmail className='h-auto w-[28px]' fill='white' />
          </a>
          <a
            href='https://discord.gg/ZGuUDnysMy'
            target='_blank'
            rel='noreferrer'
            className='rounded-lg bg-[#4285F4] p-2'
          >
            <Icon.LogoDiscord className='h-auto w-[28px]' fill='white' />
          </a>
          <a
            href='https://www.linkedin.com/company/gdschcmut/mycompany/'
            target='_blank'
            rel='noreferrer'
            className='rounded-lg bg-[#4285F4] p-2'
          >
            <Icon.LogoLinkedin className='h-auto w-[28px]' fill='white' />
          </a>
        </div>
      </div>
      <Icon.LogoFessior
        className='mt-2 h-auto md:w-[180px] lg:w-[200px] 2xl:w-[240px] 3xl:w-[280px]'
        fill='white'
      />
    </div>
  );
});
DesktopContactCard.displayName = 'DesktopContactCard';

const ContactCard = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const { width } = useWindowDimensions();

  if (width < 768) {
    return <MobileContactCard ref={ref} />;
  }
  return <DesktopContactCard ref={ref} />;
});
ContactCard.displayName = 'ContactCard';

const Fessior: FC = () => {
  const { width } = useWindowDimensions();
  const [projects] = useState(data);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  const contactCardRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (width < 768) {
      setSlidesPerView(1);
    } else if (width < 1280) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  }, [width]);

  useEffect(() => {
    const section = document.getElementById('fessior-projects');
    if (contactCardRef.current && section) {
      const contactCard = contactCardRef.current;

      contactCard.style.marginTop = `-${
        parseFloat(window.getComputedStyle(contactCard).height) / 2
      }px`;
      section.style.paddingBottom = `${
        parseFloat(window.getComputedStyle(contactCard).height) / 2 + 60
      }px`;
    }
  }, [width]);

  useEffect(() => {
    if (width >= 768) {
      textRefs.current.forEach((textRef) => {
        if (textRef && textRef.parentElement) {
          console.log(textRef.parentElement.children[1], textRef);
          (textRef.parentElement.children[1] as HTMLElement).style.height = `${
            parseFloat(window.getComputedStyle(textRef as Element).height) + 120
          }px`;
        }
      });
    } else {
      textRefs.current.forEach((textRef) => {
        if (textRef && textRef.parentElement) {
          (textRef.parentElement.children[1] as HTMLElement).style.height = 'auto';
        }
      });
    }
  }, [width]);

  return (
    <Page title='Đơn vị hợp tác - Fessior Community'>
      <main className='flex w-full flex-col px-6 py-5 lg:px-10 lg:py-7 xl:px-20 3xl:px-[100px] 3xl:py-9'>
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

        <section
          id='fessior-introduction'
          className='mt-7 flex w-full flex-1 flex-row 
          flex-wrap gap-x-10 gap-y-5 md:items-start md:justify-between lg:mt-10 xl:mt-20 xl:gap-x-20 3xl:mt-[100px] 3xl:gap-x-[120px]'
        >
          <div ref={(el) => (textRefs.current[0] = el)} className='w-full md:w-[45%]'>
            <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
              Giới thiệu
            </h3>
            <div className='mt-1 flex w-[90%] flex-row items-center gap-x-3'>
              <div className='leading-snug text-[#0B2878]'>
                <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>
                  Fessior
                </h2>
                <h2 className='text-[24px] font-semibold lg:text-[32px] 3xl:text-[40px]'>
                  Community
                </h2>
              </div>
              <Icon.LogoFessior className='h-auto w-[160px] fill-[#0F2D85] lg:w-[180px] xl:w-[200px]' />
            </div>
            <p className='mt-3 text-justify text-[16px] leading-loose text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
              Fessior là một ban thuộc câu lạc bộ Google Developer Student Club - Đại học Bách khoa,
              ĐHQG TP.HCM. Sứ mệnh của Fessior là phát triển các dự án về công nghệ nhằm mang lại
              những giá trị thiết thực cho xã hội và xây dựng nên một cộng đồng những sinh viên yêu
              thích công nghệ.
            </p>
          </div>

          <div className='relative mt-5 flex-1 md:m-0'>
            <div className='absolute -bottom-3 -right-3 aspect-square w-[120px] rounded-lg bg-[#D3E7FF]' />

            <LazyLoadImage
              src={require('../../../assets/images/Fessior1.jpg')}
              placeHolderSrc={require('../../../assets/images/Fessior1-placeholder.jpg')}
              alt='Fessior Community 1'
              objectFit='cover'
              className='aspect-square h-auto w-full rounded-lg object-right md:h-full'
            />
          </div>
        </section>

        <section
          id='fessior-mission'
          className='mt-10 flex w-full flex-1 flex-row-reverse
          flex-wrap gap-x-10 md:items-start md:justify-between lg:mt-16 xl:mt-[104px] xl:gap-x-20 3xl:mt-[124px] 3xl:gap-x-[120px]'
        >
          <div ref={(el) => (textRefs.current[1] = el)} className='w-full md:w-[45%]'>
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
            <p className='mt-3 text-justify text-[16px] leading-loose text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
              Fessior Community là một nhánh của Fessior định hướng vào phát triển các dự án cộng
              đồng cùng với các đối tác, tổ chức khác trong và ngoài trường. Hoạt động của nhóm sẽ
              bao gồm việc phát triển các sản phẩm công nghệ phục vụ nhu cầu của các bạn sinh viên
              trong và ngoài câu lạc bộ, đồng thời nâng cao khả năng tiếp cận các dự án thực tế cho
              sinh viên Trường Đại học Bách khoa.
            </p>
          </div>

          <div className='relative mt-8 flex-1 md:m-0'>
            <div className='absolute -top-3 -right-3 aspect-square w-[120px] rounded-lg bg-[#4285F4]/50' />
            <div className='absolute -bottom-3 -left-3 aspect-square w-[120px] rounded-lg bg-[#4285F4]/50' />

            <LazyLoadImage
              src={require('../../../assets/images/Fessior2.jpg')}
              placeHolderSrc={require('../../../assets/images/Fessior2-placeholder.jpg')}
              alt='Fessior Community 2'
              objectFit='cover'
              className='h-auto w-full rounded-lg object-left md:h-full'
            />
          </div>
        </section>

        <section
          id='fessior-projects'
          className='-mx-6 mt-[72px] w-screen overflow-hidden rounded-t-lg bg-[#9DCCFF]/20 px-6 
          pt-8 lg:-mx-10 lg:px-10 xl:-mx-20 xl:px-20 xl:pt-10 3xl:-mx-[100px] 3xl:px-[100px] 3xl:pt-[60px]'
        >
          <h3 className='text-[20px] font-semibold leading-relaxed lg:text-[24px] xl:text-[28px] 3xl:text-[32px]'>
            Hoạt động
          </h3>
          <h2 className='mt-1 text-[24px] font-semibold leading-snug text-[#0B2878] lg:text-[32px] 3xl:text-[40px]'>
            Những dự án nổi bật
          </h2>
          <div className='relative -mx-[30px] h-full overflow-hidden px-[30px]'>
            <Swiper
              spaceBetween={60}
              slidesPerView={slidesPerView}
              slidesPerGroup={1}
              loop
              loopPreventsSlide
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
              initialSlide={2}
              className='mt-5 flex h-full'
            >
              {projects.map((project) => (
                <SwiperSlide
                  key={project.title}
                  className='flex flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_20px_20px_0px_rgba(47,50,125,0.1)]'
                  style={{
                    width: `${(1 / slidesPerView) * 100}%`,
                  }}
                >
                  <div>
                    <LazyLoadImage
                      src={project.imageSrc}
                      placeHolderSrc={project.placeholderSrc}
                      alt={project.title}
                      objectFit='cover'
                      className='aspect-[2] w-full rounded-lg object-top'
                      containerClassName='h-fit'
                    />
                    <h4 className='mt-4 text-[24px] font-medium leading-loose lg:mt-6 lg:text-[26px] 3xl:mt-8 3xl:text-[28px]'>
                      {project.title}
                    </h4>
                    <p className='mt-3 text-justify text-[16px] leading-loose text-[#696984] lg:text-[18px] 3xl:text-[20px]'>
                      {project.description}
                    </p>
                  </div>

                  <a
                    href={project.href}
                    target='_blank'
                    rel='noreferrer'
                    className='mt-3 w-fit leading-loose text-[#4285F4] underline'
                  >
                    Chi tiết
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='relative w-full'>
              <div className='swiper-pagination'></div>
            </div>
          </div>
        </section>
        <ContactCard ref={contactCardRef} />
      </main>
      <Footer />
    </Page>
  );
};

export default Fessior;
