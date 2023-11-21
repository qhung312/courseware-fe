// import LHOTTTPlaceHolder from '../../../../assets/images/LHOT-placeholder.jpg';
import { useEffect } from 'react';

import DevelopmentIllustration from '../../../../assets/images/DevelopmentIllustration.png';
import GTTSTT from '../../../../assets/images/GTTSTT.png';
import OriginIllustration from '../../../../assets/images/OriginIllustration.png';
import TSTTPlaceHolder from '../../../../assets/images/TSTT-placeholder.jpg';
import TSTT from '../../../../assets/images/TSTT.jpg';
import { Footer, Icon, LazyLoadImage } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';

const TSTTPage = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const stub = document.getElementById('stub') as HTMLElement;
    const navbar = document.getElementById('navbar') as HTMLElement;

    stub.style.marginBottom = `${navbar.clientHeight}px`;
  }, [width]);

  return (
    <Page title='Hoạt động'>
      <main className='with-nav-height flex flex-col gap-y-5 overflow-y-auto lg:gap-y-10 2xl:gap-y-[54px] 3xl:gap-y-[60px]'>
        <div className='w-full'>
          <LazyLoadImage
            className='z-[1] block aspect-[52/25] md:aspect-[4/1]'
            src={TSTT}
            placeHolderSrc={TSTTPlaceHolder}
            alt='tstt_alt'
            objectFit='cover'
          />
        </div>
        <div className='mb-16 flex w-full flex-col gap-y-0 px-5 md:gap-y-12 md:px-[48px] lg:mb-24 lg:gap-y-20 lg:px-24 2xl:mb-32 2xl:gap-y-24 2xl:px-32 3xl:mb-36 3xl:gap-y-28 3xl:px-40'>
          <div className='flex w-full flex-col items-start justify-center gap-y-7 md:gap-y-0'>
            <h1 className='text-start text-[28px] font-bold text-[#2F327D] md:text-[24px] md:text-2xl md:text-[#2F327D] lg:text-3xl xl:text-4xl 2xl:text-5xl'>
              TIẾP SỨC TỚI TRƯỜNG
            </h1>
            <div className='flex w-full flex-col items-center justify-center gap-y-5 md:flex-row md:items-start md:justify-between md:gap-y-8'>
              <div className='flex w-full flex-col justify-center gap-2 md:w-[38%] lg:gap-3 xl:gap-4'>
                <div className='w-full space-y-3 md:mt-[10%] md:space-y-4 xl:space-y-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Giới thiệu
                  </h2>
                  <p className='text-start text-[16px] text-[#696984] md:text-[14px] lg:text-[18px] 2xl:text-[22px]'>
                    Chương trình <span className='font-bold'>Tiếp sức tới trường</span> là hoạt động
                    thường niên được tổ chức vào đầu năm học, nhằm hỗ trợ các bạn Tân sinh viên hội
                    nhập với môi trường mới.
                  </p>
                </div>
              </div>
              <div className='relative mb-8 max-w-[100%] flex-1  md:mb-0 md:max-w-[45%]'>
                <LazyLoadImage
                  className='z-[1] block aspect-[360/200] rounded-[20px]'
                  src={GTTSTT}
                  placeHolderSrc={GTTSTT}
                  alt='scttm_alt'
                  objectFit='cover'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-[54px] md:gap-y-8 lg:gap-y-10 2xl:gap-y-12 3xl:gap-y-[60px]'>
            <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
              Hình thành và Phát triển
            </h2>
            <div className='flex w-full justify-start'>
              <div className='flex h-fit w-full flex-col justify-between rounded-[20px] bg-transparent shadow-xl md:w-[64%] md:flex-row md:overflow-x-hidden'>
                <div className='relative h-fit w-full items-start px-4 md:flex md:flex-row md:gap-x-3 lg:gap-x-5 lg:px-6 2xl:gap-x-7 2xl:px-8 3xl:px-9'>
                  {width > 768 ? (
                    <div className='flex w-fit items-start py-4 lg:py-6 2xl:py-8 3xl:py-9'>
                      <div className='flex aspect-square items-center justify-center rounded bg-[#00CBB8]/30 md:h-12 lg:h-16 2xl:h-20 3xl:h-[90px]'>
                        <Icon.OriginIcon className='z-[1] aspect-square w-[45%] fill-[#00CBB8]/90' />
                      </div>
                    </div>
                  ) : (
                    <div className='absolute top-0 left-0 flex aspect-square w-[56px] translate-x-[28%] translate-y-[-50%] items-center justify-center rounded-[10px] bg-[#00CBB8]'>
                      <Icon.OriginIcon className='z-[1] aspect-square w-[60%] fill-white' />
                    </div>
                  )}
                  <div className='flex h-full w-full items-start bg-transparent py-3 pt-9 md:pt-0 lg:py-4 2xl:py-6 3xl:py-7'>
                    <p className='text-[16px] font-normal leading-7 text-[#696984] md:leading-6 lg:text-xl lg:leading-8 2xl:text-[22px] 2xl:leading-10 3xl:text-[24px]'>
                      Chương trình được khởi động từ những năm 2015 - 2016, với các hoạt động tiêu
                      biểu như các buổi chia sẻ phương pháp học tập,{' '}
                      <span>
                        {width < 768 || width > 1528
                          ? 'định hướng phát triển cho Tân sinh viên của từng khóa.'
                          : '...'}{' '}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='h-full w-full rounded-none p-0 md:h-auto md:w-[40%]'>
                  <LazyLoadImage
                    className='z-[1] block h-full rounded-b-[20px] md:rounded-none'
                    src={OriginIllustration}
                    placeHolderSrc={OriginIllustration}
                    alt='scttm_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
            </div>
            <div className='flex w-full justify-end'>
              <div className='flex h-fit w-full flex-col justify-between rounded-[20px] bg-transparent shadow-xl md:w-[75%] md:translate-x-[4%] md:flex-row md:overflow-x-hidden'>
                <div className='relative h-fit w-full items-start px-4 md:flex md:flex-row md:gap-x-3 lg:gap-x-5 lg:px-6 2xl:gap-x-7 2xl:px-8 3xl:px-9'>
                  {width > 768 ? (
                    <div className='flex w-fit items-start py-4 lg:py-6 2xl:py-8 3xl:py-9'>
                      <div className='flex aspect-square items-center justify-center rounded bg-[#00CBB8]/30 md:h-12 lg:h-16 2xl:h-20 3xl:h-[90px]'>
                        <Icon.DevelopmentIcon className='z-[1] aspect-square w-[45%] fill-[#00CBB8]/90' />
                      </div>
                    </div>
                  ) : (
                    <div className='absolute top-0 left-[100%] flex aspect-square w-[56px] translate-x-[-128%] translate-y-[-50%] items-center justify-center rounded-[10px] bg-[#00CBB8]'>
                      <Icon.DevelopmentIcon className='z-[1] aspect-square w-[60%] fill-white' />
                    </div>
                  )}
                  <div className='flex h-fit w-full items-start bg-transparent py-3 pt-9 md:pt-0 lg:py-4 2xl:py-6 3xl:py-7'>
                    <p className='text-[16px] font-normal leading-7 text-[#696984] md:leading-5 lg:text-lg lg:leading-7 2xl:text-[22px] 2xl:leading-9 3xl:text-[22px]'>
                      Chương trình tiếp tục phát triển và nhân rộng quy mô với hoạt động Hỗ trợ các
                      bạn Tân sinh viên di chuyển và làm quen với Ký túc xá Đại học Quốc gia trong
                      những ngày đầu đặt chân đến Thành phố.
                      <span>
                        {width < 768 ||
                          (width > 1528 &&
                            'Điều này giúp các bạn và phụ huynh tiết kiệm thời gian và công sức vì những điều mới lạ trong quá trình nhập học.')}
                      </span>
                    </p>
                  </div>
                </div>
                <div className='h-full w-full p-0 md:h-auto md:w-[45%]'>
                  <LazyLoadImage
                    className='z-[1] block rounded-b-[20px] p-0 md:h-auto md:w-full md:rounded-none '
                    src={DevelopmentIllustration}
                    placeHolderSrc={DevelopmentIllustration}
                    alt='scttm_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default TSTTPage;
