import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Icon } from '../../components';
import { Aside } from '../../layout';

import AdminAsideLink from './AdminAsideLink';

type AdminAsideState = {
  isActive: 'material' | 'exam' | 'exercise' | 'question' | 'subject' | 'chapter' | null;
  material: boolean;
  exam: boolean;
  exercise: boolean;
  question: boolean;
  subject: boolean;
  chapter: boolean;
};

const AdminAside: FC = () => {
  const [menuState, setMenuState] = useState<AdminAsideState>({
    isActive: null,
    material: false,
    exam: false,
    exercise: false,
    question: false,
    subject: false,
    chapter: false,
  });
  const { pathname } = useLocation();

  const handleClick = (
    type: 'material' | 'exam' | 'exercise' | 'question' | 'subject' | 'chapter'
  ) => {
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
    } else if (
      pathname.includes('/admin/subject/create') ||
      pathname.includes('/admin/subject/manage')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'subject' }));
    } else if (
      pathname.includes('admin/chapter/create') ||
      pathname.includes('admin/chapter/manage')
    ) {
      setMenuState((prevState) => ({ ...prevState, isActive: 'chapter' }));
    }
  }, [pathname]);

  return (
    <Aside subTitle='Admin Menu'>
      <div className='flex flex-col'>
        <AdminAsideLink
          path='material'
          titleName='tài liệu'
          isOpen={menuState.material}
          handleClick={handleClick}
          IconProp={Icon.Document}
        />
        <AdminAsideLink
          path='exam'
          titleName='đề thi'
          isOpen={menuState.exam}
          handleClick={handleClick}
          IconProp={Icon.Quiz}
        />
        <AdminAsideLink
          path='exercise'
          titleName='bài tập rèn luyện'
          isOpen={menuState.exercise}
          handleClick={handleClick}
          IconProp={Icon.Exercise}
        />
        <AdminAsideLink
          path='question'
          titleName='câu hỏi'
          isOpen={menuState.question}
          handleClick={handleClick}
          IconProp={Icon.Test}
        />
        <AdminAsideLink
          path='subject'
          titleName='môn'
          isOpen={menuState.subject}
          handleClick={handleClick}
          IconProp={Icon.Test}
        />
        <AdminAsideLink
          path='chapter'
          titleName='chương'
          isOpen={menuState.chapter}
          handleClick={handleClick}
          IconProp={Icon.Test}
        />
      </div>
    </Aside>
  );
};

export default AdminAside;
