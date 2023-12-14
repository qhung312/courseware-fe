import _ from 'lodash';
import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as MediumLogoCTCT } from '../../assets/svgs/MediumLogoCTCT.svg';
import { useDebounce, useThrottle } from '../../hooks';
import useBoundStore from '../../store';
import Icon from '../Icon';
import LoginButton from '../LoginButton';

const MediumHeader = () => {
  const style: CSSProperties = {
    height: '32px',
    width: '32px',
  };
  const options: LottieOptions<'svg'> = {
    animationData: require('../../assets/animations/Hamburger.json'),
    loop: false,
    autoplay: false,
  };

  const { View, playSegments } = useLottie(options, style);
  const { pathname } = useLocation();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(
    pathname.includes('/library/material') || pathname.includes('/library/exam-archive')
  );
  const [isRoomOpen, setIsRoomOpen] = useState(
    pathname.includes('/room/exercises') || pathname.includes('/room/tests')
  );
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(
    pathname === '/about-us' ||
      pathname.includes('/about-us/activities') ||
      pathname === '/about-us/partners'
  );

  const isAuthenticated = useBoundStore.use.isAuthenticated();
  const user = useBoundStore.use.user();
  const logout = useBoundStore.use.logout();

  const onClick = () => {
    isOverlayOpen ? playSegments([60, 30], true) : playSegments([30, 60], true);
    setIsOverlayOpen(!isOverlayOpen);
    setIsLibraryOpen(false);
    setIsRoomOpen(false);
    setIsAboutUsOpen(false);
  };

  const onLibraryClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
    setIsRoomOpen(false);
    setIsAboutUsOpen(false);
  };

  const onRoomClick = () => {
    setIsLibraryOpen(false);
    setIsRoomOpen(!isRoomOpen);
    setIsAboutUsOpen(false);
  };

  const onAboutUsClick = () => {
    setIsAboutUsOpen(!isAboutUsOpen);
  };

  const onLogout = () => {
    logout();
    setIsOverlayOpen(false);
    setIsLibraryOpen(false);
    setIsRoomOpen(false);
    setIsAboutUsOpen(false);
    playSegments([60, 30], true);
  };

  const throttledOnClick = useThrottle(onClick);
  const throttledLibraryClick = useThrottle(onLibraryClick);
  const throttledRoomClick = useThrottle(onRoomClick);
  const throttledAboutUsClick = useThrottle(onAboutUsClick);
  const debouncedLogout = useDebounce(onLogout);

  return (
    <>
      <div className='relative top-0 z-50 w-full'>
        <div
          className='relative z-40 flex h-[72px] w-full flex-row items-center
          justify-between bg-[#f5f7fc]
          px-[20px] py-[16px] md:hidden'
          style={{ boxShadow: isOverlayOpen ? '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' : 'none' }}
        >
          <NavLink
            to='/'
            onClick={() =>
              setTimeout(() => {
                isOverlayOpen && playSegments([60, 30], true);
                setIsOverlayOpen(false);
                setIsLibraryOpen(false);
                setIsRoomOpen(false);
                setIsAboutUsOpen(false);
              }, 500)
            }
            className='aspect-[107/60] h-[40px] w-auto xl:h-[48px]'
          >
            <MediumLogoCTCT />
          </NavLink>
          <button type='button' onClick={throttledOnClick}>
            {View}
          </button>
        </div>
        <div
          className='with-nav-height absolute z-30 flex w-full flex-col items-center justify-start
          gap-y-[24px] overflow-scroll overscroll-none whitespace-nowrap bg-white px-[20px]
          py-[16px] transition-all duration-[900ms] ease-in-out
          md:hidden'
          style={{
            transform: isOverlayOpen ? 'translateY(0%)' : 'translateY(calc(-100vh - 72px))',
            height: 'calc(100vh - 72px)',
          }}
        >
          {/* <div className='relative flex w-full flex-row items-center justify-center'>
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
          </div> */}
          <nav className='flex w-full flex-col items-center gap-y-[12px]'>
            <NavLink
              to='/'
              end
              className='z-20 flex w-full flex-row items-center justify-start
            gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
              onClick={() => setTimeout(throttledOnClick, 1000)}
            >
              {({ isActive, isPending }) => (
                <>
                  <Icon.Home fill={isActive || isPending ? '#4285F4' : '#696969'} />
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>Trang chủ</p>
                </>
              )}
            </NavLink>
            <div className='flex h-[fit-content] w-full flex-col bg-white'>
              <button
                className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledLibraryClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.Library
                    fill={
                      pathname.includes('/library/material') ||
                      pathname.includes('/library/exam-archive')
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname.includes('/library/material') ||
                        pathname.includes('/library/exam-archive')
                          ? '#4285F4'
                          : '#696969',
                    }}
                  >
                    Thư viện
                  </p>
                </div>
                {isLibraryOpen ? (
                  <Icon.ChevronUp
                    fill={
                      pathname.includes('/library/material') ||
                      pathname.includes('/library/exam-archive')
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname.includes('/library/material') ||
                      pathname.includes('/library/exam-archive')
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                )}
              </button>
              <nav
                className='flex flex-col pl-[40px] transition-all ease-in-out'
                style={{
                  maxHeight: isLibraryOpen ? '300px' : '0px',
                  overflow: 'hidden',
                  transitionDuration: isLibraryOpen ? '1.2s' : '0.8s',
                }}
              >
                <NavLink
                  to='/library/material'
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsLibraryOpen(!isLibraryOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Document fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Tài liệu
                      </p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to='/library/exam-archive'
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsLibraryOpen(!isLibraryOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Quiz fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>Đề thi</p>
                    </>
                  )}
                </NavLink>
              </nav>
            </div>
            <div className='flex h-[fit-content] w-full flex-col bg-white'>
              <button
                className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledRoomClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.Room
                    fill={
                      pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                          ? '#4285F4'
                          : '#696969',
                    }}
                  >
                    Phòng thi
                  </p>
                </div>
                {isRoomOpen ? (
                  <Icon.ChevronUp
                    fill={
                      pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname.includes('/room/exercises') || pathname.includes('/room/tests')
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                )}
              </button>
              <nav
                className='flex flex-col pl-[40px] transition-all ease-in-out'
                style={{
                  maxHeight: isRoomOpen ? '300px' : '0px',
                  overflow: 'hidden',
                  transitionDuration: isRoomOpen ? '1.2s' : '0.8s',
                }}
              >
                <NavLink
                  to='/room/exercises'
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsRoomOpen(!isRoomOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Exercise fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Bài tập rèn luyện
                      </p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to='/room/tests'
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsRoomOpen(!isRoomOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Test fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Thi thử
                      </p>
                    </>
                  )}
                </NavLink>
              </nav>
            </div>
            <div className='flex h-[fit-content] w-full flex-col bg-white'>
              <button
                className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledAboutUsClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.AboutUs
                    fill={
                      pathname === '/about-us' ||
                      pathname.includes('/about-us/activities') ||
                      pathname === '/about-us/partners'
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname === '/about-us' ||
                        pathname.includes('/about-us/activities') ||
                        pathname === '/about-us/partners'
                          ? '#4285F4'
                          : '#696969',
                    }}
                  >
                    Về chúng tôi
                  </p>
                </div>
                {isAboutUsOpen ? (
                  <Icon.ChevronUp
                    fill={
                      pathname === '/about-us' ||
                      pathname.includes('/about-us/activities') ||
                      pathname === '/about-us/partners'
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname === '/about-us' ||
                      pathname.includes('/about-us/activities') ||
                      pathname === '/about-us/partners'
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                )}
              </button>
              <nav
                className='flex flex-col pl-[40px] transition-all ease-in-out'
                style={{
                  maxHeight: isAboutUsOpen ? '300px' : '0px',
                  overflow: 'hidden',
                  transitionDuration: isAboutUsOpen ? '1.2s' : '0.8s',
                }}
              >
                <NavLink
                  to='/about-us'
                  end
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsAboutUsOpen(!isAboutUsOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Introduction fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Giới thiệu
                      </p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to='/about-us/activities'
                  end
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsAboutUsOpen(!isAboutUsOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Activity fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Hoạt động
                      </p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to='/about-us/partners'
                  end
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={useDebounce(() => {
                    setIsOverlayOpen(false);
                    setIsAboutUsOpen(!isAboutUsOpen);
                    playSegments([60, 30], true);
                  })}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Partner fill={isActive || isPending ? '#4285F4' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Đơn vị hợp tác
                      </p>
                    </>
                  )}
                </NavLink>
              </nav>
            </div>
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated &&
            (user.isManager ||
              _.some(user.accessLevels, (accessLevel) => accessLevel.name.includes('ADMIN'))) ? (
              <NavLink
                to='/admin'
                className='z-20 flex w-full flex-row items-center justify-start
            gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                style={({ isActive, isPending }) => ({
                  backgroundColor:
                    isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                })}
                onClick={() => setTimeout(throttledOnClick, 1000)}
              >
                {({ isActive, isPending }) => (
                  <>
                    <Icon.Admin fill={isActive || isPending ? '#4285F4' : '#696969'} />
                    <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>Admin</p>
                  </>
                )}
              </NavLink>
            ) : null}
            {isAuthenticated && (
              <>
                <NavLink
                  to='/profile'
                  className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
                  style={({ isActive, isPending }) => ({
                    backgroundColor:
                      isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
                  })}
                  onClick={() => setTimeout(throttledOnClick, 1000)}
                >
                  {({ isActive, isPending }) => (
                    <>
                      <Icon.Profile
                        fill={isActive || isPending ? '#4285F4' : '#696969'}
                        className='aspect-square w-6'
                      />
                      <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                        Thông tin của tôi
                      </p>
                    </>
                  )}
                </NavLink>
                <button
                  className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                  onClick={debouncedLogout}
                >
                  <div
                    className='flex flex-row items-center justify-start gap-x-[16px]
              transition-opacity duration-[800ms] ease-in-out'
                  >
                    <Icon.Logout fill={'#696969'} />
                    <p style={{ color: '#696969' }}>Đăng xuất</p>
                  </div>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MediumHeader;
