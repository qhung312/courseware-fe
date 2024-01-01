import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../components';
import { useWindowDimensions } from '../../hooks';

const linkGoogleMap =
  'https://www.google.com/maps/dir/10.8079576,106.6823685/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Qu%E1%BB%91c+gia+TP.HCM,+268+L%C3%BD+Th%C6%B0%E1%BB%9Dng+Ki%E1%BB%87t,+Ph%C6%B0%E1%BB%9Dng+14,+Qu%E1%BA%ADn+10,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.7876707,106.6497011,13.87z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x31752ec3c161a3fb:0xef77cd47a1cc691e!2m2!1d106.6579018!2d10.772075?entry=ttu';
const linkFacebook = 'https://www.facebook.com/bkquocte';

const Footer: FC = () => {
  const { width } = useWindowDimensions();

  return (
    <footer className='flex w-full flex-col bg-white'>
      <div className='flex w-full flex-col gap-y-4 md:gap-y-2 lg:gap-y-3 xl:gap-y-4 2xl:gap-y-5'>
        <div className='flex w-full flex-col items-start justify-between gap-y-8 px-5 py-2 md:gap-y-12 md:px-5 md:py-4 lg:flex-row lg:gap-y-6 lg:px-10 lg:py-4 xl:gap-y-10 xl:px-20 2xl:gap-y-10 3xl:px-[100px]'>
          <div className='flex flex-col items-center gap-y-3'>
            <Icon.LogoBK className='h-auto w-20 md:w-[120px] lg:w-[120px] xl:w-[132px] 2xl:w-[152px]' />
            <h1 className='text-center text-xl font-bold text-[#030391]'>BK - OISP</h1>
          </div>
          <div className='flex h-fit flex-col justify-between gap-y-1 pl-0 md:pl-[5%] lg:gap-y-2 lg:pl-0 2xl:gap-y-3 3xl:gap-y-4'>
            <div className='flex flex-col'>
              <p className='text-left text-[20px] font-semibold md:text-[20px] lg:text-lg xl:text-xl'>
                Thông tin
              </p>
              <button
                className='h-[5px] w-[8%] justify-start rounded-r-lg bg-[#E3F2FD] lg:w-[40%]'
                disabled
              />
            </div>
            <Link to='/' className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'>
              Home
            </Link>
            <a
              href='https://oisp.hcmut.edu.vn/gioi-thieu/'
              target='_blank'
              rel='noreferrer'
              className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
            >
              Giới thiệu
            </a>
            <a
              href={linkFacebook}
              target='_blank'
              className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
              rel='noreferrer'
            >
              Fanpage Quốc Tế Bách Khoa HCM
            </a>
          </div>

          <div className='flex h-fit flex-col justify-between gap-y-3 pl-0 md:gap-y-1 md:pl-[5%] lg:gap-y-2 lg:pl-0 2xl:gap-y-3 3xl:gap-y-4'>
            <div className='flex flex-col'>
              <p className='text-left text-[20px] font-semibold lg:text-lg xl:text-xl'>Liên Hệ</p>
              <button
                className='h-[5px] w-[10%] justify-start rounded-r-lg bg-[#E3F2FD] lg:w-[15%]'
                disabled
              />
            </div>
            <div className='flex flex-col gap-y-3 lg:gap-y-2 2xl:gap-y-3 3xl:gap-y-4'>
              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.LocationIcon className='h-auto w-[36px] fill-[#202420] md:w-[28px] lg:w-[28px] 2xl:w-[36px] 3xl:w-[42px]' />
                </div>
                <a
                  target='_blank'
                  href={linkGoogleMap}
                  className='flex flex-col text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
                  rel='noreferrer'
                >
                  <p className='text-inherit md:whitespace-nowrap'>
                    Trường Đại học Bách Khoa - Đại học Quốc gia Hồ Chí Minh, {width > 768 && <br />}
                    268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM
                  </p>
                </a>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem] '>
                <div>
                  <Icon.PhoneIcon className='h-auto w-[36px] fill-[#202420] md:w-[28px] lg:w-[28px] 2xl:w-[36px] 3xl:w-[42px]' />
                </div>
                <div className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'>
                  <a href='tel:0783330247' className='text-inherit'>
                    078 333 0247
                  </a>
                </div>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
                <div>
                  <Icon.MailIcon className='h-auto w-[36px] fill-[#202420] md:w-[28px] lg:w-[28px] 2xl:w-[36px] 3xl:w-[42px]' />
                </div>
                <a
                  href='mailto:chungtacungtienbk@gmail.com'
                  className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
                >
                  tuvan@oisp.edu.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[2px] w-full pt-8 md:pt-10 lg:pt-16 xl:pt-20 3xl:pt-[100px]'>
        <div className='h-[2px] w-full bg-[#ecedef]' />
      </div>
      <div className='flex w-full flex-row items-center justify-between px-8 py-2 md:px-5 lg:px-10 xl:px-20 2xl:py-3 3xl:px-[100px]'>
        <p className='flex h-full items-center text-sm font-medium md:text-[16px] xl:text-lg 2xl:text-xl'>
          &copy; 2023 by BK - OISP
        </p>
        <div className='flex gap-x-3 md:gap-x-2 lg:gap-x-4 2xl:gap-x-6'>
          <a href={linkFacebook} target='_blank' rel='noopener noreferrer'>
            <Icon.FacebookIcon className='aspect-square w-[40px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
