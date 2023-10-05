import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  return (
    <>
      <LargeHeader />
      <MediumHeader />
      <div className='mb-[72px] md:mb-[102.6px] xl:mb-[103px]'></div>
    </>
  );
};

export default Header;
