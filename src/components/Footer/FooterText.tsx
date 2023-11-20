import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../components';
const Footer2: FC = () => {
  return (
    <footer className='flex w-full flex-col bg-white'>
      <div className='flex w-full flex-col gap-y-8 md:gap-y-4 lg:gap-y-6 xl:gap-y-8 2xl:gap-y-10'>
        <div className='flex w-full flex-col justify-between gap-y-8 px-8 py-2 md:gap-y-12 md:px-5 md:py-4 lg:flex-row lg:gap-y-6 lg:px-10 lg:py-4 xl:gap-y-10 xl:px-20 2xl:gap-y-10 2xl:pt-20 3xl:px-[100px]'>
          <div className='flex flex-row items-center justify-evenly gap-x-10 md:gap-x-4 lg:justify-start lg:gap-y-6 xl:gap-y-8 2xl:w-[35%] 2xl:gap-y-10'>
            <div className='flex items-center'>
              <Icon.LogoCTCT className='h-auto w-[160px] lg:w-[120px] xl:w-[132px] 2xl:w-[152px]' />
            </div>

            <div className='flex flex-col items-center justify-center gap-y-2 lg:flex-col-reverse'>
              <p className='font-normal text-[#000] sm:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl'>
                Đơn vị hợp tác
              </p>
              <a href='https://www.facebook.com/dscxhcmut'>
                <Icon.LogoFessior className='h-auto w-[160px] lg:w-[120px] xl:w-[132px] 2xl:w-[152px]' />
              </a>
            </div>
          </div>
          <div className='flex h-fit flex-col justify-between gap-y-1 pl-[5%] lg:space-y-2 lg:pl-0 xl:gap-y-3 2xl:gap-y-4 3xl:gap-y-5'>
            <div className='flex flex-col'>
              <p className='text-left text-[20px] font-semibold md:text-[20px] lg:text-lg xl:text-xl 2xl:text-2xl'>
                Thông tin
              </p>
              <button
                className='h-[5px] w-[8%] justify-start rounded-r-lg bg-[#E3F2FD] lg:w-[40%]'
                disabled
              />
            </div>
            <Link
              to='/'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-[16px] 2xl:text-[18px]'
            >
              Home
            </Link>
            <Link
              to='/about-us'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-[16px] 2xl:text-[18px]'
            >
              Giới thiệu
            </Link>
            <Link
              to='/about-us/activities'
              className='text-xs text-[#5b5b5b] hover:text-black md:text-lg lg:text-[16px] 2xl:text-[18px]'
            >
              Cộng đồng Chúng Ta Cùng Tiến
            </Link>
          </div>

          <div className='flex flex-col gap-y-[1rem] pl-[5%] sm:justify-between sm:gap-y-[1.5rem] lg:justify-start lg:pl-0 2xl:w-[35%]'>
            <div className='flex flex-col'>
              <p className='text-left text-[20px] font-semibold lg:text-lg xl:text-xl 2xl:text-2xl'>
                Liên Hệ
              </p>
              <button
                className='h-[5px] w-[10%] justify-start rounded-r-lg bg-[#E3F2FD] lg:w-[15%]'
                disabled
              />
            </div>
            <div className='flex flex-col gap-y-3 md:gap-y-2 lg:gap-y-4 2xl:gap-y-6'>
              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.LocationIcon className='h-auto w-[36px] md:w-[28px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
                </div>
                <div className='flex flex-col'>
                  <p className='whitespace-nowrap text-[11.5px] md:text-lg lg:text-[16px] 2xl:text-[18px]'>
                    Phòng 102, Nhà học Thể dục thể thao, Đại học Bách
                  </p>
                  <p className='whitespace-nowrap text-[11.5px] md:text-lg lg:text-[16px] 2xl:text-[18px]'>
                    Khoa - Đại học Quốc gia Hồ Chí Minh, Cơ sở 2
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.PhoneIcon className='h-auto w-[36px] md:w-[28px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
                </div>
                <div className='text-[11.5px] md:text-lg lg:text-[16px] 2xl:text-[18px]'>
                  <a href='tel:036329470'>036 329 4701</a>
                  <span> - </span>
                  <a href='tel:0868353556'>086 835 3556</a>
                </div>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.MailIcon className='h-auto w-[36px] md:w-[28px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
                </div>
                <a
                  href='mailto:chungtacungtienbk@gmail.com'
                  className='text-[11.5px] md:text-sm lg:text-[16px] 2xl:text-[18px]'
                >
                  chungtacungtienbk@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <p className='flex justify-center text-[32px] font-bold text-[#4285F4] md:text-[24px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[40px]'>
            WE LEARN - WE SHARE
          </p>
        </div>
      </div>
      <div className='h-[2px] w-full px-8 md:px-5 lg:px-10 xl:px-20 3xl:px-[100px]'>
        <div className='h-[2px] w-full bg-[#ecedef]' />
      </div>
      <div className='flex w-full flex-row justify-between px-8 py-2 md:px-5 lg:px-10 xl:px-20 2xl:py-3'>
        <p className='flex h-full items-center text-sm font-medium md:text-[16px] xl:text-lg 2xl:text-xl'>
          &copy; 2023 bởi Fessior Community
        </p>
        <div className='flex gap-x-3 md:gap-x-2 lg:gap-x-4 2xl:gap-x-6'>
          <a href='https://facebook.com/chungtacungtien' target='_blank' rel='noopener noreferrer'>
            <Icon.FacebookIcon className='aspect-square w-[50px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
          </a>
          <a
            href='https://www.youtube.com/c/CLBCh%C3%BAngtac%C3%B9ngti%E1%BA%BFn%C4%90HBK'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon.YoutubeIcon className='aspect-square  w-[50px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
