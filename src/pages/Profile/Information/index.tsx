import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Footer } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import { Page } from '../../../layout';
import UserService from '../../../service/user.service';
import useBoundStore from '../../../store';
import { User } from '../../../types';

const UserInformation = () => {
  const user = useBoundStore.use.user();
  const [isEditMode, setIsEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState<User>(user);
  const [updatedName, setUpdatedName] = useState('');

  const formattedDate = new Date(userProfile?.dateOfBirth || '2000-01-01')
    .toISOString()
    .split('T')[0];

  const updateProfile = () => {
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
      });
  };

  return (
    <Page title='Thông tin người dùng - Xem và cập nhật thông tin'>
      <main className='with-nav-height w-full overflow-y-auto'>
        {/* Banner */}
        <ProfileOption
          option={1}
          editAvatar={false}
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
                className='mt-3 mb-5 flex w-fit gap-x-[2px] rounded-[12px] bg-[#E3F2FD] px-3 py-2 hover:bg-[#9DCCFF]'
              >
                <Icon.Pen fill='#252641' className='h-5 w-5 3xl:h-6 3xl:w-6' />
                <p className='text-base font-semibold text-[#252641] 3xl:text-xl'>Chỉnh sửa</p>
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
                  value={userProfile?.dateOfBirth ? formattedDate : ''}
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
                <select
                  name='gender'
                  id='gender'
                  disabled={!isEditMode}
                  value={userProfile?.gender}
                  className={`black-placeholder mt-2 w-[60%] rounded-[10px] md:w-[28%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641] opacity-100`}
                  onChange={(e) => {
                    setUserProfile({ ...userProfile, gender: e.target.value });
                  }}
                >
                  <option value='MALE'>{!userProfile?.gender ? 'Chọn giới tính' : 'Nam'}</option>
                  <option value='FEMALE'>Nữ</option>
                  <option value='OTHER'>Khác</option>
                </select>
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
        <Footer />
      </main>
      <ToastContainer position='bottom-right' />
    </Page>
  );
};

export default UserInformation;
