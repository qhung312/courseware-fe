import { FC } from 'react';

import { Icon } from '..';
import useBoundStore from '../../store';

const LoginButton: FC = () => {
  const loginWithGoogle = useBoundStore.use.loginWithGoogle();

  return (
    <button
      type='button'
      onClick={loginWithGoogle}
      className='relative flex w-fit cursor-pointer flex-row items-center justify-between gap-x-6 rounded-lg border border-[#CCC] bg-white px-8
      py-3 shadow-[0_1px_1px_0_rgba(47,50,125,0.1)] transition-all duration-300 
      hover:shadow-[0_4px_4px_0_rgba(47,50,125,0.2)] md:w-fit md:px-6 md:py-2 3xl:py-3'
    >
      <div className='h-7 md:h-4 lg:h-5 3xl:h-6'>
        <Icon.LogoGoogle className='h-full w-auto overflow-visible' />
      </div>
      <p className='whitespace-nowrap text-center text-lg font-medium md:text-xs lg:text-sm 3xl:text-base'>
        Đăng nhập
      </p>
    </button>
  );
};

export default LoginButton;
