import { useNavigate } from 'react-router-dom';

import LHOTTTPlaceHolder from '../../../assets/images/LHOT-placeholder.jpg';
import LHOTTT from '../../../assets/images/LHOT.png';
import GSAXPlaceHolder from '../../../assets/images/LRQGSAX-placeholder.png';
import GSAX from '../../../assets/images/LRQGSAX.png';
import SCTTMPlaceHolder from '../../../assets/images/NHSCTTM-placeholder.png';
import SCTTM from '../../../assets/images/NHSCTTM.png';
import TSTTPlaceHolder from '../../../assets/images/TSTT-placeholder.jpg';
import TSTT from '../../../assets/images/TSTT.jpg';
import { Footer, LazyLoadImage } from '../../../components';
import { Page } from '../../../layout';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  return (
    <Page title='Hoạt động'>
      <main className='with-nav-height flex flex-col gap-y-28 overflow-y-auto lg:gap-y-36 2xl:gap-y-40 3xl:gap-y-44'>
        <div className='flex w-full flex-col gap-y-12 px-5 py-8 md:px-[48px] lg:gap-y-20 lg:px-24 xl:py-10 2xl:gap-y-24 2xl:py-12 2xl:px-32 3xl:gap-y-28 3xl:py-14 3xl:px-40'>
          <div className='flex w-full flex-col items-start justify-center md:items-center'>
            <h1 className='text-start text-[28px] font-bold text-[#00CBB8] md:text-center md:text-[24px] md:text-2xl md:text-[#4285F4] lg:text-3xl xl:text-4xl 2xl:text-5xl'>
              HOẠT ĐỘNG
            </h1>
            <h3 className='hidden text-center text-lg font-normal text-[#696984] md:flex lg:text-xl 2xl:text-2xl'>
              Những hoạt động nổi bật được tổ chức bỏi Câu lạc bộ Chúng ta cùng tiến
            </h3>
            <p className='flex text-[16px] font-normal text-[#696984] md:hidden'>
              Những hoạt động nổi bật
            </p>
          </div>
          <div className='flex flex-col gap-y-12 md:gap-y-24 lg:gap-y-32 xl:gap-y-40 2xl:gap-y-44 3xl:gap-48'>
            <div className='flex w-full flex-col-reverse items-center justify-center gap-y-8 md:flex-row md:justify-between md:gap-x-16 lg:gap-x-24 2xl:gap-x-32 3xl:gap-x-40'>
              <div className='relative mb-8 max-w-[100%] flex-1 md:mb-0 md:max-w-[52%]'>
                <div className='absolute top-0 left-[15%] z-0 aspect-square w-[11%] translate-x-[-50%] translate-y-[-40%] rounded-full bg-[#33EFA0] md:w-[17%]' />
                <div className='absolute top-[100%] left-[100%] z-0 aspect-square w-[22%] translate-x-[-83%] translate-y-[-83%] rounded-full bg-[#5B61EB] md:w-[28%] md:translate-x-[-75%] md:translate-y-[-70%]' />
                <LazyLoadImage
                  className='z-[1] block aspect-[360/200]'
                  src={TSTT}
                  placeHolderSrc={TSTTPlaceHolder}
                  alt='tstt_alt'
                  objectFit='cover'
                />
              </div>
              <div className='flex flex-col justify-center gap-2 md:max-w-xs lg:max-w-sm lg:gap-3 xl:max-w-md 2xl:max-w-lg 2xl:gap-4 3xl:max-w-xl'>
                <div className='w-full space-y-3 md:space-y-4 xl:space-y-5'>
                  <h2 className='text-start text-[24px] font-semibold text-black md:uppercase md:text-[#2F327D] lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    TIẾP SỨC TỚI TRƯỜNG
                  </h2>
                  <p className='text-start text-[16px] text-[#696984] md:text-[14px] lg:text-[18px] 2xl:text-[22px]'>
                    Chương trình Tiếp sức tới trường là hoạt động thường niên được tổ chức vào đầu
                    năm học, nhằm hỗ trợ các bạn Tân sinh viên hội nhập với môi trường mới.
                  </p>
                </div>
                <div className='flex items-center justify-start'>
                  <button
                    type='button'
                    onClick={() => navigate('tiep-suc-toi-truong')}
                    className='rounded-full bg-[#3465E1]/80 px-6 py-2 text-[14px] font-bold text-white shadow-xl hover:bg-[#3465E1] md:px-5 md:py-1 md:text-[14px] lg:px-7 lg:py-2 lg:text-[16px] 2xl:px-9 2xl:py-[10px] 2xl:text-[20px]'
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:justify-between'>
              <div className='flex w-full flex-col justify-center gap-2 md:w-[44%] lg:gap-3 xl:gap-4'>
                <div className='w-full space-y-3 md:space-y-4 xl:space-y-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#00CBB8] md:uppercase lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    SÁCH <span className='text-black md:text-[#00CBB8]'>CŨ, </span>TRI THỨC{' '}
                    <span className='text-black md:text-[#00CBB8]'>MỚI</span>
                  </h2>
                  <p className='text-start text-[16px] text-[#696984] md:text-[14px] lg:text-[18px] 2xl:text-[22px]'>
                    <span className='font-semibold md:font-normal'>Sách cũ Tri thức mới</span> là
                    chương trình thường niên được biết đến với tên gọi khác là Hội sách. Chương
                    trình được tổ chức nhằm trao tặng Tân sinh viên những đầu sách đại cương cũ được
                    quyên góp từ các sinh viên khóa trước. Chương trình luôn là niềm tự hào của CLB
                    Chúng Ta Cùng Tiến không chỉ ở quy mô tổ chức mà còn là ngọn lửa giữ lấy tinh
                    thần đoàn kết, lá lành đùm lá rách trong cộng đồng sinh viên ở các trường Đại
                    học.
                  </p>
                </div>
                <div className='flex items-center justify-start'>
                  <button className='rounded-full bg-[#00CBB8]/80 px-6 py-2 text-[14px] font-bold text-white shadow-xl hover:bg-[#00CBB8] md:px-5 md:py-1 lg:px-7 lg:py-2 lg:text-[16px] 2xl:px-9 2xl:py-[10px] 2xl:text-[20px]'>
                    Chi tiết
                  </button>
                </div>
              </div>
              <div className='relative mb-8 max-w-[100%] flex-1 md:mb-0 md:max-w-[51%]'>
                <div className='absolute top-[100%] left-[0] z-0 aspect-[7/5] w-[36%] translate-x-[-7%] translate-y-[-90%] bg-[#D3E7FF]' />
                <LazyLoadImage
                  className='z-[1] block aspect-[360/200]'
                  src={SCTTM}
                  placeHolderSrc={SCTTMPlaceHolder}
                  alt='scttm_alt'
                  objectFit='cover'
                />
              </div>
            </div>

            <div className='flex w-full flex-col-reverse items-center justify-center gap-y-8 md:flex-row md:justify-between'>
              <div className='relative mb-8 max-w-[100%] flex-1 md:mb-0 md:max-w-[51%]'>
                <div className='absolute top-[0] left-[0] z-0 aspect-square w-[12.5%] translate-x-[-25%] translate-y-[-30%] rounded-full bg-[#687EF3] md:translate-x-[-36%] md:translate-y-[-40%]' />
                <LazyLoadImage
                  className='z-[1] block aspect-[360/200]'
                  src={LHOTTT}
                  placeHolderSrc={LHOTTTPlaceHolder}
                  alt='lhottt_alt'
                  objectFit='cover'
                />
              </div>
              <div className='flex w-full flex-col justify-center gap-2 md:w-[43%] lg:gap-3 xl:gap-4'>
                <div className='w-full space-y-3 md:space-y-4 xl:space-y-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#2F327D] md:uppercase lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    LỚP HỌC ÔN TẬP - THI THỬ
                  </h2>
                  <p className='text-start text-[16px] text-[#696984] md:text-[14px] lg:text-[18px] 2xl:text-[22px]'>
                    Lớp học ôn tập là một hoạt động phi lợi nhuận được Câu lạc bộ Chúng Ta Cùng Tiến
                    tổ chức vào mỗi học kỳ trong nhiều năm qua. Hoạt động đã trở nên rất quen thuộc
                    với nhiều thế hệ sinh viên Bách khoa và là “người bạn” đồng hành vượt qua các
                    môn đại cương khó khăn, chia sẻ kinh nghiệm học tập, thi cử,...
                  </p>
                </div>
                <div className='flex items-center justify-start'>
                  <button className='rounded-full bg-[#3465E1]/80 px-6 py-2 text-[14px] font-bold text-white shadow-xl hover:bg-[#3465E1] md:px-5 md:py-1 lg:px-7 lg:py-2 lg:text-[16px] 2xl:px-9 2xl:py-[10px] 2xl:text-[20px]'>
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>

            <div className='flex w-full flex-col items-center justify-center gap-y-8 md:flex-row md:justify-between'>
              <div className='flex w-full flex-col justify-center gap-2 md:w-[44%] lg:gap-3 xl:gap-4'>
                <div className='w-full space-y-3 md:space-y-4 xl:space-y-5'>
                  <h2 className='text-start text-[24px] font-semibold text-[#2F327D] md:uppercase lg:text-[28px] xl:text-[32px] 2xl:text-[36px]'>
                    GIA SƯ <span className='text-[#4285F4]'>ÁO XANH</span>
                  </h2>
                  <p className='text-start text-[16px] text-[#696984] md:text-[14px] lg:text-[18px] 2xl:text-[22px]'>
                    Gia Sư Áo Xanh Bách Khoa là chiến dịch thường niên được khởi động từ năm
                    2011,xây dựng và phát triển cho đến nay. Chúng Ta Cùng Tiến luôn tự hào rằng đây
                    là điểm xuất phát của tất cả chiến dịch Gia Sư Áo Xanh được phát động rộng rãi
                    trên khắp các trường Đại học tại Thành phố Hồ Chí Minh.
                  </p>
                </div>
                <div className='flex items-center justify-start'>
                  <button className='rounded-full bg-[#00CBB8]/80 px-6 py-2 text-[14px] font-bold text-white shadow-xl hover:bg-[#00CBB8] md:px-5 md:py-1 lg:px-7 lg:py-2 lg:text-[16px] 2xl:px-9 2xl:py-[10px] 2xl:text-[20px]'>
                    Chi tiết
                  </button>
                </div>
              </div>
              <div className='relative mb-8 max-w-[100%] flex-1 md:mb-0 md:max-w-[51%]'>
                <div className='absolute top-[100%] left-[100%] z-0 aspect-square w-[22%] translate-x-[-92%] translate-y-[-92%] bg-[#73BCFF] md:w-[36%]' />
                <LazyLoadImage
                  className='z-[1] block aspect-[360/200]'
                  src={GSAX}
                  placeHolderSrc={GSAXPlaceHolder}
                  alt='gsax_alt'
                  objectFit='cover'
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Page>
  );
};

export default ActivitiesPage;
