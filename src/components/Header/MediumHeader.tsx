import _ from 'lodash';
import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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

  const isAuthenticated = useBoundStore.use.isAuthenticated();
  const user = useBoundStore.use.user();
  const logout = useBoundStore.use.logout();

  const onClick = () => {
    isOverlayOpen ? playSegments([60, 30], true) : playSegments([30, 60], true);
    setIsOverlayOpen(!isOverlayOpen);
    setIsLibraryOpen(false);
  };

  const onLibraryClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  const onLogout = () => {
    logout();
    setIsOverlayOpen(false);
    setIsLibraryOpen(false);
    playSegments([60, 30], true);
  };

  const throttledOnClick = useThrottle(onClick);
  const throttledLibraryClick = useThrottle(onLibraryClick);
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
              }, 500)
            }
            className='aspect-square h-10 w-auto xl:h-12'
          >
            <Icon.LogoBK className='h-full w-full' />
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
                  <Icon.Home fill={isActive || isPending ? '#030391' : '#696969'} />
                  <p style={{ color: isActive || isPending ? '#030391' : '#696969' }}>Trang chủ</p>
                </>
              )}
            </NavLink>
            {isAuthenticated && (
              <>
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
                            ? '#030391'
                            : '#696969'
                        }
                      />
                      <p
                        style={{
                          color:
                            pathname.includes('/library/material') ||
                            pathname.includes('/library/exam-archive')
                              ? '#030391'
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
                            ? '#030391'
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
                            ? '#030391'
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
                      onClick={() => {
                        setIsOverlayOpen(false);
                        setIsLibraryOpen(!isLibraryOpen);
                        playSegments([60, 30], true);
                      }}
                    >
                      {({ isActive, isPending }) => (
                        <>
                          <Icon.Document fill={isActive || isPending ? '#030391' : '#696969'} />
                          <p style={{ color: isActive || isPending ? '#030391' : '#696969' }}>
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
                      onClick={() => {
                        setIsOverlayOpen(false);
                        setIsLibraryOpen(!isLibraryOpen);
                        playSegments([60, 30], true);
                      }}
                    >
                      {({ isActive, isPending }) => (
                        <>
                          <Icon.Quiz fill={isActive || isPending ? '#030391' : '#696969'} />
                          <p style={{ color: isActive || isPending ? '#030391' : '#696969' }}>
                            Đề thi
                          </p>
                        </>
                      )}
                    </NavLink>
                  </nav>
                </div>
                <NavLink
                  to='/room/exercises'
                  end
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
                      <Icon.Exercise fill={isActive || isPending ? '#030391' : '#696969'} />
                      <p style={{ color: isActive || isPending ? '#030391' : '#696969' }}>
                        Bài tập rèn luyện
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
                    <Icon.Admin fill={isActive || isPending ? '#030391' : '#696969'} />
                    <p style={{ color: isActive || isPending ? '#030391' : '#696969' }}>Admin</p>
                  </>
                )}
              </NavLink>
            ) : null}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MediumHeader;
