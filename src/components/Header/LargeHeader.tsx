import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as LargeLogoCTCT } from '../../assets/svgs/LargeLogoCTCT.svg';
import { useThrottle } from '../../hooks';
import useBoundStore from '../../store';
import Icon from '../Icon';
import LoginButton from '../LoginButton';

import SearchBar from './SearchBar';

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
    <div className='flex-column relative top-0 z-30 hidden w-full flex-wrap bg-white md:flex'>
      <div
        className='z-30 flex w-full flex-row items-center justify-between
        bg-white px-8 py-3 md:gap-x-10 md:px-5 lg:gap-x-[30px] lg:px-10 xl:px-[60px] 2xl:px-20 3xl:gap-x-20 3xl:px-[100px] 3xl:py-4'
      >
        <NavLink to='/' className='aspect-[107/60] h-[40px] w-auto 3xl:h-[48px]'>
          <LargeLogoCTCT className='aspect-[107/60] h-[40px] w-auto 3xl:h-[48px]' />
        </NavLink>
        <div className='relative flex h-full flex-row items-center justify-between md:gap-x-10 lg:gap-x-8 3xl:gap-x-10'>
          <SearchBar
            options={[
              {
                label: 'Tài liệu',
                value: '/library/material',
              },
              {
                label: 'Đề thi',
                value: '/library/exam-archive',
              },
              {
                label: 'Bài tập rèn luyện',
                value: '/room/exercises',
              },
              {
                label: 'Thi thử',
                value: '/room/tests',
              },
            ]}
            value={{ label: '', value: '' }}
          />
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
                    className='mr-4 h-10 w-10 rounded-full border-2
                    border-[#49BBBD] bg-white 3xl:mr-6 3xl:h-[52px] 3xl:w-[52px]'
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
                items-center justify-center rounded-lg bg-[#FBFCFF]
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
                  className='bg-inherit px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
                  onClick={throttledLibraryClick}
                >
                  <p
                    className='${ font-norma whitespace-nowrap bg-inherit 
                px-2 py-1 text-[14px] text-[#5B5B5B] transition-colors duration-300 ease-linear hover:text-black 3xl:px-3
                3xl:py-2 3xl:text-[18px]
                '
                  >
                    Thông tin của tôi
                  </p>
                </NavLink>
                <button
                  className='bg-inherit px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
                  onClick={logout}
                >
                  <p
                    className='whitespace-nowrap bg-inherit px-2 py-1 text-[14px] font-bold text-[#B42926] transition-all duration-300 ease-linear 3xl:px-3
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
      <nav
        className='z-20 flex w-full flex-row items-center justify-start bg-[#E3F2FD]
        px-1 transition-all duration-700 ease-out lg:px-6 xl:px-11 2xl:px-16 3xl:px-[68px]'
      >
        <NavLink
          to='/'
          end
          className='flex h-[100%] items-center justify-start 
          px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
        >
          <p
            className='whitespace-nowrap bg-inherit px-2 py-1
            text-[14px] transition-colors duration-300 ease-linear 3xl:px-3 3xl:py-2 3xl:text-[18px]'
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
            className='z-20 flex flex-row items-center justify-start
            px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
            onClick={throttledLibraryClick}
          >
            <p
              className='mr-[8px] whitespace-nowrap bg-inherit px-2 py-1 
              text-[14px] transition-colors duration-300 ease-linear 3xl:px-3 3xl:py-2 3xl:text-[18px]'
              style={{
                color:
                  pathname.includes('/library/material') ||
                  pathname.includes('/library/exam-archive')
                    ? '#FFFFFF'
                    : '#5B5B5B',
                backgroundColor:
                  pathname.includes('/library/material') ||
                  pathname.includes('/library/exam-archive')
                    ? '#4285f4'
                    : 'transparent',
                borderRadius: '8px',
              }}
            >
              Thư viện
            </p>
            <Icon.ChevronUp
              fill={
                pathname.includes('/library/material') || pathname.includes('/library/exam-archive')
                  ? '#3b3b3b'
                  : '#5B5B5B'
              }
              fillOpacity={0.87}
              className={`transform-all aspect-[10/7] h-auto w-[8px] duration-300 ${
                isLibraryOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
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
            className='z-20 flex flex-row items-center justify-start
            px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
            onClick={throttledRoomClick}
          >
            <p
              className='mr-[8px] bg-inherit px-2 py-1
              text-[14px] transition-colors duration-300 ease-linear 3xl:px-3 3xl:py-2 3xl:text-[18px]'
              style={{
                color:
                  pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                    ? '#FFFFFF'
                    : '#5B5B5B',
                backgroundColor:
                  pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                    ? '#4285f4'
                    : 'transparent',
                borderRadius: '8px',
              }}
            >
              Phòng thi
            </p>

            <Icon.ChevronUp
              fill={
                pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                  ? '#3b3b3b'
                  : '#5B5B5B'
              }
              fillOpacity={0.87}
              className={`transform-all aspect-[10/7] h-auto w-[8px] duration-300 ${
                isRoomOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
                  pathname.includes('/room/tests') ? '' : 'hover:bg-[#F1F1F1]'
                }`}
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
            className='z-20 flex flex-row items-center justify-start
            px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
            onClick={throttledAboutUsClick}
          >
            <p
              className='mr-[8px] whitespace-nowrap bg-inherit px-2 py-1 
              text-[14px] transition-colors duration-300 ease-linear 3xl:px-3 3xl:py-2 3xl:text-[18px]'
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
                  pathname === '/about-us' ? '' : 'hover:bg-[#F1F1F1]'
                }`}
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
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
                className={`w-full whitespace-nowrap bg-inherit px-6 py-3 text-center text-[14px] 
                transition-colors duration-300 ease-linear 3xl:px-11 3xl:py-5 3xl:text-[18px] ${
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
            className='flex h-[100%] items-center justify-start 
          px-[16px] py-[8px] 3xl:px-[32px] 3xl:py-[12px]'
          >
            <p
              className='whitespace-nowrap bg-inherit px-2 py-1
            text-[14px] transition-colors duration-300 ease-linear 3xl:px-3 3xl:py-2 3xl:text-[18px]'
              style={{
                color: pathname.includes('/admin') ? '#FFFFFF' : '#5B5B5B',
                backgroundColor: pathname.includes('/admin') ? '#4285f4' : 'transparent',
                borderRadius: '8px',
              }}
            >
              Admin
            </p>
          </NavLink>
        ) : null}
      </nav>
    </div>
  );
};

export default LargeHeader;
