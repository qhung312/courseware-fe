import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { ReactComponent as MediumLogoCTCT } from '../../assets/svgs/MediumLogoCTCT.svg';
import { useAppDispatch, useAppSelector, useDebounce, useThrottle } from '../../hooks';
import { logout } from '../../slices/actions/auth.action';
import { AuthAction } from '../../slices/auth';
import { RootState } from '../../store';
import Icon from '../Icon';

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
    pathname === '/library/material' || pathname === '/library/exam-archive'
  );
  const [isRoomOpen, setIsRoomOpen] = useState(
    pathname === '/room/exercises' || pathname === '/room/tests'
  );
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(
    pathname === '/about-us' ||
      pathname === '/about-us/activities' ||
      pathname === '/about-us/partners'
  );

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

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
    // TODO
    dispatch(logout());
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
      <header className='fixed top-0 z-30 w-[100%]'>
        <div
          className='relative z-[25] flex h-[72px] w-[100%] flex-row items-center
          justify-between bg-[#f5f7fc]
          px-[20px] py-[16px] md:hidden'
          style={{ boxShadow: isOverlayOpen ? '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' : 'none' }}
        >
          <NavLink to='/' className='aspect-[107/60] h-[40px] w-auto xl:h-[48px]'>
            <MediumLogoCTCT />
          </NavLink>
          <button type='button' onClick={throttledOnClick}>
            {View}
          </button>
        </div>
        <div
          className='absolute z-20 flex w-[100%] flex-col items-center justify-start
          gap-y-[24px] overflow-scroll overscroll-none whitespace-nowrap bg-white px-[20px]
          py-[16px] transition-all duration-[900ms] ease-in-out
          md:hidden'
          style={{
            transform: isOverlayOpen ? 'translateY(0%)' : 'translateY(calc(-100vh - 72px))',
            height: 'calc(100vh)',
          }}
        >
          <div className='relative flex w-[100%] flex-row items-center justify-center'>
            <input
              className='w-[100%] rounded-[40px] border border-[#49BBBD] 
            bg-inherit px-[20px] py-[8px]'
            />
            <button type='button' className='absolute right-[20px] w-[20px]'>
              <Icon.Search className='w-[20px]' />
            </button>
          </div>
          <nav className='flex w-[100%] flex-col items-center gap-y-[12px]'>
            <NavLink
              to='/'
              end
              className='z-[2] flex w-[100%] flex-row items-center justify-start
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
            <div className='flex h-[fit-content] w-[100%] flex-col bg-white'>
              <button
                className='z-[2] flex w-[100%] flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledLibraryClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.Library
                    fill={
                      pathname === '/library/material' || pathname === '/library/exam-archive'
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname === '/library/material' || pathname === '/library/exam-archive'
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
                      pathname === '/library/material' || pathname === '/library/exam-archive'
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname === '/library/material' || pathname === '/library/exam-archive'
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
                  end
                  className='flex w-[100%] flex-row items-center justify-start
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
                  end
                  className='flex w-[100%] flex-row items-center justify-start
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
            <div className='flex h-[fit-content] w-[100%] flex-col bg-white'>
              <button
                className='z-[2] flex w-[100%] flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledRoomClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.Room
                    fill={
                      pathname === '/room/exercises' || pathname === '/room/tests'
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname === '/room/exercises' || pathname === '/room/tests'
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
                      pathname === '/room/exercises' || pathname === '/room/tests'
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname === '/room/exercises' || pathname === '/room/tests'
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
                  end
                  className='flex w-[100%] flex-row items-center justify-start
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
                  end
                  className='flex w-[100%] flex-row items-center justify-start
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
            <div className='flex h-[fit-content] w-[100%] flex-col bg-white'>
              <button
                className='z-[2] flex w-[100%] flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
                onClick={throttledAboutUsClick}
              >
                <div className='flex flex-row items-center justify-start gap-x-[16px]'>
                  <Icon.AboutUs
                    fill={
                      pathname === '/about-us' ||
                      pathname === '/about-us/activities' ||
                      pathname === '/about-us/partners'
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname === '/about-us' ||
                        pathname === '/about-us/activities' ||
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
                      pathname === '/about-us/activities' ||
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
                      pathname === '/about-us/activities' ||
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
                  className='flex w-[100%] flex-row items-center justify-start
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
                  className='flex w-[100%] flex-row items-center justify-start
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
                  className='flex w-[100%] flex-row items-center justify-start
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
            <NavLink
              to='/help'
              end
              className='flex w-[100%] flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
              onClick={() => setTimeout(throttledOnClick, 1000)}
            >
              {({ isActive, isPending }) => (
                <>
                  <Icon.Help fill={isActive || isPending ? '#4285F4' : '#696969'} />
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>Hỗ trợ</p>
                </>
              )}
            </NavLink>
            {!isAuthenticated && (
              <button
                type='submit'
                className='inset-y-5 right-5 w-[144px] cursor-pointer gap-x-[16px] rounded-[12px] bg-[#4285F4] px-[20px] py-[16px] text-base text-white duration-300 ease-out hover:bg-[#2374FA]
                '
                onClick={() => dispatch(AuthAction.loginWithGoogle())}
              >
                Đăng nhập
              </button>
            )}
            {isAuthenticated && (
              <>
                <NavLink
                  to='/profile'
                  end
                  className='flex w-[100%] flex-row items-center justify-start
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
                  className='z-[2] flex w-[100%] flex-row
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
      </header>
    </>
  );
};

export default MediumHeader;
