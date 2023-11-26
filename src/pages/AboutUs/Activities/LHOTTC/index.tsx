// import LHOTTTPlaceHolder from '../../../../assets/images/LHOT-placeholder.jpg';
import { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

import LHOT from '../../../../assets/images/LHOT.png';
import LHOT_1 from '../../../../assets/images/LHOT_1.jpg';
import LHOT_2 from '../../../../assets/images/LHOT_2.png';
import LHOT_4 from '../../../../assets/images/LHOT_4.jpg';
import LHOT_5 from '../../../../assets/images/LHOT_5.png';
import { CarouselIndicator, Footer, Icon, LazyLoadImage } from '../../../../components';
import { RevisionClassData as data } from '../../../../data/CarouselData';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';

const LHOTTCPage = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const stub = document.getElementById('stub') as HTMLElement;
    const navbar = document.getElementById('navbar') as HTMLElement;

    stub.style.marginBottom = `${navbar.clientHeight}px`;
  }, [width]);

  return (
    <Page title='Lớp học ôn tập'>
      <main className='with-nav-height flex flex-col gap-y-5 overflow-y-auto text-[16px] md:text-[14px] lg:gap-y-10 lg:text-[18px] xl:text-[20px] 2xl:gap-y-[54px] 3xl:gap-y-[60px]'>
        <div className='w-full'>
          <LazyLoadImage
            className='z-[1] block aspect-[52/25] md:aspect-[4/1]'
            src={LHOT_1}
            placeHolderSrc={LHOT_1}
            alt='tstt_alt'
            objectFit='cover'
          />
        </div>
        <div className='mb-16 flex w-full flex-col gap-y-0 px-5 md:gap-y-12 md:px-12 lg:mb-24 lg:gap-y-20 lg:px-24 2xl:mb-32 2xl:gap-y-24 2xl:px-32 3xl:mb-36 3xl:gap-y-28 3xl:px-40'>
          <div className='flex w-full flex-col items-center justify-center gap-y-0'>
            <div className='flex w-full items-start'>
              <h1 className='text-start text-[28px] font-bold text-[#2F327D] md:mb-8 md:text-[24px] md:text-2xl md:text-[#2F327D] lg:mb-10 lg:text-3xl xl:text-4xl 2xl:mb-[44px] 2xl:text-5xl'>
                LỚP HỌC ÔN TẬP - THI THỬ
              </h1>
            </div>
            <div className='mb-7 flex w-full flex-col gap-y-6 md:mb-20 md:gap-y-9 lg:mb-24 lg:gap-y-12 xl:gap-y-14 2xl:mb-28 2xl:gap-y-16'>
              <div className='flex w-full flex-col items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='flex flex-col justify-center gap-2 md:max-w-[46%] lg:gap-4 2xl:gap-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Giới thiệu
                  </h2>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    <span className='font-bold'>Lớp học ôn tập</span> là một hoạt động phi lợi nhuận
                    được Câu lạc bộ Chúng Ta Cùng Tiến tổ chức vào mỗi học kỳ trong nhiều năm qua.
                    Hoạt động đã trở nên rất quen thuộc với nhiều thế hệ sinh viên Bách khoa và là
                    “người bạn” đồng hành vượt qua các môn đại cương khó khăn, chia sẻ kinh nghiệm
                    học tập, thi cử, . . .
                    <br />
                    <span className='font-bold'>Lớp học ôn tập</span> thường được tổ chức vào mỗi
                    cuối tuần tại Trường Đại học Bách khoa, cơ sở Dĩ An; chủ yếu dạy các môn đại
                    cương như: Giải tích, Vật lý, Hóa đại cương, Đại số tuyến tính, . . . Ngoài ra,
                    CLB còn tổ chức các kỳ thi thử giữa kỳ và cuối kỳ, giúp các bạn chuẩn bị tốt hơn
                    cho kỳ thi chính thức của trường.
                  </p>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[47/28] rounded-[20px] md:aspect-[3/2]'
                    src={LHOT_2}
                    placeHolderSrc={LHOT_2}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[11/5] rounded-[20px]'
                    src={LHOT}
                    placeHolderSrc={LHOT}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
                <div className='flex justify-center md:max-w-[46%]'>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Điều đặc biệt ở <span className='font-bold'>Lớp học ôn tập</span>, người trực
                    tiếp đứng lớp giảng dạy và soạn đề chính là các bạn thành viên xuất sắc thuộc
                    Ban Chuyên môn CLB. Với phong cách và ngôn ngữ sinh viên - gần gũi trong chia sẻ
                    hỗ trợ ôn tập, hệ thống kiến thức, các bạn đến đây sẽ được giúp đỡ nhiệt tình và
                    còn nhận được tài liệu học tập.
                  </p>
                </div>
              </div>
              <div className='flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='lg:px-py-3 flex flex-col justify-center gap-2 md:max-w-[46%] md:py-2 lg:gap-4 2xl:gap-5 2xl:py-4'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Hình thành và Phát triển
                  </h2>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Chương trình <span className='font-bold'>Lớp học ôn tập</span> được tổ chức lần
                    đầu vào tháng 5/2013, xuất phát từ tình trạng thực tế lúc bấy giờ. Khi hàng trăm
                    sinh viên bị cảnh cáo học vụ, Trung tâm Hỗ trợ Sinh viên và Việc làm lên ý tưởng
                    triển khai các buổi ôn tập, hệ thống kiến thức, chia sẻ kinh nghiệm làm bài thi
                    cho những sinh viên có nhu cầu trước mỗi kỳ thi.
                    <br /> Trải qua 10 năm phát triển, từ các nhóm học nhỏ,{' '}
                    <span className='font-bold'>Lớp học ôn tập</span> dần thu hút được càng nhiều
                    sinh viên tham gia. Theo thống kê, các năm gần đây, CLB Chúng Ta Cùng Tiến tổ
                    chức hàng trăm lớp học, tiếp cận được hàng ngàn sinh viên mỗi khóa.
                  </p>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[4/3] rounded-[20px]'
                    src={LHOT_4}
                    placeHolderSrc={LHOT_4}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
            </div>

            <div className='mb-7 flex w-[calc(100%+40px)] flex-col gap-6 rounded-[20px] bg-[#9DCCFF]/20 px-5 py-6 md:mb-12 md:w-[108%] md:py-8 md:px-[4%] lg:mb-16 lg:gap-8 lg:py-12 2xl:mb-20 2xl:gap-10 2xl:py-16'>
              <div className='flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='flex flex-col justify-center gap-2 md:max-w-[46%] lg:gap-4 2xl:gap-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Năm 2022
                  </h2>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Trở lại sau Đại dịch Covid-19,{' '}
                    <span className='font-semibold'>Lớp học ôn tập</span> được tổ chức trực tiếp từ
                    tháng 10/2022 vừa qua. Tính đến nay, CLB đã thành công tổ chức gần 50 lớp học và
                    15 lần thi thử, giúp hàng trăm bạn sinh viên K22 vượt qua các môn đại cương khó
                    nhằn.
                  </p>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[5/2] rounded-[20px]'
                    src={LHOT_1}
                    placeHolderSrc={LHOT_1}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[5/2] rounded-[20px]'
                    src={LHOT_5}
                    placeHolderSrc={LHOT_5}
                    alt='tstt_alt'
                    objectFit='cover'
                  />
                </div>
                <div className='flex items-center justify-center md:max-w-[46%]'>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    <span className='font-semibold'>Lớp học ôn tập</span> là thành quả của sự nỗ lực
                    và tâm huyết không hề nhỏ của Trung tâm Hỗ trợ Sinh viên và Việc làm và các
                    thành viên của CLB Chúng Ta Cùng Tiến. Trong tương lai, CLB hy vọng sẽ nhận được
                    sự quan tâm hơn nữa từ các bạn sinh viên Bách khoa, cũng như từ phía nhà trường,
                    đó là động lực to lớn để chúng mình tiếp tục tổ chức các hoạt động ý nghĩa, giúp
                    đỡ các bạn trong học tập cũng như trong cuộc sống.
                  </p>
                </div>
              </div>
            </div>

            <div className='flex w-full flex-col items-start gap-5 md:w-[108%] md:gap-4 lg:gap-6 2xl:gap-8'>
              <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                Tin tức
              </h2>
              {width > 768 ? (
                <div className='flex w-full flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                  {data.map((item, index) => (
                    <a
                      className='flex w-[25%] cursor-pointer flex-col items-start justify-center gap-y-2 rounded-[20px] py-7 px-5 shadow-xl md:p-3 lg:gap-y-3 lg:py-5 lg:px-4 2xl:py-7 2xl:px-5'
                      key={`new_${index}`}
                      target='_blank'
                      href={item.hRef}
                      rel='noreferrer'
                    >
                      <div className='w-[100%]'>
                        <LazyLoadImage
                          className='z-[1] block aspect-[3/2] rounded-[20px]'
                          src={item.imgSrc}
                          placeHolderSrc={item.imgSrc}
                          alt={`img_${index}`}
                          objectFit='cover'
                        />
                      </div>
                      <p className='text-start text-[12px] text-[#00CBB8] lg:text-[16px] 2xl:text-lg'>
                        Tin tức của ĐHQG-HCM
                      </p>
                      <p className='text-start font-medium leading-6 text-[#252641] lg:leading-8 2xl:leading-9'>
                        {item.name}
                      </p>
                      <div className='flex flex-row gap-x-1'>
                        <Icon.Clock className='aspect-square w-4 fill-[#696984] p-0 lg:w-5 2xl:w-6' />
                        <p className='text-[12px] font-medium text-[#696984] lg:text-[14px] 2xl:text-[16px]'>
                          {item.date}
                        </p>
                      </div>
                      <p className='text-[14px] font-normal leading-6 lg:text-[16px] lg:leading-7 2xl:text-[18px] 2xl:leading-8'>
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <div className='flex w-full items-center justify-center'>
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                    swipeable
                    autoPlay
                    infiniteLoop
                    interval={10000}
                    transitionTime={1000}
                    showArrows={false}
                    renderIndicator={CarouselIndicator}
                    stopOnHover
                    className='w-[calc(100%+40px])] flex flex-col items-center justify-center gap-y-5 bg-transparent'
                  >
                    {data.map((item, index) => (
                      <div className='flex w-full justify-center pb-10' key={`new_${index}`}>
                        <a
                          target='_blank'
                          href={item.hRef}
                          className='flex w-[calc(100%-40px)] cursor-pointer flex-col items-start justify-center gap-y-2 rounded-[20px] p-3 shadow-xl'
                          rel='noreferrer'
                        >
                          <div className='w-[100%]'>
                            <LazyLoadImage
                              className='z-[1] block aspect-[3/2] rounded-[20px]'
                              src={item.imgSrc}
                              placeHolderSrc={item.imgSrc}
                              alt={`img_${index}`}
                              objectFit='cover'
                            />
                          </div>
                          <p className='text-start text-[20px] text-[#00CBB8]'>
                            Tin tức của ĐHQG-HCM
                          </p>
                          <p className='text-start text-[24px] font-medium leading-7 text-[#252641]'>
                            {item.name}
                          </p>
                          <div className='flex flex-row gap-x-1'>
                            <Icon.Clock className='aspect-square w-4 fill-[#696984] p-0 lg:w-5 2xl:w-6' />
                            <p className='text-[16px] font-medium text-[#696984]'>{item.date}</p>
                          </div>
                          <p className='text-start text-[16px] font-normal leading-7 text-[#696984]'>
                            {item.description}
                          </p>
                        </a>
                      </div>
                    ))}
                  </Carousel>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default LHOTTCPage;
