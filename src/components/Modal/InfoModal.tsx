import './InfoModal.css';

import { Dialog, Transition } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { some } from 'lodash';
import { Fragment, FC, useState, Dispatch, SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Select } from '..';
import UserService from '../../service/user.service';
import useBoundStore from '../../store';
import { User } from '../../types';

const InfoModal: FC<{
  isOpen: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  register: () => void;
}> = ({ isOpen, handleOpen, register }) => {
  const user = useBoundStore.use.user();
  const [userProfile, setUserProfile] = useState<User>(user);

  const getUserProfile = useBoundStore.use.getUserProfile();

  const navigate = useNavigate();

  const { mutateAsync: updateProfile, isLoading } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async () => {
      await UserService.editUserProfile(userProfile);
    },
    onSuccess: () => {
      getUserProfile();
    },
  });

  const handleUpdate = async () => {
    try {
      if (!isDisabled) {
        handleOpen(false);
        await updateProfile();

        setTimeout(async () => {
          handleOpen(true);
        }, 500);
      } else {
        let message = '';

        if (String(userProfile.familyAndMiddleName) === '') {
          message += 'Họ và tên lót, ';
        }
        if (String(userProfile.givenName) === '') {
          message += 'Tên, ';
        }
        if (
          String(userProfile.studentId) === '' ||
          !new RegExp(/^[0-9]{7}$/).test(userProfile.studentId)
        ) {
          message += 'Mã số sinh viên, ';
        }
        if (String(userProfile.major) === '') {
          message += 'Khoa, ';
        }
        if (userProfile.dateOfBirth === 0) {
          message += 'Ngày sinh, ';
        }
        if (String(userProfile.gender) === '') {
          message += 'Giới tính, ';
        }
        if (
          String(userProfile.phoneNumber) === '' ||
          !new RegExp(/^[0-9]{10}$/).test(userProfile.phoneNumber)
        ) {
          message += 'Số điện thoại, ';
        }

        message = message.slice(0, -2);

        toast.error('Vui lòng điền đầy đủ thông tin vào các trường sau: ' + message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        handleOpen(false);
      }
    }
  };

  const handleRegister = async () => {
    try {
      handleOpen(false);
      await register();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
        handleOpen(false);
      }
    }
  };

  const isEnoughInfo = useMemo(
    () =>
      !some(user, (value, key) => {
        if (
          key === 'email' ||
          key === 'picture' ||
          key === 'googleId' ||
          key === 'accessLevels' ||
          key === 'isManager'
        ) {
          return false;
        }

        return String(value) === '';
      }),
    [user]
  );

  const isDisabled = useMemo(
    () =>
      some(userProfile, (value, key) => {
        if (
          key === 'email' ||
          key === 'picture' ||
          key === 'googleId' ||
          key === 'accessLevels' ||
          key === 'isManager'
        ) {
          return false;
        }

        if (key === 'studentId' && !new RegExp(/^[0-9]{7}$/).test(userProfile.studentId)) {
          return true;
        } else if (
          key === 'phoneNumber' &&
          !new RegExp(/^[0-9]{10}$/).test(userProfile.phoneNumber)
        ) {
          return true;
        }

        return String(value) === '';
      }),
    [userProfile]
  );

  const formattedDate = new Date(userProfile?.dateOfBirth || '2000-01-01')
    .toISOString()
    .split('T')[0];

  const genderOptions = [
    {
      value: 'MALE',
      label: 'Nam',
    },
    {
      value: 'FEMALE',
      label: 'Nữ',
    },
    {
      value: 'OTHER',
      label: 'Khác',
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => {
          setUserProfile(user);
          handleOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='text-center text-2xl font-semibold leading-normal'>
                  Thông tin thí sinh
                </Dialog.Title>
                <Dialog.Description className='mt-2 text-justify text-base text-[#696984]' as='p'>
                  {isEnoughInfo
                    ? 'Vui lòng kiểm tra lại thông tin trước khi hoàn tất đăng ký.'
                    : 'Vui lòng điền vào các thông tin bên dưới để hoàn tất đăng ký.'}
                </Dialog.Description>

                <form className='mt-3 flex flex-col'>
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
                      disabled={isEnoughInfo}
                      placeholder={userProfile.familyAndMiddleName}
                      value={userProfile.familyAndMiddleName}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, familyAndMiddleName: e.target.value })
                      }
                      className='black-placeholder mt-2 w-full rounded-[10px] border-[1px] border-[#D9D9D9] px-4 py-3 text-xl 
                      md:w-[70%]'
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
                      disabled={isEnoughInfo}
                      id='firstname'
                      name='firstname'
                      placeholder={userProfile.givenName}
                      value={userProfile.givenName}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, givenName: e.target.value })
                      }
                      className='black-placeholder ${ mt-2 w-full rounded-[10px] border-[1px]
                      border-[#D9D9D9] px-4 py-3
                      text-xl  md:w-[70%]'
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
                      disabled={isEnoughInfo}
                      id='studentId'
                      name='studentId'
                      placeholder={userProfile.studentId}
                      value={userProfile.studentId}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, studentId: e.target.value })
                      }
                      className='black-placeholder mt-2 w-full rounded-[10px] border-[1px]
                      border-[#D9D9D9] px-4 py-3 text-xl  md:w-[70%]'
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
                      disabled={isEnoughInfo}
                      id='major'
                      name='major'
                      value={userProfile.major}
                      placeholder={userProfile.major}
                      onChange={(e) => setUserProfile({ ...userProfile, major: e.target.value })}
                      className='black-placeholder mt-2 w-full rounded-[10px] border-[1px] border-[#D9D9D9] px-4 py-3 
                      text-xl  md:w-[70%]'
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
                      disabled={isEnoughInfo}
                      name='birthday'
                      value={userProfile?.dateOfBirth ? formattedDate : ''}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          dateOfBirth: new Date(e.target.value).getTime(),
                        })
                      }
                      className='black-placeholder mt-2 w-full rounded-[10px] border-[1px] border-[#D9D9D9] px-4 py-3 
                      text-xl  md:w-[70%]'
                    />
                  </div>
                  <div
                    id='gender-selection'
                    className='flex flex-col md:mt-2 md:flex-row md:items-center'
                  >
                    <label
                      htmlFor='gender'
                      className='mt-4 text-xl font-semibold text-[#5B5B5B] md:w-[30%]'
                    >
                      Giới tính
                    </label>
                    <Select
                      options={genderOptions}
                      value={
                        genderOptions.find((option) => option.value === userProfile.gender) || null
                      }
                      onChange={(option) => {
                        setUserProfile({ ...userProfile, gender: option?.value || '' });
                      }}
                      isDisabled={isEnoughInfo}
                      placeholder='Chọn giới tính'
                      className='mt-2'
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
                      disabled={isEnoughInfo}
                      type='text'
                      id='phone'
                      name='phone'
                      placeholder={userProfile.phoneNumber}
                      value={userProfile.phoneNumber}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, phoneNumber: e.target.value })
                      }
                      className='black-placeholder mt-2 w-full rounded-[10px] border-[1px]
                      border-[#D9D9D9] px-4 py-3 text-xl  md:w-[70%]'
                    />
                  </div>
                </form>

                <div className='mt-4 flex w-full flex-row items-center justify-end gap-x-6'>
                  <button
                    type='button'
                    className={`inline-flex justify-center rounded-md border border-transparent
                    px-4 py-2 focus:outline-none disabled:bg-[#B3B3B3] ${
                      isEnoughInfo
                        ? 'bg-transparent hover:bg-transparent'
                        : 'bg-[#DB4437]/80 hover:bg-[#DB4437]'
                    }`}
                    disabled={isLoading}
                    onClick={() => {
                      isEnoughInfo ? navigate('/profile') : setUserProfile(user);
                      handleOpen(false);
                    }}
                  >
                    <p
                      className={`text-base font-semibold ${
                        isEnoughInfo ? 'text-inherit' : 'text-white'
                      }`}
                    >
                      {isEnoughInfo ? 'Chỉnh sửa' : 'Huỷ'}
                    </p>
                  </button>
                  <button
                    type='button'
                    className={`inline-flex justify-center rounded-md border border-transparent 
                    px-4 py-2 focus:outline-none disabled:bg-[#B3B3B3] ${
                      isEnoughInfo
                        ? 'bg-[#0F9D58]/80 hover:bg-[#0F9D58]'
                        : 'bg-[#4285F4]/80 hover:bg-[#4285F4]'
                    }`}
                    onClick={isEnoughInfo ? handleRegister : handleUpdate}
                    disabled={isLoading}
                  >
                    <p className='text-base font-semibold text-white'>
                      {isEnoughInfo ? 'Đăng ký' : 'Cập nhật'}
                    </p>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;
