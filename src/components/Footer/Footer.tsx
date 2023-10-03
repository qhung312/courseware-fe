import { ReactComponent as FacebookIcon } from '../../assets/svgs/FacebookIcon.svg';
import { ReactComponent as LocationIcon } from '../../assets/svgs/LocationIcon.svg';
import { ReactComponent as LogoCTCT } from '../../assets/svgs/LogoCTCT.svg';
import { ReactComponent as LogoGDSC } from '../../assets/svgs/LogoGDSC.svg';
import { ReactComponent as MailIcon } from '../../assets/svgs/MailIcon.svg';
import { ReactComponent as PhoneIcon } from '../../assets/svgs/PhoneIcon.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/svgs/YoutubeIcon.svg';

const Footer = () => {
  return (
    <div className='w-[120rem] h-[31.5rem]'>
      <div className='flex flex-row font-["Roboto"]'>
        <div className='flex pl-[4.5rem] pt-[7.5rem] pb-[]'>
          <div className='mt-[1.625rem]'>
            <LogoCTCT />
          </div>

          <div className='flex flex-col ml-[3.75rem]'>
            <div className='mx-auto mb-4'>
              <p className='text-[#000] text-2xl font-[600]'>Đơn vị hợp tác</p>
            </div>
            <LogoGDSC />
          </div>
        </div>

        <div className='flex flex-col ml-[15rem] pt-[6.25rem]'>
          <div className='flex flex-col justify-between mb-[5.125rem] ml-[2.5rem] h-[9.25rem] gap-y-[2rem]'>
            <p className='text-2xl text-[#5b5b5b]'>Home</p>
            <p className='text-2xl text-[#5b5b5b]'>Giới thiệu</p>
            <p className='text-2xl text-[#5b5b5b]'>Cộng đồng Chúng Ta Cùng Tiến</p>
          </div>

          <div>
            <p className='text-[2.5rem] font-bold'>WE LEARN - WE SHARE</p>
          </div>
        </div>

        <div className='flex flex-col justify-between box-content pt-[6.5rem] ml-[9.5rem] h-[14rem] w-[27.5rem]'>
          <div className='flex justify-center'>
            <p className='text-2xl font-semibold'>Liên Hệ</p>
          </div>

          <div className='flex items-center gap-x-[0.75rem]'>
            <div className='h-[2.75rem] w-[2.75rem]'>
              <LocationIcon />
            </div>
            <p>
              Phòng 102, Nhà học Thể dục thể thao, Đại học Bách Khoa - Đại học Quốc gia Hồ Chí Minh,
              Cơ sở 2
            </p>
          </div>

          <div className='flex items-center gap-x-[0.75rem]'>
            <div className='h-[2.75rem] w-[2.75rem]'>
              <PhoneIcon />
            </div>
            <p>036 329 4701 - 086 835 3556</p>
          </div>

          <div className='flex items-center gap-x-[0.75rem]'>
            <div className='h-[2.75rem] w-[2.75rem]'>
              <MailIcon />
            </div>
            <p>chungtacungtienbk@gmail.com</p>
          </div>
        </div>
      </div>
      <hr className='border-solid border-black border-[1px]' />
      <div className='flex flex-row justify-end pr-[2.25rem] pt-[2.5rem] gap-x-[1.875rem]'>
        <FacebookIcon />
        <YoutubeIcon />
      </div>
    </div>
  );
};

export default Footer;
