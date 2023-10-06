import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  return (
    <>
      <LargeHeader />
      <MediumHeader />
      <div className='h-[72px] md:h-[103px] xl:h-[133px]'></div>
    </>
  );
};

export default Header;
