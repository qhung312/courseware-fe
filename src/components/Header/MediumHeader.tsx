import { LottieOptions, useLottie } from 'lottie-react';
import { CSSProperties, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as MediumLogoCTCT } from '../../assets/svgs/MediumLogoCTCT.svg';
import { useDebounce, useThrottle } from '../../hooks';
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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
    navigate('/');
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
      <header className='fixed top-0 w-[100%] z-30'>
        <div
          className='md:hidden flex flex-row justify-between items-center bg-[#f5f7fc] relative
          w-[100%] h-[72px]
          px-[20px] py-[16px] z-[25]'
          style={{ boxShadow: isOverlayOpen ? '0px 0px 10px 0px rgba(0, 0, 0, 0.1)' : 'none' }}
        >
          <MediumLogoCTCT />
          <button type='button' onClick={throttledOnClick}>
            {View}
          </button>
        </div>
        <div
          className='bg-white flex flex-col justify-start items-center gap-y-[24px] absolute
          transition-all ease-in-out duration-[900ms] whitespace-nowrap overflow-scroll overscroll-none
          w-[100%] px-[20px] py-[16px] z-20
          md:hidden'
          style={{
            transform: isOverlayOpen ? 'translateY(0%)' : 'translateY(calc(-100vh - 72px))',
            height: 'calc(100vh)',
          }}
        >
          <div className='flex flex-row justify-center items-center relative w-[100%]'>
            <input
              className='bg-inherit rounded-[40px] border border-[#49BBBD] 
            px-[20px] py-[8px] w-[100%]'
            />
            <button type='button' className='w-[20px] absolute right-[20px]'>
              <Icon.Search className='w-[20px]' />
            </button>
          </div>
          <nav className='flex flex-col items-center w-[100%] gap-y-[12px]'>
            <NavLink
              to='/'
              end
              className='flex flex-row justify-start items-center gap-x-[16px] z-[2]
            px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
            <div className='flex flex-col h-[fit-content] w-[100%] bg-white'>
              <button
                className='flex flex-row justify-between items-center
              px-[20px] py-[16px] rounded-[12px] w-[100%] z-[2] bg-white'
                onClick={throttledLibraryClick}
              >
                <div className='flex flex-row justify-start items-center gap-x-[16px]'>
                  <Icon.Library
                    fill={
                      pathname === '/library/documents' || pathname === '/library/tests'
                        ? '#4285F4'
                        : '#696969'
                    }
                  />
                  <p
                    style={{
                      color:
                        pathname === '/library/documents' || pathname === '/library/tests'
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
                      pathname === '/library/documents' || pathname === '/library/tests'
                        ? '#4285F4'
                        : '#696969'
                    }
                    fillOpacity={0.87}
                    width={'20px'}
                  />
                ) : (
                  <Icon.ChevronDown
                    fill={
                      pathname === '/library/documents' || pathname === '/library/tests'
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
                  to='/library/documents'
                  end
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
                  to='/library/tests'
                  end
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
            <div className='flex flex-col h-[fit-content] w-[100%] bg-white'>
              <button
                className='flex flex-row justify-between items-center
              px-[20px] py-[16px] rounded-[12px] w-[100%] z-[2] bg-white'
                onClick={throttledRoomClick}
              >
                <div className='flex flex-row justify-start items-center gap-x-[16px]'>
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
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
            <div className='flex flex-col h-[fit-content] w-[100%] bg-white'>
              <button
                className='flex flex-row justify-between items-center
              px-[20px] py-[16px] rounded-[12px] w-[100%] z-[2] bg-white'
                onClick={throttledAboutUsClick}
              >
                <div className='flex flex-row justify-start items-center gap-x-[16px]'>
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
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
                  className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
              className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
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
            <NavLink
              to='/profile'
              end
              className='flex flex-row justify-start items-center gap-x-[16px]
                px-[20px] py-[16px] rounded-[12px] w-[100%]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
              onClick={() => setTimeout(throttledOnClick, 1000)}
            >
              {({ isActive, isPending }) => (
                <>
                  <Icon.Profile fill={isActive || isPending ? '#4285F4' : '#696969'} />
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#696969' }}>
                    Thông tin của tôi
                  </p>
                </>
              )}
            </NavLink>
            <button
              className='flex flex-row justify-between items-center
              px-[20px] py-[16px] rounded-[12px] w-[100%] z-[2] bg-white'
              onClick={debouncedLogout}
            >
              <div
                className='flex flex-row justify-start items-center gap-x-[16px]
              transition-opacity ease-in-out duration-[800ms]'
              >
                <Icon.Logout fill={'#696969'} />
                <p style={{ color: '#696969' }}>Đăng xuất</p>
              </div>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default MediumHeader;
