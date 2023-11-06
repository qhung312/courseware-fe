import Lottie from 'lottie-react';
import { FC } from 'react';

import { Page } from '../../layout';

const ComingSoon: FC = () => {
  return (
    <Page title='Coming soon...'>
      <Lottie
        animationData={require('../../assets/animations/ComingSoon.json')}
        autoPlay
        loop
        className='m-20'
      />
    </Page>
  );
};

export default ComingSoon;
