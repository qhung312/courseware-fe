import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Footer, Loading } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';
import UserService from '../../../service/user.service';
import useBoundStore from '../../../store';
import { User } from '../../../types';

const UserInformation = () => {
  const user = useBoundStore.use.user();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<User>(user);
  const [updatedName, setUpdatedName] = useState('');
  const [loading, setLoading] = useState(false);

  const onLibraryClick = () => {
    setIsGenderOpen(!isGenderOpen);
  };

  const throttledLibraryClick = useThrottle(onLibraryClick);

  const formattedDate = new Date(userProfile?.dateOfBirth || '000000000')
    .toISOString()
    .split('T')[0];

  const updateProfile = () => {
    setLoading(true);
    console.log(userProfile);
    UserService.editUserProfile(userProfile)
      .then((res) => {
        toast.success('Cập nhật thông tin thành công');
        setUserProfile(res.data.payload);
        setUpdatedName(
          (userProfile?.familyAndMiddleName || '') + ' ' + (userProfile?.givenName || '')
        );
        setIsEditMode(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <Page title='Thông tin người dùng - Xem và cập nhật thông tin'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption
          option={1}
          editAvatar={isEditMode}
          setAvatar={(avatar: string) => {
            setUserProfile({ ...userProfile, picture: avatar });
          }}
          updatedName={updatedName}
        />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:rounded-[20px] md:px-10 md:pt-10 lg:px-[120px] xl:px-[240px] 2xl:px-[360px] 3xl:px-[460px]'>
          <div className='md:rounded-[20px] md:px-5 md:py-8 md:shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] lg:px-8 xl:px-10'>
            {updatedName ? (
              <h1 className='text-2xl font-semibold text-[#2252641] 3xl:text-[28px]'>
                Thông tin của {updatedName}
              </h1>
            ) : (
              <h1 className='text-2xl font-semibold text-[#2252641] 3xl:text-[28px]'>
                Thông tin của {user?.familyAndMiddleName || ''} {user?.givenName || 'người dùng'}
              </h1>
            )}
            {isEditMode ? (
              <p className='mb-8 mt-2 text-xl font-semibold text-[#4285f4]/[.7] 3xl:text-2xl'>
                Cập nhật thông tin
              </p>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className='mt-3 mb-5 flex w-fit gap-x-1 rounded-[12px] bg-[#E3F2FD] px-3 py-2 hover:bg-[#9DCCFF]'
              >
                <Icon.Pen fill='#252641' />
                <p className='font-semibold text-[#252641] xl:text-xl'>Chỉnh sửa thông tin</p>
              </button>
            )}
            <form className='flex flex-col'>
              <div className='flex flex-col md:flex-row md:items-center'>
                <label
                  htmlFor='lastname&middlename'
                  className='text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Họ và tên lót
                </label>
                <input
                  type='text'
                  id='lastname&middlename'
                  name='lastname&middlename'
                  disabled={!isEditMode}
                  placeholder={userProfile.familyAndMiddleName}
                  value={userProfile.familyAndMiddleName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, familyAndMiddleName: e.target.value })
                  }
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='firstname'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Tên
                </label>
                <input
                  type='text'
                  id='firstname'
                  name='firstname'
                  disabled={!isEditMode}
                  placeholder={userProfile.givenName}
                  value={userProfile.givenName}
                  onChange={(e) => setUserProfile({ ...userProfile, givenName: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='studentId'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Mã số sinh viên
                </label>
                <input
                  type='text'
                  id='studentId'
                  name='studentId'
                  disabled={!isEditMode}
                  placeholder={userProfile.studentId}
                  value={userProfile.studentId}
                  onChange={(e) => setUserProfile({ ...userProfile, studentId: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='major'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Khoa
                </label>
                <input
                  type='text'
                  id='major'
                  name='major'
                  disabled={!isEditMode}
                  value={userProfile.major}
                  placeholder={userProfile.major}
                  onChange={(e) => setUserProfile({ ...userProfile, major: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='birthday'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Ngày sinh
                </label>
                <input
                  type='date'
                  id='birthday'
                  name='birthday'
                  disabled={!isEditMode}
                  value={formattedDate}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      dateOfBirth: new Date(e.target.value).getTime(),
                    })
                  }
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='gender'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Giới tính
                </label>
                {isEditMode ? (
                  <div className='relative mt-2 md:w-[70%]'>
                    <button
                      type='button'
                      className='z-20 flex w-[60%] flex-row items-center justify-between rounded-[10px] border-[1px] border-[#D9D9D9] p-4 hover:border-[#4285f4] focus:border-[#4285f4] md:w-[40%]'
                      onClick={throttledLibraryClick}
                    >
                      <p className='text-xl text-[#252641] transition-colors duration-300 ease-linear'>
                        {userProfile?.gender === 'MALE'
                          ? 'Nam'
                          : userProfile?.gender === 'FEMALE'
                          ? 'Nữ'
                          : userProfile?.gender === 'OTHER'
                          ? 'Khác'
                          : 'Chọn giới tính'}
                      </p>
                      <Icon.ChevronUp
                        fillOpacity={0.87}
                        fill='#252641'
                        className={`transform-all aspect-[10/7] h-auto w-3 duration-300 ${
                          isGenderOpen ? 'rotate-0' : 'rotate-180'
                        }`}
                      />
                    </button>
                    <nav
                      className='absolute z-10 mt-1 flex w-[60%] flex-col 
                      items-center justify-center rounded-lg bg-[#FBFCFF]
                      transition-all duration-300 md:w-[40%]'
                      style={{
                        transform: isGenderOpen ? 'translateY(0%)' : 'translateY(10%)',
                        maxHeight: isGenderOpen ? '1000px' : '0px',
                        opacity: isGenderOpen ? 1 : 0,
                        overflow: 'hidden',
                        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div
                        className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                          userProfile.gender === 'MALE' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'MALE' });
                          throttledLibraryClick();
                        }}
                      >
                        <p className='whitespace-nowrap bg-inherit text-base text-[#252641] lg:text-[18px]'>
                          Nam
                        </p>
                      </div>
                      <div
                        className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                          userProfile.gender === 'FEMALE' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'FEMALE' });
                          throttledLibraryClick();
                        }}
                      >
                        <p className='whitespace-nowrap bg-inherit text-base text-[#252641] lg:text-[18px]'>
                          Nữ
                        </p>
                      </div>
                      <div
                        className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                          userProfile.gender === 'OTHER' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'OTHER' });
                          throttledLibraryClick();
                        }}
                      >
                        <p className='whitespace-nowrap bg-inherit text-base text-[#252641] lg:text-[18px]'>
                          Khác
                        </p>
                      </div>
                    </nav>
                  </div>
                ) : (
                  <input
                    type='string'
                    id='gender'
                    name='gender'
                    disabled
                    placeholder={
                      userProfile?.gender === 'MALE'
                        ? 'Nam'
                        : userProfile?.gender === 'FEMALE'
                        ? 'Nữ'
                        : userProfile?.gender === 'OTHER'
                        ? 'Khác'
                        : ''
                    }
                    value={
                      userProfile?.gender === 'MALE'
                        ? 'Nam'
                        : userProfile?.gender === 'FEMALE'
                        ? 'Nữ'
                        : userProfile?.gender === 'OTHER'
                        ? 'Khác'
                        : ''
                    }
                    className={`black-placeholder mt-2 w-[60%] rounded-[10px] md:w-[28%] ${
                      isEditMode
                        ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                        : 'bg-[#D9D9D9]'
                    } p-4 text-xl text-[#252641]`}
                  />
                )}
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='email'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  disabled
                  placeholder={userProfile.email}
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
              <div className='flex flex-col md:mt-2 md:flex-row md:items-center'>
                <label
                  htmlFor='phone'
                  className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                >
                  Số điện thoại
                </label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  disabled={!isEditMode}
                  placeholder={userProfile.phoneNumber}
                  value={userProfile.phoneNumber}
                  onChange={(e) => setUserProfile({ ...userProfile, phoneNumber: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
            </form>
            {isEditMode && (
              <div className='flex gap-x-2'>
                <button
                  onClick={updateProfile}
                  className='mt-8 w-fit rounded-[12px] bg-[#4285f4] py-3 px-6 text-xl font-semibold text-white hover:bg-[#4285f4]/[.7]'
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setUserProfile(user);
                  }}
                  className='mt-8 w-fit rounded-[12px] bg-[#db4437] py-3 px-6 text-xl font-semibold text-white hover:bg-[#db4437]/[.7]'
                >
                  Hủy
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer position='bottom-right' />
    </Page>
  );
};

export default UserInformation;
