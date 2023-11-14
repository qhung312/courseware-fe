import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FC, SetStateAction, Dispatch } from 'react';

const FinishModal: FC<{
  isOpen: boolean;
  handleOpen: Dispatch<SetStateAction<boolean>>;
  accept: () => void;
  cancel: () => void;
}> = ({ isOpen, handleOpen, accept, cancel }) => {
  function closeModal() {
    handleOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
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
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='text-xl font-semibold leading-6'>
                  Bạn có chắc chắn muốn hoàn thành bài làm?
                </Dialog.Title>

                <div className='mt-4 flex flex-row items-center justify-between'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-[#4285F4]/80 
                    px-4 py-2  hover:bg-[#4285F4] focus:outline-none'
                    onClick={accept}
                  >
                    <p className='text-base font-semibold text-white'>Yes</p>
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-[#DB4437]/80 
                    px-4 py-2  hover:bg-[#DB4437] focus:outline-none'
                    onClick={cancel}
                  >
                    <p className='text-base font-semibold text-white'>No</p>
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

export default FinishModal;
