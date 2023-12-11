import { useWindowDimensions } from '../../hooks';

import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <header id='navbar' className='fixed top-0 z-50 w-full'>
        {width < 768 ? <MediumHeader /> : <LargeHeader />}
      </header>
    </>
  );
};

export default Header;
