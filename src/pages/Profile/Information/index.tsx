import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';

import { Footer } from '../../../components';
import Icon from '../../../components/Icon';
import ProfileOption from '../../../components/ProfileOption';
import SuccessSnackbar from '../../../components/Snackbar/SuccessSnackbar';
import { useThrottle } from '../../../hooks';
import { Page } from '../../../layout';

interface UserInformationProps {
  lastname: string;
  firstname: string;
  studentId: string;
  major: string;
  birthday: string;
  gender: string;
  email: string;
  phone: string;
}

const demoUserProfile: UserInformationProps = {
  lastname: 'Nguyễn Văn',
  firstname: 'Aaaaaa',
  studentId: '215xxxx',
  major: 'Khoa học máy tính',
  birthday: '2003-01-09',
  gender: 'Nam',
  email: 'abcxyz@gmail.com',
  phone: '0122345xx',
};

const UserInformation = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserInformationProps>(demoUserProfile);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const onLibraryClick = () => {
    setIsGenderOpen(!isGenderOpen);
  };

  const throttledLibraryClick = useThrottle(onLibraryClick);

  return (
    <Page title='Thông tin người dùng - Xem và cập nhật thông tin'>
      <div className='fixed bottom-4 right-4 z-[60]'>
        <SuccessSnackbar showSnackbar={successSnackbar} setShow={() => setSuccessSnackbar(false)} />
      </div>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={1} />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:rounded-[20px] md:px-10 md:pt-10 lg:px-[120px] xl:px-[240px] 2xl:px-[360px] 3xl:px-[460px]'>
          <div className='md:rounded-[20px] md:px-5 md:py-8 md:shadow-[0px_19px_47px_0px_rgba(47,50,125,0.1)] lg:px-8 xl:px-10'>
            <h1 className='text-2xl font-semibold text-[#2252641] 3xl:text-[28px]'>
              Thông tin của Nguyễn Văn A
            </h1>
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
                  placeholder={userProfile.lastname}
                  value={userProfile.lastname}
                  onChange={(e) => setUserProfile({ ...userProfile, lastname: e.target.value })}
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
                  placeholder={userProfile.firstname}
                  value={userProfile.firstname}
                  onChange={(e) => setUserProfile({ ...userProfile, firstname: e.target.value })}
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
                  placeholder={userProfile.birthday}
                  value={userProfile.birthday}
                  onChange={(e) => setUserProfile({ ...userProfile, birthday: e.target.value })}
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
                        {userProfile.gender}
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
                          userProfile.gender === 'Nam' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'Nam' });
                          throttledLibraryClick();
                        }}
                      >
                        <p className='whitespace-nowrap bg-inherit text-base text-[#252641] lg:text-[18px]'>
                          Nam
                        </p>
                      </div>
                      <div
                        className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                          userProfile.gender === 'Nữ' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'Nữ' });
                          throttledLibraryClick();
                        }}
                      >
                        <p className='whitespace-nowrap bg-inherit text-base text-[#252641] lg:text-[18px]'>
                          Nữ
                        </p>
                      </div>
                      <div
                        className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                          userProfile.gender === 'Khác' && 'bg-[#E3F2FD]'
                        }`}
                        onClick={() => {
                          setUserProfile({ ...userProfile, gender: 'Khácu4' });
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
                  <div
                    className={`black-placeholder mt-2 w-[60%] rounded-[10px] md:w-[28%] ${
                      isEditMode
                        ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                        : 'bg-[#D9D9D9]'
                    } p-4 text-xl text-[#252641]`}
                  >
                    {demoUserProfile.gender}
                  </div>
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
                  disabled={!isEditMode}
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
                  placeholder={userProfile.phone}
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className={`black-placeholder mt-2 w-full rounded-[10px] md:w-[70%] ${
                    isEditMode
                      ? 'border-[1px] border-[#D9D9D9] hover:border-[#4285f4]'
                      : 'bg-[#D9D9D9]'
                  } p-4 text-xl text-[#252641]`}
                />
              </div>
            </form>
            {isEditMode && (
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setSuccessSnackbar(true);
                }}
                className='mt-8 w-fit rounded-[12px] bg-[#4285f4] py-3 px-6 text-xl font-semibold text-white hover:bg-[#4285f4]/[.7]'
              >
                Cập nhật
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default UserInformation;
