import { DocumentSideMenu } from '../../../components';
import subjects from '../../../data/document';

const DocumentPage: React.FC = () => {
  return (
    <div className='flex relative flex-1 bg-[#F2F2F2] md:bg-[#E3F2FD]'>
      <DocumentSideMenu
        title='Thư viện tài liệu'
        subTitle='Tài liệu các môn học'
        description='Lorem ipsum dolor sit amet, consectetur adi'
        subjects={subjects}
      />

      {/* Banner */}
      <div className='hidden md:flex md:justify-between md:flex-col bg-[#49BBBD] w-full md:h-[88px] lg:h-[108px] xl:h-[132px] 2xl:h-[164px] x px-6 lg:px-7 xl:px-8 2xl:px-9 py-5 lg:py-6 xl:py-7 2xl:py-8 text-white '>
        <h1 className='text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-[44px] font-bold'>
          Thư viện tài liệu
        </h1>
        <p className='text-sm xl:text-base 2xl:text-lg'>
          Lorem ipsum dolor sit amet, consectetur adi
        </p>
      </div>

      <div className='h-[2000px]' />
    </div>
  );
};

export default DocumentPage;
