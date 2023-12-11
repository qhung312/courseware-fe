import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../components';
import { useWindowDimensions } from '../../hooks';

const linkGoogleMap =
  'https://www.google.com/maps/search/%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch++Khoa+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+Qu%E1%BB%91c+gia+H%E1%BB%93+Ch%C3%AD+Minh,+C%C6%A1+s%E1%BB%9F+2/@10.8800234,106.8050395,18.58z?hl=vi-VN&entry=ttu';
const linkYoutube = 'https://www.youtube.com/c/CLBCh%C3%BAngtac%C3%B9ngti%E1%BA%BFn%C4%90HBK';
const linkFacebookCTCT = 'https://facebook.com/chungtacungtien';
const linkFaceBookGDSC = 'https://www.facebook.com/dscxhcmut';

const Footer: FC = () => {
  const { width } = useWindowDimensions();

  return (
    <footer className='flex w-full flex-col bg-white'>
      <div className='flex w-full flex-col gap-y-4 md:gap-y-2 lg:gap-y-3 xl:gap-y-4 2xl:gap-y-5'>
        <div className='flex w-full flex-col justify-between gap-y-8 px-5 py-2 md:gap-y-12 md:px-5 md:py-4 lg:flex-row lg:gap-y-6 lg:px-10 lg:py-4 xl:gap-y-10 xl:px-20 2xl:gap-y-10 3xl:px-[100px]'>
          <div className='flex flex-row items-center justify-evenly md:gap-x-6 lg:justify-start lg:gap-y-6 lg:gap-x-10 xl:gap-y-12 2xl:w-[25%] 2xl:gap-x-14 3xl:gap-x-16'>
            <div className='flex items-center'>
              <Icon.LogoCTCT className='h-auto w-[108px] md:w-[160px] lg:w-[120px] xl:w-[132px] 2xl:w-[152px]' />
            </div>

            <div className='flex flex-col items-center justify-center gap-y-2'>
              <p className='font-normal text-[#000] sm:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl'>
                Đơn vị hợp tác
              </p>
              <a href={linkFaceBookGDSC}>
                <Icon.LogoFessior className='h-auto w-[132px] fill-[#0F2D85] md:w-[160px] lg:w-[120px] xl:w-[132px] 2xl:w-[152px]' />
              </a>
            </div>
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
            <Link
              to='/about-us'
              className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
            >
              Giới thiệu
            </Link>
            <a
              href={linkFacebookCTCT}
              target='_blank'
              className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'
              rel='noreferrer'
            >
              Cộng đồng Chúng Ta Cùng Tiến
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
                    Phòng 102, Nhà học Thể dục thể thao, Đại học Bách
                    {width > 768 && <br />}
                    Khoa - Đại học Quốc gia Hồ Chí Minh, Cơ sở 2
                  </p>
                </a>
              </div>

              <div className='flex items-center gap-x-[0.5rem] sm:gap-x-[0.75rem] '>
                <div>
                  <Icon.PhoneIcon className='h-auto w-[36px] fill-[#202420] md:w-[28px] lg:w-[28px] 2xl:w-[36px] 3xl:w-[42px]' />
                </div>
                <div className='text-[14px] text-[#5b5b5b] hover:text-black md:text-[16px]'>
                  <a href='tel:036329470' className='text-inherit'>
                    036 329 4701
                  </a>
                  <span className='text-inherit'> - </span>
                  <a href='tel:0868353556' className='text-inherit'>
                    086 835 3556
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
      <div className='flex w-full flex-row items-center justify-between px-8 py-2 md:px-5 lg:px-10 xl:px-20 2xl:py-3 3xl:px-[100px]'>
        <p className='flex h-full items-center text-sm font-medium md:text-[16px] xl:text-lg 2xl:text-xl'>
          &copy; 2023 bởi Fessior Community
        </p>
        <div className='flex gap-x-3 md:gap-x-2 lg:gap-x-4 2xl:gap-x-6'>
          <a href={linkFacebookCTCT} target='_blank' rel='noopener noreferrer'>
            <Icon.FacebookIcon className='aspect-square w-[40px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
          </a>
          <a href={linkYoutube} target='_blank' rel='noopener noreferrer'>
            <Icon.YoutubeIcon className='aspect-square  w-[40px] lg:w-[36px] 2xl:w-[42px] 3xl:w-[50px]' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
