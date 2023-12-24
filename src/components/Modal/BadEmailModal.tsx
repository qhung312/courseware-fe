import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import useBoundStore from '../../store';

const BadEmailModal: FC = () => {
  const isOpen = useBoundStore.use.isBadEmailModalOpen();
  const closeBadEmailModal = useBoundStore.use.closeBadEmailModal();
  const logout = useBoundStore.use.logout();
  const navigate = useNavigate();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeBadEmailModal}>
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
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all'>
                <div className='relative flex w-full flex-col items-center gap-y-6 p-6'>
                  <div className='relative leading-snug'>
                    <Dialog.Title as='h3' className='text-center text-2xl font-semibold'>
                      Tài khoản không hợp lệ
                    </Dialog.Title>
                    <Dialog.Description className='text-base/snug mt-3 text-justify' as='p'>
                      Vui lòng sử dụng email đuôi <span className='font-bold'>@hcmut.edu.vn</span>{' '}
                      để đăng nhập
                    </Dialog.Description>
                  </div>

                  <button
                    className='text-base/snug rounded-lg bg-[#DB4437]/80 px-6 py-3 font-bold text-white 
                    hover:bg-[#DB4437]'
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Đăng Xuất
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

export default BadEmailModal;
