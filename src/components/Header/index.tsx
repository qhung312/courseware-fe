import { ReactComponent as LargeLogoCTCT } from '../../assets/svgs/LargeLogoCTCT.svg';
import Icon from '../Icon';

import MediumHeader from './MediumHeader';

const Options = ({ title, color }: { title: string; color: string }) => (
  <>
    <p className='bg-inherit mr-[8px] text-[20px]' style={{ color }}>
      {title}
    </p>
    <button type='button' className='w-[11px]'>
      <Icon.ChevronDown fill={color} />
    </button>
  </>
);

const Header = () => {
  return (
    <>
      <header className='hidden md:flex flex-column flex-wrap fixed w-[100vw]'>
        <div
          className='flex flex-row justify-between items-center w-[100%]
          px-[24px] py-[16px] 2xl:px-[32px] 2xl:py-[24px]'
        >
          <LargeLogoCTCT />
          <div className='flex flex-row gap-x-[52px]'>
            <div className='flex flex-row items-center relative'>
              <input
                className='bg-inherit rounded-[40px] border border-[#49BBBD] py-[8px]
                pl-[20px] pr-[60px]
                w-[400px]'
              />
              <button type='button' className='w-[20px] absolute right-[20px]'>
                <Icon.Search className='w-[20px]' />
              </button>
            </div>
            <button className='flex flex-row justify-center items-center'>
              <div className='rounded-[999px] bg-[#979797] h-[40px] w-[40px] mr-[16px]' />
              <Options title='User' color='black' />
            </button>
          </div>
        </div>
        <div
          className='bg-[#E3F2FD] flex flex-row justify-start items-center w-[100%]
          px-[24px] py-[16px] 2xl:px-[32px] 2xl:py-[24px]'
        >
          <Options title='Trang chủ' color='black' />
        </div>
      </header>
      <MediumHeader />
    </>
  );
};

export default Header;
