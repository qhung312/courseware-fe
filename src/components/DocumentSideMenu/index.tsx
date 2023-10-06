interface DocumentSideMenuProps {
  title: string;
  subTitle: string;
  description: string;
  subjects: any;
}

const DocumentSideMenu: React.FC<DocumentSideMenuProps> = ({
  title,
  subTitle,
  description,
  subjects,
}) => {
  return (
    <>
      <div className='z-20 bg-white flex items-center fixed w-full md:w-[264px] lg:w-[332px] xl:w-[400px] 3xl:w-[500px] px-5 xl:px-7 pt-5 md:pt-[42px] lg:pt-14 h-screen transition-all duration-300'>
        <div className='w-full h-full space-y-6'>
          <h2 className='hidden md:block transition duration-300 font-semibold md:text-md lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'>
            {subTitle}
          </h2>
          <span>
            <h1 className='block md:hidden transition duration-300 font-bold text-2xl text-[#4285F4]'>
              {title}
            </h1>
            <p className='blockA md:hidden transition duration-300 text-[#252641]'>{description}</p>
          </span>

          {/* TODO */}
          <div className='space-y-4'>
            {subjects.map((subject: any, index: number) => (
              <div
                className='px-6 py-5 bg-[#9dccff] rounded-xl bg-opacity-30'
                key={subject.title + index}
              >
                {subject.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TODO */}
      <div className='mr-0 md:mr-[264px] lg:mr-[332px] xl:mr-[400px] 3xl:mr-[500px] ' />
    </>
  );
};

export default DocumentSideMenu;
