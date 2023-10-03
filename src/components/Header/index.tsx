import { ReactComponent as ChevronDownIcon } from '../../assets/svgs/ChevronDownIcon.svg';
import { ReactComponent as LogoCTCT } from '../../assets/svgs/LogoCTCT.svg';
import { ReactComponent as LogoGDSC } from '../../assets/svgs/LogoGDSC.svg';
import { ReactComponent as SearchIcon } from '../../assets/svgs/SearchIcon.svg';

const Options = ({ title, color }: { title: string; color: string }) => (
  <>
    <p className='bg-inherit mr-[8px] text-[20px]' style={{ color }}>
      {title}
    </p>
    <button type='button' className='w-[0.6vw] min-w-[11px]'>
      <ChevronDownIcon fill={color} />
    </button>
  </>
);

const Header = () => {
  return (
    <header className='m-[1.5vw]'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-x-[1.6vw] justify-center items-center h-[100%] w-[20vw] min-w-[200px]'>
          <LogoCTCT />
          <LogoGDSC />
        </div>
        <div className='flex flex-row-reverse w-[30vw] min-w-[200px] rounded-[40px] border border-[#49BBBD] px-[16px] py-[12px]'>
          <SearchIcon />
        </div>
        <div className='flex flex-row justify-center items-center'>
          <div className='rounded-[999px] bg-[#979797] h-[4vw] w-[4vw] min-h-[32px] min-w-[32px] max-h-[48px] max-w-[48px] mr-[20px]' />
          <Options title='User' color='black' />
        </div>
      </div>
    </header>
  );
};

export default Header;
