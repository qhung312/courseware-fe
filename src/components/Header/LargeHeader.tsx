import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as LargeLogoCTCT } from '../../assets/svgs/LargeLogoCTCT.svg';
import { useThrottle } from '../../hooks';
import Icon from '../Icon';

const LargeHeader = () => {
  const { pathname } = useLocation();
  const libraryRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  const [isLibraryOpen, setIsLibraryOpen] = useState(
    pathname === '/library/documents' || pathname === '/library/tests'
  );
  const [isRoomOpen, setIsRoomOpen] = useState(
    pathname === '/room/exercises' || pathname === '/room/tests'
  );
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(
    pathname === '/about-us' ||
      pathname === '/about-us/activities' ||
      pathname === '/about-us/partners'
  );

  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        if (libraryRef.current && !libraryRef.current.contains(event.target)) {
          setIsLibraryOpen(false);
        }
        if (roomRef.current && !roomRef.current.contains(event.target)) {
          setIsRoomOpen(false);
        }
        if (aboutUsRef.current && !aboutUsRef.current.contains(event.target)) {
          setIsAboutUsOpen(false);
        }
      }
    });
  }, [libraryRef, roomRef, aboutUsRef]);

  const onLibraryClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  const onRoomClick = () => {
    setIsRoomOpen(!isRoomOpen);
  };

  const onAboutUsClick = () => {
    setIsAboutUsOpen(!isAboutUsOpen);
  };

  const throttledLibraryClick = useThrottle(onLibraryClick);
  const throttledRoomClick = useThrottle(onRoomClick);
  const throttledAboutUsClick = useThrottle(onAboutUsClick);

  return (
    <header className='hidden md:flex flex-column fixed flex-wrap w-[100vw] bg-white z-30 top-0'>
      <div
        className='flex flex-row justify-between items-center w-[100%]
      px-[16px] py-[12px] xl:px-[32px] xl:py-[16px] z-[2]'
      >
        <LargeLogoCTCT className='h-[40px] w-auto aspect-[107/60] xl:h-[48px]' />
        <div className='flex flex-row gap-x-[52px]'>
          <div className='flex flex-row items-center relative'>
            <input
              className='bg-inherit rounded-[40px] border border-[#49BBBD] py-[8px]
              pl-[20px] pr-[60px] xl:pl-[24px] xl:pr-[72px] xl:py-[12px]
              w-[400px] xl:w-[500px]'
            />
            <button
              type='button'
              className='w-[16px] xl:w-[24px] absolute right-[16px] xl:right-[24px]'
            >
              <Icon.Search className='w-[16px] xl:w-[24px] h-auto aspect-square' />
            </button>
          </div>
          <button className='flex flex-row justify-center items-center'>
            <div
              className='rounded-[999px] bg-[#979797] h-[32px] w-[32px] mr-[16px]
              xl:h-[42px] xl:w-[42px] xl:mr-[24px]'
            />
            <p className='bg-inherit mr-[12px] text-[#5B5B5B] xl:text-[20px]'>User</p>
            <Icon.ChevronDown fill='#5B5B5B' />
          </button>
        </div>
      </div>
      <nav
        className='flex flex-row justify-start items-center bg-[#E3F2FD] w-[100%]
        z-[2]'
      >
        <NavLink
          to='/'
          end
          className='flex justify-start items-center h-[100%] 
          px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
        >
          <p
            className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap
            px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
            style={{
              color: pathname === '/' ? '#FFFFFF' : '#5B5B5B',
              backgroundColor: pathname === '/' ? '#4285f4' : 'transparent',
              borderRadius: '8px',
            }}
          >
            Trang chủ
          </p>
        </NavLink>
        <div className='relative' ref={libraryRef}>
          <button
            type='button'
            className='flex flex-row justify-start items-center z-[2]
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledLibraryClick}
          >
            <p
              className='bg-inherit mr-[8px] text-[14px] xl:text-[18px] whitespace-nowrap 
              px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
              style={{
                color:
                  pathname === '/library/documents' || pathname === '/library/tests'
                    ? '#FFFFFF'
                    : '#5B5B5B',
                backgroundColor:
                  pathname === '/library/documents' || pathname === '/library/tests'
                    ? '#4285f4'
                    : 'transparent',
                borderRadius: '8px',
              }}
            >
              Thư viện
            </p>
            {isLibraryOpen ? (
              <Icon.ChevronUp
                fill={
                  pathname === '/library/documents' || pathname === '/library/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname === '/library/documents' || pathname === '/library/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            )}
          </button>
          <nav
            className='flex flex-col absolute justify-center items-center z-[1] 
            bg-[#FBFCFF] mt-1 rounded-lg w-[120%]
            transition-all ease-in-out'
            style={{
              transform: isLibraryOpen ? 'translateY(0%)' : 'translateY(10%)',
              maxHeight: isLibraryOpen ? '1000px' : '0px',
              opacity: isLibraryOpen ? 1 : 0,
              overflow: 'hidden',
              transitionDuration: isLibraryOpen ? '1.2s' : '0.8s',
              boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <NavLink
              to='/library/documents'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledLibraryClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap 
                px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/library/documents' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/library/documents' ? '700' : 'normal',
                }}
              >
                Tài liệu
              </p>
            </NavLink>
            <NavLink
              to='/library/tests'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledLibraryClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap 
                px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/library/tests' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/library/tests' ? '700' : 'normal',
                }}
              >
                Đề thi
              </p>
            </NavLink>
          </nav>
        </div>
        <div className='relative' ref={roomRef}>
          <button
            type='button'
            className='flex flex-row justify-start items-center z-[2]
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledRoomClick}
          >
            <p
              className='bg-inherit mr-[8px] text-[14px] xl:text-[18px]
              px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
              style={{
                color:
                  pathname === '/room/exercises' || pathname === '/room/tests'
                    ? '#FFFFFF'
                    : '#5B5B5B',
                backgroundColor:
                  pathname === '/room/exercises' || pathname === '/room/tests'
                    ? '#4285f4'
                    : 'transparent',
                borderRadius: '8px',
              }}
            >
              Phòng thi
            </p>
            {isRoomOpen ? (
              <Icon.ChevronUp
                fill={
                  pathname === '/room/exercises' || pathname === '/room/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname === '/room/exercises' || pathname === '/room/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            )}
          </button>
          <nav
            className='flex flex-col justify-center items-center absolute z-[1] 
            bg-[#FBFCFF] mt-1 rounded-lg w-[120%]
            transition-all ease-in-out'
            style={{
              transform: isRoomOpen ? 'translateY(0%)' : 'translateY(10%)',
              maxHeight: isRoomOpen ? '1000px' : '0px',
              opacity: isRoomOpen ? 1 : 0,
              overflow: 'hidden',
              transitionDuration: isRoomOpen ? '1.2s' : '0.8s',
              boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <NavLink
              to='/room/exercises'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledRoomClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap 
                px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/room/exercises' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/room/exercises' ? '700' : 'normal',
                }}
              >
                Bài tập rèn luyện
              </p>
            </NavLink>
            <NavLink
              to='/room/tests'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledRoomClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap 
                px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/room/tests' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/room/tests' ? '700' : 'normal',
                }}
              >
                Thi thử
              </p>
            </NavLink>
          </nav>
        </div>
        <div className='relative' ref={aboutUsRef}>
          <button
            type='button'
            className='flex flex-row justify-start items-center z-[2]
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledAboutUsClick}
          >
            <p
              className='bg-inherit mr-[8px] text-[14px] xl:text-[18px] whitespace-nowrap 
              px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
              style={{
                color:
                  pathname === '/about-us' ||
                  pathname === '/about-us/activities' ||
                  pathname === '/about-us/partners'
                    ? '#FFFFFF'
                    : '#5B5B5B',
                backgroundColor:
                  pathname === '/about-us' ||
                  pathname === '/about-us/activities' ||
                  pathname === '/about-us/partners'
                    ? '#4285f4'
                    : 'transparent',
                borderRadius: '8px',
              }}
            >
              Về chúng tôi
            </p>
            {isAboutUsOpen ? (
              <Icon.ChevronUp
                fill={
                  pathname === '/about-us' ||
                  pathname === '/about-us/activities' ||
                  pathname === '/about-us/partners'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname === '/about-us' ||
                  pathname === '/about-us/activities' ||
                  pathname === '/about-us/partners'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='w-[8px] h-auto aspect-[10/7]'
              />
            )}
          </button>
          <nav
            className='flex flex-col justify-center items-center absolute z-[1] 
            bg-[#FBFCFF] mt-1 rounded-lg w-[120%]
            transition-all ease-in-out'
            style={{
              transform: isAboutUsOpen ? 'translateY(0%)' : 'translateY(10%)',
              maxHeight: isAboutUsOpen ? '1000px' : '0px',
              opacity: isAboutUsOpen ? 1 : 0,
              overflow: 'hidden',
              transitionDuration: isAboutUsOpen ? '1.2s' : '0.8s',
              boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <NavLink
              to='/about-us'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledAboutUsClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/about-us' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/about-us' ? '700' : 'normal',
                }}
              >
                Giới thiệu
              </p>
            </NavLink>
            <NavLink
              to='/about-us/activities'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledAboutUsClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/about-us/activities' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/about-us/activities' ? '700' : 'normal',
                }}
              >
                Hoạt động
              </p>
            </NavLink>
            <NavLink
              to='/about-us/partners'
              end
              className='bg-inherit px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
              onClick={throttledAboutUsClick}
            >
              <p
                className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
                style={{
                  color: pathname === '/about-us/partners' ? '#3b3b3b' : '#5B5B5B',
                  fontWeight: pathname === '/about-us/partners' ? '700' : 'normal',
                }}
              >
                Đơn vị hợp tác
              </p>
            </NavLink>
          </nav>
        </div>
        <NavLink
          to='/help'
          end
          className='flex justify-start items-center h-[100%]
          px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
        >
          <p
            className='bg-inherit text-[14px] xl:text-[18px] whitespace-nowrap 
            px-2 py-1 xl:px-3 xl:py-2 transition-colors ease-linear duration-300'
            style={{
              color: pathname === '/help' ? '#FFFFFF' : '#5B5B5B',
              backgroundColor: pathname === '/help' ? '#4285f4' : 'transparent',
              borderRadius: '8px',
            }}
          >
            Hỗ trợ
          </p>
        </NavLink>
      </nav>
    </header>
  );
};

export default LargeHeader;
