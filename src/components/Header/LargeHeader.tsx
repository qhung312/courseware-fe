import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as LargeLogoCTCT } from '../../assets/svgs/LargeLogoCTCT.svg';
import { useThrottle } from '../../hooks';
import useBoundStore from '../../store';
import Icon from '../Icon';
import LoginButton from '../LoginButton';

const LargeHeader = () => {
  const { pathname } = useLocation();
  const libraryRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isProfileDrop, setIsProfileDrop] = useState(false);

  const isAuthenticated = useBoundStore.use.isAuthenticated();
  const user = useBoundStore.use.user();
  const logout = useBoundStore.use.logout();

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
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileDrop(false);
        }
      }
    });
  }, [libraryRef, roomRef, aboutUsRef, profileRef]);

  const onLibraryClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  const onRoomClick = () => {
    setIsRoomOpen(!isRoomOpen);
  };

  const onAboutUsClick = () => {
    setIsAboutUsOpen(!isAboutUsOpen);
  };

  const onProfileClick = () => setIsProfileDrop(!isProfileDrop);

  const throttledLibraryClick = useThrottle(onLibraryClick);
  const throttledRoomClick = useThrottle(onRoomClick);
  const throttledAboutUsClick = useThrottle(onAboutUsClick);

  return (
    <div
      className='relative top-0 z-30 hidden w-full flex-row flex-wrap items-center justify-between
        bg-white px-8 shadow-md md:flex md:px-5 lg:px-10 xl:px-20 3xl:px-[100px]'
    >
      <div className='flex flex-row text-[14px] md:text-[14px] lg:gap-x-4 xl:gap-x-6 xl:text-[16px] 2xl:gap-x-8 3xl:gap-x-10 3xl:text-[20px]'>
        <NavLink
          to='/'
          className='flex aspect-[107/60] min-h-[36px] w-auto flex-1 items-center py-3 lg:py-4'
        >
          <LargeLogoCTCT className='aspect-[107/60] h-[28px] w-auto  xl:h-[36px] 2xl:h-[42px]' />
        </NavLink>
        <nav className='z-20 flex w-full flex-row items-center justify-start transition-all duration-700 ease-out'>
          {/* <NavLink
            to='/'
            end
            className={`flex h-[100%] items-center justify-start border-b-[3px] 
            px-[16px] py-4 hover:text-black 3xl:px-[32px] ${
              pathname === '/'
                ? 'border-[#4285F4] text-black'
                : 'border-transparent text-[#5B5B5B]'
            }`}
          > */}
          <NavLink
            to='/'
            end
            className={`flex h-[100%] items-center justify-start 
            px-[16px] py-4 text-[#5B5B5B] hover:text-black 3xl:px-[32px]`}
          >
            <p
              className={`whitespace-nowrap border-b-[3px] bg-inherit px-2 py-1 text-inherit
            3xl:px-3 3xl:py-2 ${
              pathname === '/' ? 'border-[#4285F4] text-black' : 'border-transparent text-inherit'
            } `}
            >
              Trang chủ
            </p>
          </NavLink>
          <div className='relative' ref={libraryRef}>
            <button
              type='button'
              className={`flex h-[100%] items-center justify-start px-[16px] 
            py-4 text-[#5B5B5B] hover:text-black 3xl:px-[32px] `}
              onClick={throttledLibraryClick}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 border-b-[3px] p-0 px-2
                py-1  lg:gap-x-2 2xl:gap-x-3 3xl:px-3 3xl:py-2 ${
                  pathname.includes('/library/material') ||
                  pathname.includes('/library/exam-archive')
                    ? 'border-[#4285F4] text-black'
                    : 'border-transparent text-inherit'
                }`}
              >
                <p className={`whitespace-nowrap bg-inherit text-inherit`}>Thư viện</p>
                <Icon.ChevronUp
                  fill={
                    pathname.includes('/library/material') ||
                    pathname.includes('/library/exam-archive')
                      ? '#070707'
                      : '#5B5B5B'
                  }
                  fillOpacity={0.87}
                  className={`transform-all aspect-[10/7] h-auto w-[8px] duration-300 ${
                    isLibraryOpen ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
            </button>
            <nav
              className='absolute z-10 mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
            transition-all duration-300'
              style={{
                transform: isLibraryOpen ? 'translateY(0%)' : 'translateY(10%)',
                maxHeight: isLibraryOpen ? '1000px' : '0px',
                opacity: isLibraryOpen ? 1 : 0,
                overflow: 'hidden',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <NavLink
                to='/library/material'
                className='w-full bg-inherit'
                onClick={throttledLibraryClick}
              >
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center
                    3xl:px-11 3xl:py-5 ${
                      pathname.includes('/library/material') ? '' : 'hover:bg-[#F1F1F1]'
                    }`}
                  style={{
                    color: pathname.includes('/library/material') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/library/material') ? '700' : 'normal',
                  }}
                >
                  Tài liệu
                </p>
              </NavLink>
              <NavLink
                to='/library/exam-archive'
                className='w-full bg-inherit'
                onClick={throttledLibraryClick}
              >
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center 
                  3xl:px-11 3xl:py-5 ${
                    pathname.includes('/library/exam-archive') ? '' : 'hover:bg-[#F1F1F1]'
                  }`}
                  style={{
                    color: pathname.includes('/library/exam-archive') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/library/exam-archive') ? '700' : 'normal',
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
              className={`flex h-[100%] items-center justify-start 
            px-[16px] py-4 text-[#5B5B5B] hover:text-black 3xl:px-[32px]`}
              onClick={throttledRoomClick}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 border-b-[3px] p-0 px-2
            py-1 lg:gap-x-2 2xl:gap-x-3  3xl:px-3 3xl:py-2 ${
              pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                ? 'border-[#4285F4] text-black'
                : 'border-transparent text-inherit'
            }`}
              >
                <p className={`whitespace-nowrap bg-inherit text-inherit`}>Phòng thi</p>
                <Icon.ChevronUp
                  fill={
                    pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                      ? '#070707'
                      : '#5B5B5B'
                  }
                  fillOpacity={0.87}
                  className={`transform-all aspect-[10/7] h-auto w-[8px] duration-300 ${
                    isRoomOpen ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
            </button>
            <nav
              className='absolute z-10 mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
            transition-all duration-300'
              style={{
                transform: isRoomOpen ? 'translateY(0%)' : 'translateY(10%)',
                maxHeight: isRoomOpen ? '1000px' : '0px',
                opacity: isRoomOpen ? 1 : 0,
                overflow: 'hidden',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <NavLink
                to='/room/exercises'
                className='w-full bg-inherit'
                onClick={throttledRoomClick}
              >
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center 
                3xl:px-11 3xl:py-5 ${
                  pathname.includes('/room/exercises') ? '' : 'hover:bg-[#F1F1F1]'
                }`}
                  style={{
                    color: pathname.includes('/room/exercises') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/room/exercises') ? '700' : 'normal',
                  }}
                >
                  Bài tập rèn luyện
                </p>
              </NavLink>
              <NavLink to='/room/tests' className='w-full bg-inherit' onClick={throttledRoomClick}>
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center
                3xl:px-11 3xl:py-5 ${pathname.includes('/room/tests') ? '' : 'hover:bg-[#F1F1F1]'}`}
                  style={{
                    color: pathname.includes('/room/tests') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/room/tests') ? '700' : 'normal',
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
              className={`flex h-[100%] items-center justify-start
            px-[16px] py-4 text-[#5B5B5B] hover:text-black 3xl:px-[32px]`}
              onClick={throttledAboutUsClick}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 border-b-[3px] p-0 px-2
                py-1 lg:gap-x-2 2xl:gap-x-3 3xl:px-3 3xl:py-2 ${
                  pathname === '/about-us' ||
                  pathname === '/about-us/activities' ||
                  pathname === '/about-us/partners'
                    ? 'border-[#4285F4] text-black'
                    : 'border-transparent text-inherit'
                }`}
              >
                <p className='whitespace-nowrap bg-inherit text-inherit'>Về chúng tôi</p>

                <Icon.ChevronUp
                  fill={
                    pathname === '/about-us' ||
                    pathname === '/about-us/activities' ||
                    pathname === '/about-us/partners'
                      ? '#3b3b3b'
                      : '#5B5B5B'
                  }
                  fillOpacity={0.87}
                  className={`transform-all aspect-[10/7] h-auto w-[8px] duration-300 ${
                    isAboutUsOpen ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </div>
            </button>
            <nav
              className='absolute z-10 mt-1 flex w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
            transition-all duration-300'
              style={{
                transform: isAboutUsOpen ? 'translateY(0%)' : 'translateY(10%)',
                maxHeight: isAboutUsOpen ? '1000px' : '0px',
                opacity: isAboutUsOpen ? 1 : 0,
                overflow: 'hidden',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <NavLink to='/about-us' className='w-full bg-inherit' onClick={throttledAboutUsClick}>
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center 
                3xl:px-11 3xl:py-5 ${pathname === '/about-us' ? '' : 'hover:bg-[#F1F1F1]'}`}
                  style={{
                    color: pathname === '/about-us' ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname === '/about-us' ? '700' : 'normal',
                  }}
                >
                  Giới thiệu
                </p>
              </NavLink>
              <NavLink
                to='/about-us/activities'
                className='w-full bg-inherit'
                onClick={throttledAboutUsClick}
              >
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center
                3xl:px-11 3xl:py-5 ${
                  pathname.includes('/about-us/activities') ? '' : 'hover:bg-[#F1F1F1]'
                }`}
                  style={{
                    color: pathname.includes('/about-us/activities') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/about-us/activities') ? '700' : 'normal',
                  }}
                >
                  Hoạt động
                </p>
              </NavLink>
              <NavLink
                to='/about-us/partners'
                className='w-full bg-inherit'
                onClick={throttledAboutUsClick}
              >
                <p
                  className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center
                3xl:px-11 3xl:py-5 ${
                  pathname.includes('/about-us/partners') ? '' : 'hover:bg-[#F1F1F1]'
                }`}
                  style={{
                    color: pathname.includes('/about-us/partners') ? '#3b3b3b' : 'inherit',
                    fontWeight: pathname.includes('/about-us/partners') ? '700' : 'normal',
                  }}
                >
                  Đơn vị hợp tác
                </p>
              </NavLink>
            </nav>
          </div>
          {isAuthenticated &&
          (user.isManager ||
            _.some(user.accessLevels, (accessLevel) => accessLevel.name.includes('ADMIN'))) ? (
            <NavLink
              to='/admin'
              end
              className={`flex h-[100%] items-center justify-start 
            px-[16px] py-4 text-[#5B5B5B] hover:text-black 3xl:px-[32px]`}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 border-b-[3px] p-0 px-2
                py-1 lg:gap-x-2 2xl:gap-x-3 3xl:px-3 3xl:py-2 ${
                  pathname.includes('/admin')
                    ? 'border-[#4285F4] text-black'
                    : 'border-transparent text-inherit'
                }`}
              >
                <p className='whitespace-nowrap bg-inherit text-inherit'>Admin</p>
              </div>
            </NavLink>
          ) : null}
        </nav>
      </div>
      <div className='relative flex h-full flex-row items-center justify-end md:gap-x-10 lg:gap-x-8 3xl:gap-x-10'>
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <>
            <div ref={profileRef}>
              <button
                className='flex flex-row items-center justify-center'
                onClick={onProfileClick}
              >
                <img
                  alt='profile_pic'
                  src={user?.picture || require('../../assets/images/AvatarPic.png')}
                  className='mr-4 h-8 w-8 rounded-full border-2
                    border-[#49BBBD] bg-white 2xl:h-[40px] 2xl:w-[40px] 3xl:mr-6 3xl:h-[44px] 3xl:w-[44px]'
                />
                <Icon.ChevronUp
                  fill={'#3b3b3b'}
                  fillOpacity={0.87}
                  className={`transform-all aspect-[10/7] h-auto w-2 duration-300 ${
                    isProfileDrop ? 'rotate-0' : 'rotate-180'
                  }`}
                />
              </button>
            </div>
            <nav
              className='set-11 absolute right-0 top-[136%] z-10 mt-1 flex w-[200px] flex-col 
                 rounded-lg bg-[#FBFCFF]
                transition-all duration-300'
              style={{
                transform: isProfileDrop ? 'translateY(0%)' : 'translateY(10%)',
                maxHeight: isProfileDrop ? '1000px' : '0px',
                opacity: isProfileDrop ? 1 : 0,
                overflow: 'hidden',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <NavLink
                to='/profile'
                end
                className='flex w-full items-center justify-center bg-inherit px-[16px] py-[8px] text-[#5B5B5B] hover:bg-[#F1F1F1] 3xl:px-[32px] 3xl:py-[12px]'
                onClick={throttledLibraryClick}
              >
                <p
                  className='whitespace-nowrap bg-inherit px-2 
                py-1 text-[14px] font-normal 3xl:px-3
                3xl:py-2 3xl:text-[18px]
                '
                >
                  Thông tin của tôi
                </p>
              </NavLink>
              <button
                className='bg-inherit px-[16px] py-[8px] hover:bg-[#F1F1F1] 3xl:px-[32px] 3xl:py-[12px]'
                onClick={logout}
              >
                <p
                  className='whitespace-nowrap bg-inherit px-2 py-1 text-[14px] font-bold text-[#B42926] 3xl:px-3
                    3xl:py-2 3xl:text-[18px]'
                >
                  Đăng xuất
                </p>
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default LargeHeader;
