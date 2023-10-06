import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  return (
    <>
      <LargeHeader />
      <MediumHeader />
      <div className='h-[72px] md:h-[110.6px] xl:h-[111px]' />
    </>
  );
};

export default Header;
