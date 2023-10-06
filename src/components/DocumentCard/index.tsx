import Icon from '../Icon';

interface DocumentCardProps {
  title: string;
  subTitle: string;
  description: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, subTitle, description }) => {
  return (
    <div className='bg-white relative max-h-[266px] rounded-[20px] px-4 py-3'>
      <div className='absolute right-4 top-3 flex space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-5'>
        <div className='w-7 aspect-square rounded-full bg-[#4285F4] flex justify-center items-center'>
          <Icon.DocumentCopy className='fill-white w-4 h-4' />
        </div>
        <div className='w-7 aspect-square rounded-full bg-[#4285F4] flex justify-center items-center'>
          <Icon.DocumentShare className='fill-white w-4 h-4' />
        </div>
      </div>
      <div className='space-y-2'>
        <h2 className='text-base md:text-xl lg:text-2xl font-semibold'>{title}</h2>
        <p className='text-sm md:text-base text-[#696984] truncate'>{subTitle}</p>
      </div>
      <div className='p-2 bg-[#9DCCFF] bg-opacity-20 mt-4 md:mt-5 xl:mt-6 2xl:mt-7'>
        <p className='text-sm md:text-base text-[#696984] p-2 md:p-3 xl:p-4 2xl:p-5'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default DocumentCard;
