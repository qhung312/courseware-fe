import { FC, useEffect, useRef } from 'react';

import { Footer, LazyLoadImage } from '../../../../components';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';

const GSAX: FC = () => {
  const { width } = useWindowDimensions();
  const contentContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (width < 1024) {
      contentContainerRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.height = 'auto';
        }
      });
    } else {
      contentContainerRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.style.height = `${
            parseFloat(window.getComputedStyle(Array.from(ref.children)[index % 2]).height) + 80
          }px`;
        }
      });
    }
  }, [width]);

  useEffect(() => {
    if (width >= 768) {
      const heightDecider = document.querySelector('.height-decider');
      const dependent = document.querySelector('.dependent');

      if (heightDecider && dependent) {
        (dependent as HTMLElement).style.height = `${parseFloat(
          window.getComputedStyle(heightDecider).height
        )}px`;
      }
    }
  }, [width]);

  return (
    <Page title='Gia Sư Áo Xanh'>
      <LazyLoadImage
        src={require('../../../../assets/images/GSAX-Header.jpg')}
        placeHolderSrc={require('../../../../assets/images/GSAX-Header-placeholder.jpg')}
        alt='Banner của Gia Sư Áo Xanh'
        objectFit='cover'
        containerClassName='aspect-[2] h-auto md:aspect-[4] w-screen overflow-hidden'
        className='h-full w-full object-[50%_82%]'
      />
      <main
        className='flex flex-col gap-y-5 px-5 py-5 
        lg:gap-y-10 lg:px-10 lg:py-10 xl:gap-y-[60px] xl:px-20 3xl:gap-y-20 3xl:px-[100px] 3xl:py-[60px]'
      >
        <div id='gsax-introduction' className='flex flex-col'>
          <h1 className='mb-7 text-3xl font-bold uppercase text-[#2F327D] lg:mb-9 lg:text-5xl 3xl:mb-10 3xl:text-6xl'>
            Gia sư áo xanh
          </h1>
          <div className='flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-4 3xl:gap-y-5'>
            <h2 className='text-2xl font-semibold md:leading-relaxed lg:text-[32px] 3xl:text-[40px]'>
              Giới thiệu
            </h2>
            <p className='text-justify text-base leading-loose text-[#696984] lg:text-[20px] 3xl:text-[28px]'>
              Gia Sư Áo Xanh Bách Khoa là chiến dịch thường niên được khởi động từ năm 2011, xây
              dựng và phát triển cho đến nay. Chúng Ta Cùng Tiến luôn tự hào rằng đây là điểm xuất
              phát của tất cả chiến dịch Gia Sư Áo Xanh được phát động rộng rãi trên khắp các trường
              Đại học tại Thành phố Hồ Chí Minh.
            </p>
          </div>
        </div>
        <div
          className='-mx-5 flex flex-col space-y-2 rounded-lg bg-[#9DCCFF]/20 
          p-5 lg:-mx-4 lg:space-y-6 lg:p-4 xl:-mx-7 xl:space-y-8 xl:p-7 3xl:-mx-[30px] 3xl:space-y-10 3xl:p-[30px]'
        >
          <h2 className='text-2xl font-semibold md:leading-relaxed lg:text-[32px] 3xl:text-[40px]'>
            Hình thành và Phát triển
          </h2>
          <div
            ref={(el) => (contentContainerRefs.current[0] = el)}
            className='flex w-full flex-row flex-wrap items-center
            justify-between gap-y-5 md:gap-x-6 lg:flex-nowrap lg:gap-x-10 xl:gap-x-[60px] 3xl:gap-x-20'
            style={{ marginTop: '0px' }}
          >
            <div className='flex h-fit flex-col leading-loose'>
              <p className='text-[16px] font-bold text-[#4285F4] lg:text-[20px] 3xl:text-[24px]'>
                Năm 2011
              </p>
              <p className='text-justify text-[16px] text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
                Với ý tưởng của Anh Trần Tấn Phúc – Nguyên giám đốc Trung tâm hỗ trợ sinh viên và
                việc làm Trường Đại học Bách Khoa, ĐHQG TP.HCM – CLB đã triển khai chương trình ôn
                tập hè miễn phí cho học sinh, phát huy tinh thần xung kích của sinh viên Bách Khoa,
                đồng thời giới thiệu về hình ảnh Gia Sư Bách Khoa đến với phụ huynh và các bạn học
                sinh.
              </p>
            </div>
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2'
              objectFit='cover'
              containerClassName='w-full lg:min-w-[50%] lg:w-1/2'
              className='w-full rounded-lg'
            />
          </div>
          <div
            ref={(el) => (contentContainerRefs.current[1] = el)}
            className='flex w-full flex-row flex-wrap-reverse items-center justify-between gap-y-5
            md:gap-x-6 lg:flex-nowrap lg:gap-x-10 xl:gap-x-[60px] 3xl:gap-x-20'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX10.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX10-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 10'
              objectFit='cover'
              containerClassName='w-full lg:min-w-[50%] lg:w-1/2'
              className='w-full rounded-lg'
            />
            <div className='flex h-fit flex-col leading-loose'>
              <p className='text-[16px] font-bold text-[#4285F4] lg:text-[20px] 3xl:text-[24px]'>
                Năm 2012
              </p>
              <p className='text-justify text-[16px] text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
                Chiến dịch chính thức được mang tên Gia Sư Áo Xanh. Chiến dịch diễn ra thu hút hơn
                120 sinh viên tình nguyện của nhiều trường đại học trên địa bàn thành phố tham gia
                dạy kèm cho 142 học sinh. Các sinh viên dạy kèm các môn Toán, Lý, Hóa, Tiếng Anh,
                Văn cho các bạn học sinh từ lớp 6 đến lớp 12 cần ôn luyện kiến thức nhưng hoàn cảnh
                gia đình khó khăn không thể chi trả cho việc học thêm.
              </p>
            </div>
          </div>
          <div
            ref={(el) => (contentContainerRefs.current[2] = el)}
            className='flex w-full flex-row flex-wrap items-center justify-between gap-y-5
            md:gap-x-6 lg:flex-nowrap lg:gap-x-10 xl:gap-x-[60px] 3xl:gap-x-20'
          >
            <div className='flex h-fit flex-col leading-loose'>
              <p className='text-[16px] font-bold text-[#4285F4] lg:text-[20px] 3xl:text-[24px]'>
                Năm 2016
              </p>
              <p className='text-justify text-[16px] text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
                Có thể nói đây là một trong những năm gặt hái được nhiều thành công nhất, đưa Gia Sư
                Áo Xanh trở thành thương hiệu được nhiều bạn sinh viên biết đến. Lần đầu tiên chương
                trình đổi mới cách tổ chức và vận hành chính thức, trở thành đội hình chuyên gia sư
                thuộc Mùa Hè Xanh mặt trận Thành phố. Bên cạnh các hoạt động dạy học, chiến dịch đã
                tổ chức thành công lớp học huấn luyện các kỹ năng bơi lội cho trẻ em tại Hồ Bơi Mèo
                Mun – Hiệp Bình Phước, Thủ Đức hay tổ chức tìm hiểu, đố vui theo chủ đề "Bảo vệ môi
                trường" cho các bạn nhỏ.
              </p>
            </div>
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX8.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX8-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 8'
              objectFit='cover'
              containerClassName='w-full lg:min-w-[50%] lg:w-1/2'
              className='w-full rounded-lg'
            />
          </div>
          <div
            ref={(el) => (contentContainerRefs.current[3] = el)}
            className='flex w-full flex-row flex-wrap-reverse items-center justify-between gap-y-5
            md:gap-x-6 lg:flex-nowrap lg:gap-x-10 xl:gap-x-[60px] 3xl:gap-x-20'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX6.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX6-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 6'
              objectFit='cover'
              containerClassName='w-full lg:min-w-[50%] lg:w-1/2'
              className='w-full rounded-lg'
            />
            <div className='flex w-full flex-col leading-loose'>
              <p className='text-[16px] font-bold text-[#4285F4] lg:text-[20px] 3xl:text-[24px]'>
                Năm 2019
              </p>
              <p className='text-justify text-[16px] text-[#696984] lg:text-[20px] 3xl:text-[24px]'>
                Với gần 110 chiến sĩ, đội hình gia sư tình nguyện này "phủ sóng" tại các lớp học
                tình thương, các trung tâm văn hóa phường,thậm chí là dạy tại nhà của những hộ dân
                tại địa phương. Đội hình các chiến sĩ Gia sư áo xanh của ĐH Bách Khoa đã triển khai
                hoạt động tại các khu vực như phường Bình Chiểu, phường Hiệp Bình Chánh, phường Hiệp
                Bình phước (Q.Thủ Đức), phường Long Bình (Q.9), Q.2, Đông Hòa (Dĩ An – Bình
                Dương),... Bên cạnh việc tổ chức các lớp học, chiến dịch còn tạo cơ hội để các chiến
                sĩ tham gia trau dồi kỹ năng qua hoạt động "Một ngày làm lính cứu hỏa" tại Long
                Bình.
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-5'>
          <h2 className='text-2xl font-semibold md:leading-relaxed lg:text-[32px] 3xl:text-[40px]'>
            Năm 2022
          </h2>
          <div
            className='rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:flex 
            md:h-fit md:w-[65%] md:flex-row-reverse md:p-0'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_1.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_1-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 1'
              objectFit='cover'
              containerClassName='w-[160px] flex-shrink-0 mr-2 md:mr-0 
              lg:w-[180px] xl:w-[200px] 3xl:w-[240px] aspect-square h-auto float-left md:float-none'
              className='rounded-lg md:rounded-l-none'
            />
            <p className='text-justify text-[16px] leading-loose text-[#696984] md:p-5 lg:text-[20px] 3xl:text-[24px]'>
              Đội hình Gia sư áo xanh Bách Khoa 2022 được khởi động từ ngày 05/06/2022, dưới sự chỉ
              huy của Ban Chỉ Huy thuộc CLB Chúng Ta Cùng Tiến thực hiện. Ngày 28/06/2022, Lễ ra
              quân được tổ chức với đội hình gần 50 chiến sĩ được chọn lọc kỹ càng qua vòng phỏng
              vấn.
            </p>
          </div>
          <div
            className='rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:flex 
            md:h-fit md:w-[65%] md:self-end md:p-0'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_2.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_2-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 2'
              objectFit='cover'
              containerClassName='w-[160px] flex-shrink-0 ml-2 md:ml-0 
              lg:w-[180px] xl:w-[200px] 3xl:w-[240px] aspect-square h-auto float-right md:float-none'
              className='rounded-lg md:rounded-r-none'
            />
            <p className='text-justify text-[16px] leading-loose text-[#696984] md:p-5 lg:text-[20px] 3xl:text-[24px]'>
              Đội hình hoạt động ở các lớp học tình thương cho các em nhỏ khó khăn thuộc phường Bình
              An, Dĩ An, Bình Dương. Quy mô 2 lớp lên đến 100 học sinh.
            </p>
          </div>
          <div
            className='rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:flex 
            md:h-fit md:w-[65%] md:flex-row-reverse md:p-0'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_3.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_3-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 3'
              objectFit='cover'
              containerClassName='w-[160px] flex-shrink-0 mr-2 md:mr-0 
              lg:w-[180px] xl:w-[200px] 3xl:w-[240px] aspect-square h-auto float-left md:float-none'
              className='rounded-lg md:rounded-l-none'
            />
            <p className='text-justify text-[16px] leading-loose text-[#696984] md:p-5 lg:text-[20px] 3xl:text-[24px]'>
              Đồng thời Gia sư áo xanh Bách Khoa kết hợp dạy chương trình tin học tại phường Linh
              Trung, Thủ Đức, giúp các bé có những trải nghiệm phong phú với công nghệ hiện nay.
            </p>
          </div>
          <div
            className='rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] md:flex 
            md:h-fit md:w-3/4 md:flex-row-reverse md:self-end md:p-0'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_4.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_4-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 4'
              objectFit='cover'
              containerClassName='dependent float-right ml-2 h-[160px] md:ml-0 w-auto rounded-lg md:float-none flex-shrink-0'
              className='rounded-lg md:rounded-l-none'
            />
            <p className='text-justify text-[16px] leading-loose text-[#696984] md:p-5 lg:text-[20px] 3xl:text-[24px]'>
              Bên cạnh việc dạy học, Đội hình còn tổ chức các hoạt động sinh hoạt hè vui chơi cuối
              tuần cho các bé. Nhằm giúp các bé vượt qua những mặc cảm của hoàn cảnh, sự nhút nhát
              để hòa đồng cùng với cộng đồng hơn.
            </p>
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_5.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_5-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 5'
              objectFit='cover'
              containerClassName='height-decider mt-2 md:mt-0 w-full aspect-[2] h-auto float-none flex-shrink-0
              md:w-[160px] lg:w-[180px] xl:w-[200px] 3xl:w-[240px] md:aspect-square md:float-left'
              className='rounded-lg md:rounded-r-none'
            />
          </div>
          <div
            className='rounded-lg bg-white p-5 shadow-[0px_20px_50px_0px_rgba(47,50,125,0.1)] 
            md:flex md:h-fit md:w-[65%] md:flex-row-reverse md:p-0'
          >
            <LazyLoadImage
              src={require('../../../../assets/images/GSAX2022_6.jpg')}
              placeHolderSrc={require('../../../../assets/images/GSAX2022_6-placeholder.jpg')}
              alt='Gia Sư Áo Xanh 2022 - 6'
              objectFit='cover'
              containerClassName='w-[160px] flex-shrink-0 mr-2 md:mr-0 
              lg:w-[180px] xl:w-[200px] 3xl:w-[240px] aspect-square h-auto float-left md:float-none'
              className='rounded-lg md:rounded-l-none'
            />
            <p className='text-justify text-[16px] leading-loose text-[#696984] md:p-5 lg:text-[20px] 3xl:text-[24px]'>
              Ban Chỉ Huy đội hình tạo điều kiện giúp các bạn chiến sĩ được trải nghiệm nhiều kỹ
              năng, hoạt động hơn với các hoạt động trọng điểm như: Dâng hoa dâng hương tưởng niệm
              anh hùng liệt sĩ, An toàn giao thông,...
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </Page>
  );
};

export default GSAX;
