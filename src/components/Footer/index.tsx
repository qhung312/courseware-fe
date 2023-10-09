import { Link } from 'react-router-dom';

import Icon from '../Icon';

const Footer = () => {
  return (
    <footer className='bg-white'>
      <div className='xl:py-18 mx-auto w-full max-w-[1920px] flex-1 px-6 py-10 md:px-[50px] md:py-14 lg:px-0 lg:py-16 2xl:py-20'>
        <div className='3xl:space-x-50 mx-auto flex flex-col space-y-8 space-x-0 sm:flex-col sm:space-y-10 md:space-y-12 lg:max-w-[976px] lg:flex-row lg:justify-between  lg:space-y-0 lg:space-x-12 xl:max-w-[1232px] xl:space-x-24 2xl:max-w-[1488px] 2xl:space-x-36 3xl:max-w-[1824px] '>
          <div className='flex flex-1 justify-evenly lg:items-start  lg:justify-between lg:pt-5 2xl:gap-x-[3rem]'>
            <div className='mt-[1.25rem] sm:mt-[1.625rem]'>
              <Icon.LogoCTCT className='h-[3.5rem] w-[7.5rem] sm:h-[5rem] sm:w-[9.375rem] md:h-[7.5rem] md:w-[11rem] lg:h-[3.5rem] lg:w-[8rem] xl:h-[4.75rem] xl:w-[9rem] 2xl:h-[5.5rem] 2xl:w-[10rem]' />
            </div>

            <div className='flex flex-col gap-y-[1rem]'>
              <div className='mx-auto'>
                <p className='font-[600] text-[#000] sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl'>
                  Đơn vị hợp tác
                </p>
              </div>
              <div className=''>
                <Icon.LogoGDSC className='h-[3rem] w-[11rem] sm:h-[5rem] sm:w-[15rem] md:h-[7rem] md:w-[17rem] lg:h-[4rem] lg:w-[13rem] xl:h-[4.5rem] xl:w-[14.5rem] 2xl:h-[5rem] 2xl:w-[15rem]' />
              </div>
            </div>
          </div>

          <div className='flex h-fit flex-[2] flex-col justify-between space-y-4 lg:space-y-6 xl:space-y-7 2xl:space-y-8 3xl:ml-10'>
            <Link
              to='/'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl'
            >
              Home
            </Link>
            <Link
              to='/about-us'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl'
            >
              Giới thiệu
            </Link>
            <Link
              to='/about-us/activities'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl'
            >
              Cộng đồng Chúng Ta Cùng Tiến
            </Link>
          </div>

          <div className='box-content flex flex-[2] flex-col gap-y-[1rem] sm:justify-between sm:gap-y-[1.5rem] lg:justify-start'>
            <div className=''>
              <p className='text-lg font-semibold sm:text-left sm:text-xl lg:text-center lg:text-2xl xl:text-3xl'>
                Liên Hệ
              </p>
            </div>
            <div className='flex flex-col gap-y-[0.75rem] sm:gap-y-[0.5rem]'>
              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.LocationIcon className='h-[2.25rem] w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
                </div>
                <p className='text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                  Phòng 102, Nhà học Thể dục thể thao, Đại học Bách Khoa - Đại học Quốc gia Hồ Chí
                  Minh, Cơ sở 2
                </p>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.PhoneIcon className='h-[2.25rem] w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
                </div>
                <p className='text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                  036 329 4701 - 086 835 3556
                </p>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.MailIcon className='h-[2.25rem] w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
                </div>
                <p className='text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                  chungtacungtienbk@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-t-[1px] border-solid border-black' />
      <div className='relative mx-auto flex flex-col items-center gap-y-6  py-4 px-6 md:flex-row md:justify-between md:py-5 md:px-[50px] lg:max-w-[976px] lg:py-8 lg:px-0 xl:max-w-[1232px] xl:py-9 2xl:max-w-[1488px] 2xl:py-10 3xl:max-w-[1824px]'>
        <p className='flex  min-h-[50px] text-2xl font-bold md:text-xl xl:text-2xl 2xl:text-3xl'>
          WE LEARN - WE SHARE
        </p>
        <div className='flex gap-x-[1.25rem] sm:gap-x-[2rem]'>
          <a href='https://facebook.com/chungtacungtien' target='_blank' rel='noopener noreferrer'>
            <Icon.FacebookIcon className='aspect-square w-[50px]' />
          </a>
          <a
            href='https://www.youtube.com/c/CLBCh%C3%BAngtac%C3%B9ngti%E1%BA%BFn%C4%90HBK'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon.YoutubeIcon className='aspect-square w-[50px]' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
