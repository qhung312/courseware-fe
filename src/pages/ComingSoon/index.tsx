import Lottie from 'lottie-react';
import { FC } from 'react';

import { Page } from '../../layout';

const ComingSoon: FC = () => {
  return (
    <Page title='Coming soon...'>
      <div className='with-nav-height flex items-center justify-center px-20'>
        <Lottie
          animationData={require('../../assets/animations/ComingSoon.json')}
          autoPlay
          loop
          className='md:w-[70vw]'
        />
      </div>
    </Page>
  );
};

export default ComingSoon;
