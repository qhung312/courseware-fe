import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import IntroductionImage from '../../assets/images/IntroductionPic.jpg';
import { Footer } from '../../components';

const AboutUs = () => {
  return (
    <>
      <main className='w-full'>
        <section className='container space-y-8 py-8 px-5 md:px-7 lg:px-0'>
          <div className='md:hidden'>
            <h1 className='text-center text-[28px] font-bold'>CHÚNG TA CÙNG TIẾN</h1>
            <h3 className='text-center text-xl font-semibold italic opacity-50'>
              We Learn - We Share
            </h3>
          </div>
          <div className='relative p-3 sm:p-4 md:p-0'>
            <div className='absolute top-0 left-0 z-0 aspect-square w-[52px] rounded-lg bg-[#4285F4] sm:w-[72px] md:-top-4 md:-left-4 md:w-24 md:rounded-xl lg:-top-5 lg:-left-5 lg:w-32 xl:-top-6 xl:-left-6 xl:w-40 xl:rounded-2xl 2xl:-top-8 2xl:-left-8 2xl:w-52 2xl:rounded-3xl' />
            <div className='absolute bottom-0 right-0 z-0 aspect-square w-[90px] rounded-lg bg-[#A0C3FF] sm:w-[72px] md:-bottom-4 md:-right-4 md:w-32 md:rounded-xl lg:-bottom-5 lg:-right-5 lg:w-40 xl:-bottom-6 xl:-right-6 xl:w-52 xl:rounded-2xl 2xl:-bottom-8 2xl:-right-8 2xl:w-64 2xl:rounded-3xl' />
            <div className='absolute -bottom-8 left-0 z-0 aspect-square w-[20px] rounded-full bg-[#A0C3FF]  md:-left-6 md:-bottom-16 md:w-8 lg:-bottom-20 lg:w-10 xl:-bottom-24 xl:w-12 2xl:-bottom-32 2xl:w-16' />
            <img
              className='relative z-[1] aspect-[360/200] rounded-lg object-cover md:rounded-xl xl:rounded-2xl 2xl:rounded-3xl'
              src={IntroductionImage}
              alt='introduction_pic'
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
