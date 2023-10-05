import { ReactComponent as FacebookIcon } from '../../assets/svgs/FacebookIcon.svg';
import { ReactComponent as LocationIcon } from '../../assets/svgs/LocationIcon.svg';
import { ReactComponent as LogoCTCT } from '../../assets/svgs/LogoCTCT.svg';
import { ReactComponent as LogoGDSC } from '../../assets/svgs/LogoGDSC.svg';
import { ReactComponent as MailIcon } from '../../assets/svgs/MailIcon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/svgs/PhoneIcon.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/svgs/YoutubeIcon.svg';

const Footer = () => {
  return (
    <div className='max-w-[1920px] mx-auto pb-[2.5rem]'>
      <div className='flex sml:flex-col sml:pb-[0.25rem] sm:flex-col sm:pb-[1rem] lg:flex-row lg:justify-between lg:pt-[1.5rem] xl:pt-[2rem] xl:pb-[1rem] 2xl:pb-0'>
        <div className='flex sml:justify-evenly sml:pb-[1rem] sml:pt-[0.75rem] sm:justify-evenly sm:mb-[1rem] sm:pb-[2rem] sm:pt-[2.5rem] lg:items-center lg:px-[1rem] xl:px-[2rem] 2xl:gap-x-[3rem]'>
          <div className='sml:mt-[1.25rem] sm:mt-[1.625rem]'>
            <LogoCTCT className='sml:w-[7.5rem] sml:h-[3.5rem] sm:w-[9.375rem] sm:h-[5rem] md:w-[11rem] md:h-[7.5rem] lg:w-[8rem] lg:h-[3.5rem] xl:w-[9rem] xl:h-[4.75rem] 2xl:w-[10rem] 2xl:h-[5.5rem]' />
          </div>

          <div className='flex flex-col gap-y-[1rem]'>
            <div className='mx-auto'>
              <p className='text-[#000] font-[600] sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl'>
                Đơn vị hợp tác
              </p>
            </div>
            <div className=''>
              <LogoGDSC className='sml:w-[11rem] sml:h-[3rem] sm:w-[15rem] sm:h-[5rem] md:h-[7rem] md:w-[17rem] lg:w-[13rem] lg:h-[4rem] xl:w-[14.5rem] xl:h-[4.5rem] 2xl:w-[15rem] 2xl:h-[5rem]' />
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:justify-between 2xl:gap-y-[5.125rem] '>
          <div className='flex flex-col justify-between sml:pl-[1.5rem] sm:pl-[1.5rem] sm:gap-y-[0.75rem] lg:pl-0 xl:px-[2rem]'>
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
            <p className='font-bold sml:hidden sm:hidden lg:inline lg:text-[23px] xl:text-[30px] 2xl:text-[38px]'>
              WE LEARN - WE SHARE
            </p>
          </div>
        </div>

        <div className='flex flex-col sm:justify-between box-content sml:px-[1.5rem] sml:pt-[1rem] sml:gap-y-[1rem] sm:px-[1.5rem] sm:pt-[1rem] sm:gap-y-[1.5rem] lg:w-[35%] lg:pt-0 lg:justify-start'>
          <div className=''>
            <p className='font-semibold sm:text-left sml:text-lg sm:text-xl lg:text-center lg:text-2xl xl:text-3xl'>
              Liên Hệ
            </p>
          </div>
          <div className='flex flex-col sml:gap-y-[0.75rem] sm:gap-y-[0.5rem]'>
            <div className='flex items-center sml:gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
              <div>
                <LocationIcon className='sml:h-[2.25rem] sml:w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
              </div>
              <p className='sml:text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                Phòng 102, Nhà học Thể dục thể thao, Đại học Bách Khoa - Đại học Quốc gia Hồ Chí
                Minh, Cơ sở 2
              </p>
            </div>

            <div className='flex items-center sml:gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
              <div>
                <PhoneIcon className='sml:h-[2.25rem] sml:w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
              </div>
              <p className='sml:text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                036 329 4701 - 086 835 3556
              </p>
            </div>

            <div className='flex items-center sml:gap-x-[0.5rem] sm:gap-x-[0.75rem]'>
              <div>
                <MailIcon className='sml:h-[2.25rem] sml:w-[2.25rem] sm:h-[2.25rem] sm:w-[2.25rem] md:h-[2.75rem] md:w-[2.75rem] lg:h-[2.5rem] lg:w-[2.5rem] xl:h-[3rem] xl:w-[3rem]' />
              </div>
              <p className='sml:text-[11.5px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px]'>
                chungtacungtienbk@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-solid border-black border-[1px]' />
      <div className='flex sml:flex-col sml:items-center sml:gap-y-[0.2rem] sml:pt-[0.25rem] sm:flex-col sm:items-center sm:pt-[0.25rem] sm:gap-y-[1.5rem] lg:items-end lg:pr-[2rem]'>
        <div>
          <p className='font-bold sml:text-[1.5rem] sm:flex sm:text-[2rem] md:text-[2rem] lg:hidden'>
            WE LEARN - WE SHARE
          </p>
        </div>
        <div className='flex sml:gap-x-[1.25rem] sm:gap-x-[2rem]'>
          <FacebookIcon className='sml:h-[2.25rem] sml:w-[2.25rem]' />
          <YoutubeIcon className='sml:h-[2.25rem] sml:w-[2.25rem]' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
