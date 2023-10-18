import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { Page, Wrapper } from '../../../layout';

const DocumentList = () => {
  return (
    <Page>
      <Wrapper className='flex flex-1 flex-col'>
        <div className='mb-6 flex-1 space-y-5 px-5 pt-5 md:space-y-6 md:pt-0 lg:px-9 lg:pt-8 xl:space-y-7 xl:px-10 xl:pt-10 2xl:space-y-8 2xl:px-11 2xl:pt-11'>
          <div className='z-10 mt-2 rounded-[20px] bg-white px-4 py-3 md:mt-4 md:p-5 lg:mt-5 xl:mt-6 xl:p-6 2xl:mt-7 2xl:p-7'>
            <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
            <p className='w-full text-center'>Chọn một môn học</p>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default DocumentList;
