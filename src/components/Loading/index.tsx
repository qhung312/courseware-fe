import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties } from 'react';

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

  return (
    <div
      className='flex justify-center items-center fixed z-[10000000] bg-white
      w-[100vw] h-[100vh]'
    >
      {View}
    </div>
  );
};

export default Loading;
