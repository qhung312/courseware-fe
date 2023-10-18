import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '../../components';
import { Aside } from '../../layout';

type AdminAsideState = {
  isActive: 'material' | 'exam' | 'exercise' | 'question' | null;
  material: boolean;
  exam: boolean;
  exercise: boolean;
  question: boolean;
};

const AdminAside: FC = () => {
  const [menuState, setMenuState] = useState<AdminAsideState>({
    isActive: null,
    material: false,
    exam: false,
    exercise: false,
    question: false,
  });
  const { pathname } = useLocation();

  const handleClick = (type: 'material' | 'exam' | 'exercise' | 'question') => {
    setMenuState((prevState) => {
      const newState = { ...prevState };
      const newStateForType = !newState[type];

      (Object.keys(newState) as Array<keyof typeof newState>).forEach((key) => {
        if (key !== type && key !== 'isActive') {
          if (!newState.isActive || key !== newState.isActive) {
            newState[key] = false;
          }
        }
      });

      newState[type] = newStateForType;

      return newState;
    });
  };

  useEffect(() => {
    if (
      pathname.includes('/admin/material/manage') ||
      pathname.includes('/admin/material/create')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'material' }));
    } else if (
      pathname.includes('/admin/exam-archive/manage') ||
      pathname.includes('/admin/exam-archive/create')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'exam' }));
    } else if (
      pathname.includes('/admin/exercises/manage') ||
      pathname.includes('/admin/exercises/create')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'exercise' }));
    } else if (
      pathname.includes('/admin/questions/manage') ||
      pathname.includes('/admin/questions/create')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'question' }));
    }
  }, [pathname]);

  return (
    <Aside subTitle='Admin Menu'>
      <div className='flex flex-col'>
        <div className='flex h-[fit-content] w-full flex-col bg-white'>
          <button
            className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
            onClick={() => handleClick('material')}
          >
            <div className='flex flex-row items-center justify-start gap-x-[16px]'>
              <Icon.Document
                fill={
                  pathname.includes('/admin/material/manage') ||
                  pathname.includes('/admin/material/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
              />
              <p
                style={{
                  color:
                    pathname.includes('/admin/material/manage') ||
                    pathname.includes('/admin/material/create')
                      ? '#4285F4'
                      : '#5B5B5B',
                }}
              >
                Quản lý tài liệu
              </p>
            </div>
            {menuState.material ? (
              <Icon.ChevronUp
                fill={
                  pathname.includes('/admin/material/manage') ||
                  pathname.includes('/admin/material/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname.includes('/admin/material/manage') ||
                  pathname.includes('/admin/material/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            )}
          </button>
          <nav
            className='flex flex-col pl-10 pr-5 transition-all ease-in-out'
            style={{
              maxHeight: menuState.material ? '300px' : '0px',
              overflow: 'hidden',
              transitionDuration: menuState.material ? '1.2s' : '0.8s',
            }}
          >
            <NavLink
              to='/admin/material/manage'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Danh sách tài liệu
                  </p>
                </>
              )}
            </NavLink>
            <NavLink
              to='/admin/material/create'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>Tạo tài liệu</p>
              )}
            </NavLink>
          </nav>
        </div>
        <div className='flex h-[fit-content] w-full flex-col bg-white'>
          <button
            className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
            onClick={() => handleClick('exam')}
          >
            <div className='flex flex-row items-center justify-start gap-x-[16px]'>
              <Icon.Quiz
                fill={
                  pathname.includes('/admin/exam-archive/manage') ||
                  pathname.includes('/admin/exam-archive/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
              />
              <p
                style={{
                  color:
                    pathname.includes('/admin/exam-archive/manage') ||
                    pathname.includes('/admin/exam-archive/create')
                      ? '#4285F4'
                      : '#5B5B5B',
                }}
              >
                Quản lý đề thi
              </p>
            </div>
            {menuState.exam ? (
              <Icon.ChevronUp
                fill={
                  pathname.includes('/admin/exam-archive/manage') ||
                  pathname.includes('/admin/exam-archive/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname.includes('/admin/exam-archive/manage') ||
                  pathname.includes('/admin/exam-archive/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            )}
          </button>
          <nav
            className='flex flex-col pl-10 pr-5 transition-all ease-in-out'
            style={{
              maxHeight: menuState.exam ? '300px' : '0px',
              overflow: 'hidden',
              transitionDuration: menuState.exam ? '1.2s' : '0.8s',
            }}
          >
            <NavLink
              to='/admin/exam-archive/manage'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Danh sách đề thi
                  </p>
                </>
              )}
            </NavLink>
            <NavLink
              to='/admin/exam-archive/create'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>Tạo đề thi</p>
                </>
              )}
            </NavLink>
          </nav>
        </div>
        <div className='flex h-[fit-content] w-full flex-col bg-white'>
          <button
            className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
            onClick={() => handleClick('exercise')}
          >
            <div className='flex flex-row items-center justify-start gap-x-[16px]'>
              <Icon.Exercise
                fill={
                  pathname.includes('/admin/exercises/manage') ||
                  pathname.includes('/admin/exercises/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
              />
              <p
                style={{
                  color:
                    pathname.includes('/admin/exercises/manage') ||
                    pathname.includes('/admin/exercises/create')
                      ? '#4285F4'
                      : '#5B5B5B',
                }}
              >
                Quản lý bài tập rèn luyện
              </p>
            </div>
            {menuState.exercise ? (
              <Icon.ChevronUp
                fill={
                  pathname.includes('/admin/exercises/manage') ||
                  pathname.includes('/admin/exercises/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname.includes('/admin/exercises/manage') ||
                  pathname.includes('/admin/exercises/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            )}
          </button>
          <nav
            className='flex flex-col pl-10 pr-5 transition-all ease-in-out'
            style={{
              maxHeight: menuState.exercise ? '300px' : '0px',
              overflow: 'hidden',
              transitionDuration: menuState.exercise ? '1.2s' : '0.8s',
            }}
          >
            <NavLink
              to='/admin/exercises/manage'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Danh sách bài tập rèn luyện
                  </p>
                </>
              )}
            </NavLink>
            <NavLink
              to='/admin/exercises/create'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Tạo bài tập rèn luyện
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
            onClick={() => handleClick('question')}
          >
            <div className='flex flex-row items-center justify-start gap-x-[16px]'>
              <Icon.Test
                fill={
                  pathname.includes('/admin/questions/manage') ||
                  pathname.includes('/admin/questions/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
              />
              <p
                style={{
                  color:
                    pathname.includes('/admin/questions/manage') ||
                    pathname.includes('/admin/questions/create')
                      ? '#4285F4'
                      : '#5B5B5B',
                }}
              >
                Quản lý câu hỏi
              </p>
            </div>
            {menuState.question ? (
              <Icon.ChevronUp
                fill={
                  pathname.includes('/admin/questions/manage') ||
                  pathname.includes('/admin/questions/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            ) : (
              <Icon.ChevronDown
                fill={
                  pathname.includes('/admin/questions/manage') ||
                  pathname.includes('/admin/questions/create')
                    ? '#4285F4'
                    : '#5B5B5B'
                }
                width={'20px'}
              />
            )}
          </button>
          <nav
            className='flex flex-col pl-10 pr-5 transition-all ease-in-out'
            style={{
              maxHeight: menuState.question ? '300px' : '0px',
              overflow: 'hidden',
              transitionDuration: menuState.question ? '1.2s' : '0.8s',
            }}
          >
            <NavLink
              to='/admin/questions/manage'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Danh sách câu hỏi
                  </p>
                </>
              )}
            </NavLink>
            <NavLink
              to='/admin/questions/create'
              className='flex w-full flex-row items-center justify-start
                gap-x-[16px] rounded-[12px] px-[20px] py-[16px]'
              style={({ isActive, isPending }) => ({
                backgroundColor: isActive || isPending ? 'rgba(118, 167, 243, 0.1)' : 'transparent',
              })}
            >
              {({ isActive, isPending }) => (
                <>
                  <p style={{ color: isActive || isPending ? '#4285F4' : '#5B5B5B' }}>
                    Tạo câu hỏi
                  </p>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </Aside>
  );
};

export default AdminAside;
