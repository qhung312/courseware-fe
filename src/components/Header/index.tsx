import { useEffect } from 'react';

import { useWindowDimensions } from '../../hooks';

import LargeHeader from './LargeHeader';
import MediumHeader from './MediumHeader';

const Header = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const stub = document.getElementById('stub') as HTMLElement;
    const navbar = document.getElementById('navbar') as HTMLElement;

    stub.style.marginBottom = `${navbar.clientHeight}px`;
  }, [width]);

  return (
    <>
      <header id='navbar' className='fixed top-0 z-50 w-full'>
        {width < 768 ? <MediumHeader /> : <LargeHeader />}
      </header>
      <div id='stub' />
    </>
  );
};

export default Header;
