import Icon from '../Icon';

interface DocumentCardProps {
  title: string;
  subTitle: string;
  description: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, subTitle, description }) => {
  return (
    <div className='relative z-10 max-h-[266px] rounded-[20px] bg-white px-4 py-3 md:p-5 xl:p-6 2xl:p-7'>
      <div className='absolute right-4 top-3 flex space-x-1 md:space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-5'>
        <div className='flex aspect-square w-7 items-center justify-center rounded-full bg-[#4285F4]'>
          <Icon.DocumentCopy className='h-4 w-4 fill-white' />
        </div>
        <div className='flex aspect-square w-7 items-center justify-center rounded-full bg-[#4285F4]'>
          <Icon.DocumentShare className='h-4 w-4 fill-white' />
        </div>
      </div>
      <div className='space-y-2'>
        <h2 className='text-base font-semibold md:text-xl lg:text-2xl'>{title}</h2>
        <p className='truncate text-sm text-[#696984] md:text-base'>{subTitle}</p>
      </div>
      <div className='mt-4 bg-[#9DCCFF] bg-opacity-20 p-2 md:mt-5 md:p-3 xl:mt-6 xl:p-4 2xl:mt-7 2xl:p-5'>
        <p className='max-h-[75px] overflow-hidden text-ellipsis text-sm text-[#696984] md:text-base'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default DocumentCard;
