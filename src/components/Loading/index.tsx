import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties, useEffect, useState } from 'react';

const Loading = () => {
  const style: CSSProperties = {
    height: 'auto',
    width: '50vw',
    aspectRatio: 1,
  };
  const options: LottieOptions<'svg'> = {
    animationData: require('../../assets/animations/Loading.json'),
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show ? (
    <div
      className='flex justify-center items-center fixed z-[10000000] bg-white
      w-[100vw] h-[100vh]'
    >
      {View}
    </div>
  ) : null;
};

export default Loading;
