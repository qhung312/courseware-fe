// import LHOTTTPlaceHolder from '../../../../assets/images/LHOT-placeholder.jpg';
import { useEffect } from 'react';

import IntroductionPic from '../../../../assets/images/IntroductionPic.jpg';
import SCTTM_3 from '../../../../assets/images/SCTTM.jpg';
import SCTTM from '../../../../assets/images/SCTTM.png';
import SCTTM_1 from '../../../../assets/images/SCTTM_1.jpg';
import SCTTM_2 from '../../../../assets/images/SCTTM_2.jpg';
import SCTTM_4 from '../../../../assets/images/SCTTM_4.jpg';
import SCTTM_5 from '../../../../assets/images/SCTTM_5.jpg';
import { Footer, LazyLoadImage } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';

const SCTTMPage = () => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    const stub = document.getElementById('stub') as HTMLElement;
    const navbar = document.getElementById('navbar') as HTMLElement;

    stub.style.marginBottom = `${navbar.clientHeight}px`;
  }, [width]);

  return (
    <Page title='Hoạt động'>
      <main className='with-nav-height flex flex-col gap-y-5 overflow-y-auto text-[16px] md:text-[14px] lg:gap-y-10 lg:text-[18px] xl:text-[20px] 2xl:gap-y-[54px] 3xl:gap-y-[60px]'>
        <div className='w-full'>
          <LazyLoadImage
            className='z-[1] block aspect-[52/25] md:aspect-[4/1]'
            src={IntroductionPic}
            placeHolderSrc={IntroductionPic}
            alt='tstt_alt'
            objectFit='cover'
          />
        </div>
        <div className='mb-16 flex w-full flex-col gap-y-7 px-5 md:gap-y-12 md:px-12 lg:mb-24 lg:gap-y-20 lg:px-24 2xl:mb-32 2xl:gap-y-24 2xl:px-32 3xl:mb-36 3xl:gap-y-28 3xl:px-40'>
          <div className='flex w-full flex-col items-center justify-center gap-y-0'>
            <div className='flex w-full items-start'>
              <h1 className='text-start text-[28px] font-bold text-[#2F327D] md:mb-8 md:text-[24px] md:text-2xl md:text-[#2F327D] lg:mb-10 lg:text-3xl xl:text-4xl 2xl:mb-[44px] 2xl:text-5xl'>
                SÁCH CŨ TRI THỨC MỚI
              </h1>
            </div>
            <div className='flex w-full flex-col gap-y-7 md:gap-y-12 lg:gap-y-16 2xl:gap-y-20'>
              <div className='flex w-full flex-col items-start justify-between gap-5 md:flex-row md:gap-8 lg:gap-12 2xl:gap-[56px]'>
                <div className='flex flex-col justify-center gap-2 md:max-w-[46%] lg:gap-4 2xl:gap-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    Giới thiệu
                  </h2>
                  <p className='text-start leading-7 text-[#696984] md:leading-7 lg:leading-9 2xl:leading-10'>
                    <span className='font-bold'>Sách cũ Tri thức mới</span> là chương trình thường
                    niên được biết đến với tên gọi khác là Hội sách. Chương trình được tổ chức nhằm
                    trao tặng Tân sinh viên những đầu sách đại cương cũ được quyên góp từ các sinh
                    viên khóa trước. Chương trình luôn là niềm tự hào của CLB Chúng Ta Cùng Tiến
                    không chỉ ở quy mô tổ chức mà còn là ngọn lửa giữ lấy tinh thần đoàn kết, lá
                    lành đùm lá rách trong cộng đồng sinh viên ở các trường Đại học.
                  </p>
                </div>
                <div className='w-[100%] md:w-[50%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[47/28] rounded-[20px] md:aspect-[52/31]'
                    src={SCTTM_3}
                    placeHolderSrc={SCTTM_3}
                    alt='scttm_3_picture'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col gap-y-2 md:gap-y-6 lg:gap-y-8 xl:gap-y-10 2xl:gap-y-12'>
                <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                  Hình thành và phát triển
                </h2>
                <div className='flex w-full flex-col justify-between md:flex-row'>
                  <p className='mt-[1%] text-start leading-7 text-[#696984] md:max-w-[50%] md:leading-7 lg:leading-9 2xl:leading-10'>
                    Năm 2016, xuất phát từ bối cảnh nhiều sinh viên đại học bước đến giảng đường
                    không đầy đủ tài liệu, sách đại cương phục vụ cho việc học vì hoàn cảnh gia đình
                    khó khăn. Dưới sự chỉ đạo của Trung tâm Hỗ trợ Sinh viên và việc làm, CLB Chúng
                    Ta Cùng Tiến tổ chức Ngày hội Sách cũ Tri thức mới với khẩu hiệu tuyên truyền
                    “thu gom sách cũ, trao tặng Tân sinh viên”.
                  </p>
                  <div className='w-[100%] md:w-[41%]'>
                    <LazyLoadImage
                      className='z-[1] block aspect-[16/9] rounded-[20px]'
                      src={SCTTM_2}
                      placeHolderSrc={SCTTM_2}
                      alt='gt_scttm_picture'
                      objectFit='cover'
                    />
                  </div>
                </div>
              </div>
              <div className='flex w-full flex-col justify-between md:flex-row-reverse'>
                <p className='mt-[1%] text-start leading-7 text-[#696984] md:max-w-[50%] md:leading-7 lg:leading-9 2xl:leading-10'>
                  Giai đoạn 2019 - 2020 đánh dấu bước phát triển lớn về quy mô tổ chức cũng như
                  những giá trị CLB đưa đến cho sinh viên. Đến nay gần 7 năm tổ chức, CLB đã trao
                  tặng hơn 10.000 quyển sách đại cương Bách Khoa, đồng thời là hàng ngàn đầu sách
                  khoa học, tạp chí khác. Đồng thời hợp tác cùng nhiều đơn vị đưa Ngày hội trở thành
                  một sân chơi giúp Tân sinh viên hòa nhập trong ngày đầu bước đến giảng đường Đại
                  học.
                </p>
                <div className='w-[100%] md:w-[41%]'>
                  <LazyLoadImage
                    className='z-[1] block aspect-[16/9] rounded-[20px]'
                    src={SCTTM_1}
                    placeHolderSrc={SCTTM_1}
                    alt='gt_scttm_picture'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div className='flex w-full flex-col items-start gap-6 md:gap-8 lg:gap-12 xl:gap-14 2xl:gap-16'>
                <h2 className='text-start text-[24px] font-semibold text-[#000000] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                  Năm 2022
                </h2>
                <div className='flex w-full flex-col justify-center gap-y-7 md:flex-row md:justify-between'>
                  <div className='flex aspect-[20/21] h-auto w-full flex-col gap-0 rounded-[20px] shadow-xl md:w-[32%]'>
                    <div className='w-[100%]'>
                      <LazyLoadImage
                        className='z-[1] block aspect-[5/3] rounded-t-[20px]'
                        src={SCTTM_4}
                        placeHolderSrc={SCTTM_4}
                        alt='gt_scttm_picture'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex aspect-[20/9] w-full items-center justify-center px-3 py-3 lg:py-4 2xl:py-5'>
                      <p className='text-[16px] font-normal leading-7 text-[#696984] md:text-[14px] md:leading-6 lg:text-[16px] lg:leading-7 2xl:text-[18px] 2xl:leading-8'>
                        Tuy trải qua sự gián đoạn của 2 năm đại dịch Covid, ngọn lửa của Sách cũ Tri
                        thức mới vẫn không tắt và đã được thắp sáng trở lại. Chương trình diễn ra
                        với sự tham gia của hơn 2000 sinh viên, trao tặng hơn 2000 đầu sách.
                      </p>
                    </div>
                  </div>
                  <div className='flex aspect-[20/21] h-auto w-full flex-col gap-0 rounded-[20px] shadow-xl md:w-[32%]'>
                    <div className='w-[100%]'>
                      <LazyLoadImage
                        className='z-[1] block aspect-[5/3] rounded-t-[20px]'
                        src={SCTTM_5}
                        placeHolderSrc={SCTTM_5}
                        alt='gt_scttm_picture'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex aspect-[20/9] w-full items-center justify-center px-3 py-3 lg:px-4 lg:py-4 2xl:py-5'>
                      <p className='text-[16px] font-normal leading-7 text-[#696984] md:text-[14px] md:leading-6 lg:text-[16px] lg:leading-7 2xl:text-[18px] 2xl:leading-8'>
                        Bên cạnh hoạt động trao tặng sách, Chúng Ta Cùng Tiến hợp tác cùng 7 Đơn vị
                        CLB/Đội/Nhóm tạo nên sân chơi lớn giúp các bạn cảm nhận một tinh thần nhiệt
                        huyết mới mẻ trong môi trường Bách Khoa, đồng thời là bước đầu giúp Tân sinh
                        viên hòa nhập, giao lưu với bạn bè tứ phương.
                      </p>
                    </div>
                  </div>
                  <div className='flex aspect-[20/21] h-auto w-full flex-col gap-0 rounded-[20px] shadow-xl md:w-[32%]'>
                    <div className='w-[100%]'>
                      <LazyLoadImage
                        className='z-[1] block aspect-[5/3] rounded-t-[20px]'
                        src={SCTTM}
                        placeHolderSrc={SCTTM}
                        alt='gt_scttm_picture'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex aspect-[20/9] w-full items-center justify-center px-3 py-3  lg:px-4 lg:py-4 2xl:py-5'>
                      <p className='text-[18px] font-normal leading-7 text-[#696984] md:text-[16px] md:leading-6 lg:text-[18px] lg:leading-7 2xl:text-[20px] 2xl:leading-8'>
                        Sự xuất sắc của chương trình đã được ghi nhận với giải thưởng danh giá “Dự
                        án cộng đồng xuất sắc nhất” do BK Youth Award 2022 trao tặng.
                      </p>
                    </div>
                  </div>
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

export default SCTTMPage;
