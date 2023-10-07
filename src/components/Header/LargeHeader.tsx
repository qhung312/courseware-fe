import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as LargeLogoCTCT } from '../../assets/svgs/LargeLogoCTCT.svg';
import { useThrottle } from '../../hooks';
import { getOffset } from '../../utils/helper';
import Icon from '../Icon';

const LargeHeader = () => {
  const { pathname } = useLocation();
  const libraryRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

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
  const [prevYOffset, setPrevYOffset] = useState(0);

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

  useEffect(() => {
    const listenToScroll = () => {
      if (navRef.current) {
        const currentYOffset = getOffset(navRef);
        if (currentYOffset > prevYOffset) {
          navRef.current.style.maxHeight = '0';
        } else {
          navRef.current.style.maxHeight = '1000px';
        }
        setPrevYOffset(currentYOffset);
      }
    };

    window.addEventListener('scroll', listenToScroll);

    return () => window.removeEventListener('scroll', listenToScroll);
  }, [navRef, prevYOffset]);

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
    <header className='flex-column fixed top-0 z-30 hidden w-[100vw] flex-wrap bg-white md:flex'>
      <div
        className='z-[3] flex w-[100%] flex-row items-center justify-between
        bg-white px-[16px] py-[12px] xl:px-[32px] xl:py-[16px]'
      >
        <LargeLogoCTCT className='aspect-[107/60] h-[40px] w-auto xl:h-[48px]' />
        <div className='flex flex-row gap-x-[52px]'>
          <div className='relative flex flex-row items-center'>
            <input
              className='w-[400px] rounded-[40px] border border-[#49BBBD] bg-inherit
              py-[8px] pl-[20px] pr-[60px] xl:w-[500px] xl:py-[12px]
              xl:pl-[24px] xl:pr-[72px]'
            />
            <button
              type='button'
              className='absolute right-[16px] w-[16px] xl:right-[24px] xl:w-[24px]'
            >
              <Icon.Search className='aspect-square h-auto w-[16px] xl:w-[24px]' />
            </button>
          </div>
          <button className='flex flex-row items-center justify-center'>
            <div
              className='mr-[16px] h-[32px] w-[32px] rounded-[999px] bg-[#979797]
              xl:mr-[24px] xl:h-[42px] xl:w-[42px]'
            />
            <p className='mr-[12px] bg-inherit text-[#5B5B5B] xl:text-[20px]'>User</p>
            <Icon.ChevronDown fill='#5B5B5B' />
          </button>
        </div>
      </div>
      <nav
        ref={navRef}
        className='z-[2] flex w-[100%] flex-row items-center justify-start overflow-hidden bg-[#E3F2FD]
        transition-all duration-700 ease-out'
      >
        <NavLink
          to='/'
          end
          className='flex h-[100%] items-center justify-start 
          px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
        >
          <p
            className='whitespace-nowrap bg-inherit px-2 py-1
            text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
            className='z-[2] flex flex-row items-center justify-start
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledLibraryClick}
          >
            <p
              className='mr-[8px] whitespace-nowrap bg-inherit px-2 py-1 
              text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='aspect-[10/7] h-auto w-[8px]'
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname === '/library/documents' || pathname === '/library/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='aspect-[10/7] h-auto w-[8px]'
              />
            )}
          </button>
          <nav
            className='absolute z-[1] mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
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
                className='whitespace-nowrap bg-inherit px-2 py-1 
                text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='whitespace-nowrap bg-inherit px-2 py-1 
                text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
            className='z-[2] flex flex-row items-center justify-start
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledRoomClick}
          >
            <p
              className='mr-[8px] bg-inherit px-2 py-1
              text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='aspect-[10/7] h-auto w-[8px]'
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname === '/room/exercises' || pathname === '/room/tests'
                    ? '#3b3b3b'
                    : '#5B5B5B'
                }
                fillOpacity={0.87}
                className='aspect-[10/7] h-auto w-[8px]'
              />
            )}
          </button>
          <nav
            className='absolute z-[1] mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
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
                className='whitespace-nowrap bg-inherit px-2 py-1 
                text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='whitespace-nowrap bg-inherit px-2 py-1 
                text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
            className='z-[2] flex flex-row items-center justify-start
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
            onClick={throttledAboutUsClick}
          >
            <p
              className='mr-[8px] whitespace-nowrap bg-inherit px-2 py-1 
              text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='aspect-[10/7] h-auto w-[8px]'
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
                className='aspect-[10/7] h-auto w-[8px]'
              />
            )}
          </button>
          <nav
            className='absolute z-[1] mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
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
                className='whitespace-nowrap bg-inherit px-2 py-1 text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='whitespace-nowrap bg-inherit px-2 py-1 text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
                className='whitespace-nowrap bg-inherit px-2 py-1 text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
          className='flex h-[100%] items-center justify-start
            px-[16px] py-[8px] xl:px-[32px] xl:py-[12px]'
        >
          <p
            className='whitespace-nowrap bg-inherit px-2 py-1 
              text-[14px] transition-colors duration-300 ease-linear xl:px-3 xl:py-2 xl:text-[18px]'
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
