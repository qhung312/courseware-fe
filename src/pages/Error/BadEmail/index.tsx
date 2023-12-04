import { FC } from 'react';

import { ReactComponent as BadRequestVector } from '../../../assets/svgs/BadRequest.svg';
import { Page } from '../../../layout';

const BadEmail: FC = () => {
  return (
    <Page title='Email không hợp lệ'>
      <div className='flex h-full w-full flex-col items-center justify-center overflow-hidden'>
        <BadRequestVector className='h-fit w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px]' />
        <div
          className='mt-10 w-[300px] md:mt-[60px] md:w-[400px] lg:mt-20 lg:w-[500px] 
          xl:mt-[100px] xl:w-[600px] 2xl:mt-[120px] 2xl:w-[700px]'
        >
          <h1 className='text-center text-3xl font-bold text-[#DB4437]'>Email không hợp lệ</h1>
          <p className='mt-6 text-center text-xl text-[#696984]'>
            Vui lòng sử dụng email <span className='font-bold'>@hcmut.edu.vn</span> để đăng nhập
          </p>
        </div>
      </div>
    </Page>
  );
};

export default BadEmail;
