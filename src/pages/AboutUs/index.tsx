import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import IntroductionImage from '../../assets/images/IntroductionPic.jpg';
import { Footer } from '../../components';

const AboutUs = () => {
  return (
    <>
      <main className='w-full'>
        <section className='container flex flex-col items-center justify-center space-y-8 py-8 px-5 md:px-7 lg:px-0'>
          <div className='z-[2] lg:absolute lg:text-white'>
            <h1 className='text-center text-[28px] font-bold md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'>
              CHÚNG TA CÙNG TIẾN
            </h1>
            <h3 className='text-center text-xl font-semibold italic opacity-50 lg:text-2xl xl:text-3xl 2xl:text-4xl'>
              We Learn - We Share
            </h3>
          </div>
          <div className='relative p-3 sm:p-4 md:p-0'>
            <div className='absolute top-0 left-0 z-0 aspect-square w-[52px] rounded-lg bg-[#4285F4] sm:w-[72px] md:w-24 md:rounded-xl lg:w-32 xl:w-40 xl:rounded-2xl 2xl:w-52 2xl:rounded-3xl' />
            <div className='absolute bottom-0 right-0 z-0 aspect-square w-[90px] rounded-lg bg-[#A0C3FF] sm:w-[72px]  md:w-32 md:rounded-xl lg:w-40 xl:w-52 xl:rounded-2xl 2xl:w-64 2xl:rounded-3xl' />
            <div className='absolute -bottom-8 left-0 z-0 aspect-square w-[20px] rounded-full bg-[#A0C3FF]  md:-left-6 md:-bottom-16 md:w-8 lg:-bottom-20 lg:w-10 xl:-bottom-24 xl:w-12 2xl:-bottom-32 2xl:w-16' />
            <div className='relative overflow-hidden md:p-4 lg:p-5 xl:p-6 2xl:p-8'>
              <img
                className='z-[1] block aspect-[360/200] rounded-lg object-cover md:rounded-xl lg:brightness-[50%] xl:rounded-2xl 2xl:rounded-3xl'
                src={IntroductionImage}
                alt='introduction_pic'
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
