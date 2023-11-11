import { FC } from 'react';

import { Icon } from '..';
import useBoundStore from '../../store';

const LoginButton: FC = () => {
  const loginWithGoogle = useBoundStore.use.loginWithGoogle();

  return (
    <button
      type='button'
      onClick={loginWithGoogle}
      className='relative flex w-full cursor-pointer flex-row items-center justify-start gap-x-8 rounded-3xl bg-white px-10 py-4 text-[#4284F4]
      shadow-[0_1px_1px_0_rgba(47,50,125,0.1)] transition-all duration-300 hover:shadow-[0_4px_4px_0_rgba(47,50,125,0.2)] 
      md:w-fit md:px-6 md:py-3'
    >
      <div className='h-7 3xl:h-8'>
        <Icon.LogoGoogle className='h-full w-auto overflow-visible' />
      </div>
      <p className='whitespace-nowrap text-center text-lg font-semibold text-inherit lg:text-xl 3xl:text-2xl'>
        Đăng nhập với Google
      </p>
    </button>
  );
};

export default LoginButton;
