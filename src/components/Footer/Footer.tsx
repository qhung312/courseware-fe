import { ReactComponent as FacebookIcon } from '../../assets/svgs/FacebookIcon.svg';
import { ReactComponent as LocationIcon } from '../../assets/svgs/LocationIcon.svg';
import { ReactComponent as LogoCTCT } from '../../assets/svgs/LogoCTCT.svg';
import { ReactComponent as LogoGDSC } from '../../assets/svgs/LogoGDSC.svg';
import { ReactComponent as MailIcon } from '../../assets/svgs/MailIcon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/svgs/PhoneIcon.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/svgs/YoutubeIcon.svg';

const Footer = () => {
  return (
    <div className='mx-auto max-w-[1920px] pb-[2.5rem]'>
      <div className='flex sm:flex-col sm:pb-[1rem] lg:flex-row lg:justify-between lg:pt-[1.5rem] xl:pt-[2rem] xl:pb-[1rem] 2xl:pb-0 sml:flex-col sml:pb-[0.25rem]'>
        <div className='flex sm:mb-[1rem] sm:justify-evenly sm:pb-[2rem] sm:pt-[2.5rem] lg:items-center lg:px-[1rem] xl:px-[2rem] 2xl:gap-x-[3rem] sml:justify-evenly sml:pb-[1rem] sml:pt-[0.75rem]'>
          <div className='sm:mt-[1.625rem] sml:mt-[1.25rem]'>
            <LogoCTCT className='sm:h-[5rem] sm:w-[9.375rem] md:h-[7.5rem] md:w-[11rem] lg:h-[3.5rem] lg:w-[8rem] xl:h-[4.75rem] xl:w-[9rem] 2xl:h-[5.5rem] 2xl:w-[10rem] sml:h-[3.5rem] sml:w-[7.5rem]' />
          </div>

          <div className='flex flex-col gap-y-[1rem]'>
            <div className='mx-auto'>
              <p className='font-[600] text-[#000] sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl'>
                Đơn vị hợp tác
              </p>
            </div>
            <div className=''>
              <LogoGDSC className='sm:h-[5rem] sm:w-[15rem] md:h-[7rem] md:w-[17rem] lg:h-[4rem] lg:w-[13rem] xl:h-[4.5rem] xl:w-[14.5rem] 2xl:h-[5rem] 2xl:w-[15rem] sml:h-[3rem] sml:w-[11rem]' />
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:justify-between 2xl:gap-y-[5.125rem] '>
          <div className='flex flex-col justify-between sm:gap-y-[0.75rem] sm:pl-[1.5rem] lg:pl-0 xl:px-[2rem] sml:pl-[1.5rem]'>
            <p className='text-[#5b5b5b] sm:text-[14px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px]'>
              Home
            </p>
            <p className='text-[#5b5b5b] sm:text-[14px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px]'>
              Giới thiệu
            </p>
            <p className='text-[#5b5b5b] sm:text-[14px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px]'>
              Cộng đồng Chúng Ta Cùng Tiến
            </p>
          </div>

          <div className='mx-auto'>
            <p className='font-bold sm:hidden lg:inline lg:text-[23px] xl:text-[30px] 2xl:text-[38px] sml:hidden'>
              WE LEARN - WE SHARE
            </p>
          </div>
        </div>

        <div className='box-content flex flex-col sm:justify-between sm:gap-y-[1.5rem] sm:px-[1.5rem] sm:pt-[1rem] lg:w-[35%] lg:justify-start lg:pt-0 sml:gap-y-[1rem] sml:px-[1.5rem] sml:pt-[1rem]'>
          <div className=''>
            <p className='font-semibold sm:text-left sm:text-xl lg:text-center lg:text-2xl xl:text-3xl sml:text-lg'>
              Liên Hệ
            </p>
          </div>
          <div className='flex flex-col sm:gap-y-[0.5rem] sml:gap-y-[0.75rem]'>
            <div className='flex items-center sm:gap-x-[0.75rem] sml:gap-x-[0.5rem]'>
              <div>
                <LocationIcon className='sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem] sml:h-[2.25rem] sml:w-[2.25rem]' />
              </div>
              <p className='sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] sml:text-[11.5px]'>
                Phòng 102, Nhà học Thể dục thể thao, Đại học Bách Khoa - Đại học Quốc gia Hồ Chí
                Minh, Cơ sở 2
              </p>
            </div>

            <div className='flex items-center sm:gap-x-[0.75rem] sml:gap-x-[0.5rem]'>
              <div>
                <PhoneIcon className='sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem] sml:h-[2.25rem] sml:w-[2.25rem]' />
              </div>
              <p className='sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] sml:text-[11.5px]'>
                036 329 4701 - 086 835 3556
              </p>
            </div>

            <div className='flex items-center sm:gap-x-[0.75rem] sml:gap-x-[0.5rem]'>
              <div>
                <MailIcon className='sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem] sml:h-[2.25rem] sml:w-[2.25rem]' />
              </div>
              <p className='sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] sml:text-[11.5px]'>
                chungtacungtienbk@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-[1px] border-solid border-black' />
      <div className='flex sm:flex-col sm:items-center sm:gap-y-[1.5rem] sm:pt-[0.25rem] lg:items-end lg:pr-[2rem] sml:flex-col sml:items-center sml:gap-y-[0.2rem] sml:pt-[0.25rem]'>
        <div>
          <p className='font-bold sm:flex sm:text-[2rem] md:text-[2rem] lg:hidden sml:text-[1.5rem]'>
            WE LEARN - WE SHARE
          </p>
        </div>
        <div className='flex sm:gap-x-[2rem] sml:gap-x-[1.25rem]'>
          <FacebookIcon className='sml:h-[2.25rem] sml:w-[2.25rem]' />
          <YoutubeIcon className='sml:h-[2.25rem] sml:w-[2.25rem]' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
