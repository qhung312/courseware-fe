import { Link } from 'react-router-dom';

import UserProfileBanner from '../../assets/images/UserProfile.png';
import useBoundStore from '../../store';
import Icon from '../Icon';

interface Option {
  option: number;
}

const ProfileOption = ({ option }: Option) => {
  const user = useBoundStore.use.user();

  return (
    <div className='padding flex flex-col items-center bg-[#E3F2FD] pt-10 pb-4 md:relative md:pb-0 md:pt-0'>
      <div className='hidden md:block md:h-[160px] lg:h-[188px] xl:h-fit'>
        <img className='h-full' alt='Banner' src={UserProfileBanner} />
      </div>
      <div className='md:absolute md:left-5 md:bottom-5 lg:left-[40px] xl:left-[80px] 3xl:left-[148px]'>
        <div className='relative'>
          <div className='flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px] 3xl:h-[220px] 3xl:w-[220px]'>
            <img
              alt='User avatar'
              src={user?.picture || require('../../assets/images/AvatarPic.png')}
              className='h-[180px] w-[180px] rounded-full bg-slate-600 md:h-[140px] md:w-[140px] lg:h-[160px] lg:w-[160px] 3xl:h-[200px] 3xl:w-[200px]'
            />
          </div>
          <button className='absolute bottom-0 right-6 h-8 w-[32px] rounded-full bg-[#4285f4] xl:h-10 xl:w-10'>
            <Icon.Camera className='m-auto xl:h-8 xl:w-8' />
          </button>
        </div>
        <p className='mt-3 text-center text-[28px] font-medium text-black md:text-[20px] lg:text-[24px] 2xl:text-2xl'>
          Nguyễn Văn A
        </p>
      </div>
      <div className='mt-8 grid w-full max-w-[496px] grid-cols-3 gap-x-2 px-5 md:mt-0 md:flex md:max-w-full md:justify-end md:bg-[#E3F2FD] md:py-5 md:pr-10 xl:justify-center'>
        <Link
          to='/profile'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 1
              ? 'bg-[#4285f4] text-white'
              : 'bg-[#BBBBBB]/50 text-[#696969] hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          <p className='hidden lg:block'>Thông tin cá nhân</p>
          <p className='lg:hidden'>Thông tin</p>
        </Link>
        <Link
          to='/profile/history'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 2
              ? 'bg-[#4285f4] text-white'
              : 'bg-[#BBBBBB]/50 text-[#696969] hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          <p className='hidden lg:block'>Lịch sử hoạt động</p>
          <p className='lg:hidden'>Lịch sử</p>
        </Link>
        <Link
          to='/profile/statistic'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 3
              ? 'bg-[#4285f4] text-white'
              : 'bg-[#BBBBBB]/50 text-[#696969] hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          Thống kê
        </Link>
      </div>
    </div>
  );
};

export default ProfileOption;
