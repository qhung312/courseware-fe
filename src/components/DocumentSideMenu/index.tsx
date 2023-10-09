import { useLayoutEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector, usePath } from '../../hooks';
import { getAllSubjects } from '../../slices/actions/library.action';
import { RootState } from '../../store';
import { Subject } from '../../types/library';
import Icon from '../Icon';

interface DocumentSideMenuProps {
  title: string;
  subTitle: string;
  description: string;
  baseRoute: string;
}

const DocumentSideMenu: React.FC<DocumentSideMenuProps> = ({
  title,
  subTitle,
  description,
  baseRoute,
}) => {
  const { subjects } = useAppSelector((state: RootState) => state.library);

  const params = useParams();

  const path = usePath();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (path[0] === 'library') {
      dispatch(getAllSubjects());
    }
  }, [path, dispatch]);

  return (
    <>
      <div
        className={`fixed top-0 z-20 max-h-screen pt-[72px] md:pt-[46px] xl:pt-[62px] ${
          params?.subjectId ? 'translate-x-[-100%]' : ''
        } h-screen min-h-screen w-full transition-all duration-300 md:w-[264px]  md:translate-x-0 lg:w-[332px] xl:w-[400px] 3xl:w-[500px]`}
      >
        <div className='flex h-full max-h-full items-center overflow-y-scroll bg-white px-5 pt-5  md:pt-[87px] lg:pt-[101px] xl:px-7 xl:pt-[143px]'>
          <div className='h-full w-full space-y-6'>
            <h2 className='md:text-md hidden font-semibold transition duration-300 md:block lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl'>
              {subTitle}
            </h2>
            <span>
              <h1 className='block text-2xl font-bold text-[#4285F4] transition duration-300 md:hidden'>
                {title}
              </h1>
              <p className='blockA text-[#252641] transition duration-300 md:hidden'>
                {description}
              </p>
            </span>

            <div className='flex flex-col space-y-4'>
              {subjects ? (
                subjects?.map((subj: Subject) => {
                  const isActive = subj._id === params?.subjectId;
                  return (
                    <NavLink
                      to={`${baseRoute}/${subj._id}`}
                      className={`group flex flex-1 items-center justify-between px-6 py-5 md:py-3 xl:py-4 2xl:py-5  ${
                        isActive
                          ? 'bg-[#9DCCFF] bg-opacity-30 md:bg-[#4285F4] md:bg-opacity-90'
                          : 'bg-[#9DCCFF] bg-opacity-30'
                      } rounded-xl transition-all duration-300  hover:bg-[#4285F4] hover:bg-opacity-90`}
                      key={subj._id}
                    >
                      <div className='flex items-center space-x-4'>
                        <Icon.Book
                          className={
                            isActive
                              ? 'fill-[#252641] group-hover:fill-white md:fill-white'
                              : 'fill-[#252641] group-hover:fill-white'
                          }
                        />
                        <p
                          className={`max-w-[200px] truncate md:max-w-[96px] lg:max-w-[175px] xl:max-w-[200px] ${
                            isActive
                              ? 'text-[#252641] group-hover:text-white md:text-white'
                              : 'text-[#252641] group-hover:text-white'
                          }  `}
                        >
                          {subj.name}
                        </p>
                      </div>
                      <Icon.ChevronRight
                        className={`max-w-2 min-w-2 min-h-3 hidden h-auto max-h-3 md:block ${
                          isActive ? 'md:fill-white' : 'fill-[#252641] group-hover:fill-white'
                        } `}
                      />
                    </NavLink>
                  );
                })
              ) : (
                <Skeleton
                  count={8}
                  borderRadius={12}
                  className='h-12'
                  containerClassName='space-y-4'
                  baseColor='#DBEBFF'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentSideMenu;
