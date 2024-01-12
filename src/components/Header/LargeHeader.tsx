import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useThrottle } from '../../hooks';
import useBoundStore from '../../store';
import Icon from '../Icon';
import LoginButton from '../LoginButton';

const LargeHeader = () => {
  const { pathname } = useLocation();
  const libraryRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
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
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileDrop(false);
        }
      }
    });
  }, [libraryRef, roomRef, profileRef]);

  const onLibraryClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  const onProfileClick = () => setIsProfileDrop(!isProfileDrop);
  const onLogout = () => {
    logout();
    setIsProfileDrop(false);
  };

  const throttledLibraryClick = useThrottle(onLibraryClick);

  return (
    <div
      className='relative top-0 z-30 hidden w-full flex-row flex-wrap items-center justify-between
        bg-white px-8 shadow-md md:flex md:px-5 lg:px-10 xl:px-20 3xl:px-[100px]'
    >
      <div className='flex flex-row text-[14px] md:text-[14px] lg:gap-x-4 xl:gap-x-6 xl:text-[16px] 2xl:gap-x-8 3xl:gap-x-10 3xl:text-[20px]'>
        <NavLink
          to='/'
          className='flex aspect-square min-h-[36px] w-auto flex-1 items-center py-3 lg:py-4'
        >
          <Icon.LogoBK className='aspect-square h-10 w-auto xl:h-12 3xl:h-14' />
        </NavLink>
        <nav className='z-20 flex w-full flex-row items-center justify-start transition-all duration-700 ease-out'>
          <NavLink
            to='/'
            end
            className={`group flex h-[100%] items-center justify-start border-b-[3px] 
            px-[16px] py-4 hover:text-black 3xl:px-[32px] ${
              pathname === '/' ? 'border-[#030391] text-black' : 'border-transparent text-[#5B5B5B]'
            }`}
          >
            <p className={`whitespace-nowrap bg-inherit px-2 py-1 text-inherit 3xl:px-3 3xl:py-2`}>
              Trang chủ
            </p>
          </NavLink>
          <div className='relative' ref={libraryRef}>
            <button
              type='button'
              className={`flex h-[100%] items-center justify-start border-b-[3px] 
            px-[16px] py-4 hover:text-black 3xl:px-[32px] ${
              pathname.includes('/library/material') || pathname.includes('/library/exam-archive')
                ? 'border-[#030391] text-black'
                : 'border-transparent text-[#5B5B5B]'
            }`}
              onClick={throttledLibraryClick}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 p-0 px-2 py-1
                text-inherit  lg:gap-x-2 2xl:gap-x-3 3xl:px-3 3xl:py-2 `}
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
              className='absolute z-10 mt-1 flex w-fit min-w-[120%] flex-col 
            items-center justify-center rounded-lg bg-[#FBFCFF]
            transition-all duration-300 ease-linear'
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
                    transition-all duration-500 3xl:px-11 3xl:py-5 ${
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
                  transition-all duration-500 3xl:px-11 3xl:py-5 ${
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
          <NavLink
            to='/room/exercises'
            end
            className={`group flex h-[100%] items-center justify-start border-b-[3px] 
            px-[16px] py-4 hover:text-black 3xl:px-[32px] ${
              pathname === '/room/exercises'
                ? 'border-[#030391] text-black'
                : 'border-transparent text-[#5B5B5B]'
            }`}
          >
            <p className={`whitespace-nowrap bg-inherit px-2 py-1 text-inherit 3xl:px-3 3xl:py-2`}>
              Bài tập rèn luyện
            </p>
          </NavLink>
          {isAuthenticated &&
          (user.isManager ||
            _.some(user.accessLevels, (accessLevel) => accessLevel.name.includes('ADMIN'))) ? (
            <NavLink
              to='/admin'
              end
              className={`flex h-[100%] items-center justify-start border-b-[3px]
            px-[16px] py-4 hover:text-black 3xl:px-[32px] ${
              pathname.includes('/admin')
                ? 'border-[#030391] text-black'
                : 'border-transparent text-[#5B5B5B]'
            }`}
            >
              <div
                className={`flex flex-row items-center justify-start gap-x-1 p-0 px-2 py-1
                text-inherit lg:gap-x-2 2xl:gap-x-3 3xl:px-3 3xl:py-2 `}
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
                onClick={onLogout}
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
