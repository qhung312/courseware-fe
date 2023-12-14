import { Link } from 'react-router-dom';

import UserProfileBanner from '../../assets/images/UserProfile.jpg';
import useBoundStore from '../../store';
import Icon from '../Icon';

interface Option {
  option: number;
  editAvatar: boolean;
  updatedName: string;
  setAvatar: { (avatar: string): void };
}

const ProfileOption = ({ option, editAvatar = false, setAvatar, updatedName }: Option) => {
  const user = useBoundStore.use.user();

  return (
    <div className='padding flex flex-col items-center bg-[#E3F2FD] pt-10 pb-4 md:relative md:pb-0 md:pt-0'>
      <div className='hidden md:block md:h-[160px] lg:h-[188px] xl:h-[232px] 2xl:h-[280px] 4xl:h-[20vw]'>
        <img className='h-full' alt='Banner' src={UserProfileBanner} />
      </div>
      <div className='flex flex-col items-center md:absolute md:left-5 md:bottom-5 lg:left-[40px] xl:left-[80px] 3xl:left-[148px]'>
        <div className='relative'>
          <div className='flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px] 3xl:h-[220px] 3xl:w-[220px]'>
            <img
              alt='User avatar'
              src={require('../../assets/images/AvatarPic.png')}
              className='h-[180px] w-[180px] rounded-full bg-slate-600 md:h-[160px] md:w-[160px] lg:h-[180px] lg:w-[180px] 3xl:h-[220px] 3xl:w-[220px]'
            />
          </div>
          {editAvatar && (
            <label
              htmlFor='upload-avatar'
              className='absolute bottom-0 right-6 flex h-8 w-[32px] cursor-pointer items-center justify-center rounded-full bg-[#4285f4] xl:h-10 xl:w-10'
            >
              <Icon.Camera className='m-auto xl:h-8 xl:w-8' />
              <input
                type='file'
                id='upload-avatar'
                accept='image/png, image/jpeg, image/jpg'
                className='absolute -z-10 opacity-0'
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAvatar(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </label>
          )}
        </div>
        {updatedName && (
          <p className='mt-3 max-h-[32px] max-w-[80vw] overflow-hidden text-ellipsis text-center text-[28px] font-medium text-black md:max-w-[160px] md:text-[20px] lg:max-w-[300px] lg:text-[24px] 2xl:text-2xl'>
            {updatedName}
          </p>
        )}
        {(user?.givenName || user?.familyAndMiddleName) && !updatedName && (
          <p className='mt-3 max-h-[32px] max-w-[80vw] overflow-hidden text-ellipsis text-center text-[28px] font-medium text-black md:max-w-[160px] md:text-[20px] lg:max-w-[300px] lg:text-[24px] 2xl:text-2xl'>
            {user?.familyAndMiddleName || ''} {user?.givenName || ''}
          </p>
        )}
      </div>
      <div className='mt-8 grid w-full max-w-[496px] grid-cols-3 gap-x-2 px-5 md:mt-0 md:flex md:max-w-full md:justify-end md:bg-[#E3F2FD] md:py-5 md:pr-10 xl:justify-center'>
        <Link
          to='/profile'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 1 ? 'bg-[#4285f4] text-white' : 'bg-white text-[#696969] hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          <p className={`hidden lg:block ${option === 1 ? 'text-white' : ''}`}>Thông tin cá nhân</p>
          <p className={`lg:hidden ${option === 1 ? 'text-white' : ''}`}>Thông tin</p>
        </Link>
        <Link
          to='/profile/history'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 2 ? 'bg-[#4285f4] text-white' : 'bg-white hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          <p className={`hidden lg:block ${option === 2 ? 'text-white' : ''}`}>Lịch sử hoạt động</p>
          <p className={`lg:hidden ${option === 2 ? 'text-white' : ''}`}>Lịch sử</p>
        </Link>
        <Link
          to='/profile/statistic'
          className={`w-full max-w-[160px] rounded-[12px] lg:max-w-[160px] 3xl:max-w-[200px] ${
            option === 3 ? 'bg-[#4285f4] text-white' : 'bg-white hover:bg-[#9DCCFF]'
          } py-3 text-center font-medium md:text-[16px] 3xl:text-xl`}
        >
          Thống kê
        </Link>
      </div>
    </div>
  );
};

export default ProfileOption;
