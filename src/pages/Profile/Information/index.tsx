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
  const [currentOption, setCurrentOption] = useState(3);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [userLastName, setUserLastName] = useState(demoUserProfile.lastname);
  const [userFirstName, setUserFirstName] = useState(demoUserProfile.firstname);
  const [userStudentId, setUserStudentId] = useState(demoUserProfile.studentId);
  const [userMajor, setUserMajor] = useState(demoUserProfile.major);
  const [userBirthday, setUserBirthday] = useState(demoUserProfile.birthday);
  const [userGender, setUserGender] = useState(demoUserProfile.gender);
  const [userEmail, setUserEmail] = useState(demoUserProfile.email);
  const [userPhone, setUserPhone] = useState(demoUserProfile.phone);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const onLibraryClick = () => {
    setIsGenderOpen(!isGenderOpen);
  };

  const throttledLibraryClick = useThrottle(onLibraryClick);

  return (
    <Page title='Thông tin người dùng - Thống kê điểm số'>
      <div className='fixed bottom-4 right-4 z-[60]'>
        <SuccessSnackbar showSnackbar={successSnackbar} setShow={() => setSuccessSnackbar(false)} />
      </div>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={currentOption} setOption={(opt) => setCurrentOption(opt)} />
        <div className='relative bg-white px-5 pt-4 pb-[64px] md:flex md:flex-col md:pt-10 lg:px-[60px]'>
          <h1 className='text-2xl font-semibold text-[#2252641] md:text-center lg:text-[28px] 3xl:text-[36px]'>
            Thông tin của Nguyễn Văn A
          </h1>
          {isEditMode ? (
            <p className='mb-8 text-xl font-semibold text-[#5B5B5B]'>Cập nhật thông tin</p>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className='mt-3 mb-5 flex w-fit gap-x-1 rounded-[12px] bg-[#E3F2FD] px-3 py-2'
            >
              <Icon.PencilIcon fill='#252641' />
              <p className='font-semibold text-[#252641]'>Chỉnh sửa thông tin</p>
            </button>
          )}
          <form className='flex flex-col'>
            <label htmlFor='lastname&middlename' className='text-xl font-semibold text-[#5B5B5B]'>
              Họ và tên lót
            </label>
            <input
              type='text'
              id='lastname&middlename'
              name='lastname&middlename'
              disabled={!isEditMode}
              placeholder={userLastName}
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='firstname' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Tên
            </label>
            <input
              type='text'
              id='firstname'
              name='firstname'
              disabled={!isEditMode}
              placeholder={userFirstName}
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='studentId' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Mã số sinh viên
            </label>
            <input
              type='text'
              id='studentId'
              name='studentId'
              disabled={!isEditMode}
              placeholder={userStudentId}
              value={userStudentId}
              onChange={(e) => setUserStudentId(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='major' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Khoa
            </label>
            <input
              type='text'
              id='major'
              name='major'
              disabled={!isEditMode}
              value={userMajor}
              placeholder={userMajor}
              onChange={(e) => setUserMajor(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='birthday' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Ngày sinh
            </label>
            <input
              type='date'
              id='birthday'
              name='birthday'
              disabled={!isEditMode}
              placeholder={userBirthday}
              value={userBirthday}
              onChange={(e) => setUserBirthday(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='gender' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Giới tính
            </label>
            {isEditMode ? (
              <div className='relative mt-2'>
                <button
                  type='button'
                  className='z-20 flex w-[60%] flex-row items-center justify-between rounded-[10px] border-[1px] border-[#D9D9D9] p-4'
                  onClick={throttledLibraryClick}
                >
                  <p className='text-xl text-[#252641] transition-colors duration-300 ease-linear'>
                    {userGender}
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
            transition-all duration-300'
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
                      userGender === 'Nam' && 'bg-[#E3F2FD]'
                    }`}
                    onClick={() => {
                      setUserGender('Nam');
                      throttledLibraryClick();
                    }}
                  >
                    <p className='whitespace-nowrap bg-inherit text-base text-[#252641]'>Nam</p>
                  </div>
                  <div
                    className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                      userGender === 'Nữ' && 'bg-[#E3F2FD]'
                    }`}
                    onClick={() => {
                      setUserGender('Nữ');
                      throttledLibraryClick();
                    }}
                  >
                    <p className='whitespace-nowrap bg-inherit text-base text-[#252641]'>Nữ</p>
                  </div>
                  <div
                    className={`w-full px-4 py-1 text-start hover:bg-[#F2F2F2] ${
                      userGender === 'Khác' && 'bg-[#E3F2FD]'
                    }`}
                    onClick={() => {
                      setUserGender('Khác');
                      throttledLibraryClick();
                    }}
                  >
                    <p className='whitespace-nowrap bg-inherit text-base text-[#252641]'>Khác</p>
                  </div>
                </nav>
              </div>
            ) : (
              <div
                className={`black-placeholder mt-2 w-[60%] rounded-[10px] ${
                  isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
                } p-4 text-xl text-[#252641]`}
              >
                {demoUserProfile.gender}
              </div>
            )}
            <label htmlFor='email' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              disabled={!isEditMode}
              placeholder={userEmail}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
            <label htmlFor='phone' className='mt-4 text-xl font-semibold text-[#5B5B5B]'>
              Số điện thoại
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              disabled={!isEditMode}
              placeholder={userPhone}
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className={`black-placeholder mt-2 w-full rounded-[10px] ${
                isEditMode ? 'border-[1px] border-[#D9D9D9]' : 'bg-[#D9D9D9]'
              } p-4 text-xl text-[#252641]`}
            />
          </form>
          {isEditMode && (
            <button
              onClick={() => {
                setIsEditMode(false);
                setSuccessSnackbar(true);
              }}
              className='mt-8 w-fit rounded-[12px] bg-[#4285f4] py-3 px-6 text-xl font-semibold text-white'
            >
              Cập nhật
            </button>
          )}
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default UserInformation;
