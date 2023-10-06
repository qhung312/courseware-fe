import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  return (
    <>
      <LargeHeader />
      <MediumHeader />
      <div className='mb-[72px] md:mb-[110.6px] xl:mb-[149px]'></div>
    </>
  );
};

export default Header;
