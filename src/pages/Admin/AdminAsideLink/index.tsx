import { SVGProps, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { Icon } from '../../../components';

type AdminAsideLinkProps = {
  path: 'material' | 'exam' | 'exercise' | 'question' | 'subject' | 'chapter';
  titleName: string;
  isOpen: boolean;
  handleClick: (
    type: 'material' | 'exam' | 'exercise' | 'question' | 'subject' | 'chapter'
  ) => void;
  IconProp: React.FC<SVGProps<SVGSVGElement>>;
};

const AdminAsideLink: React.FC<AdminAsideLinkProps> = ({
  path,
  titleName,
  isOpen,
  handleClick,
  IconProp,
}) => {
  const { pathname } = useLocation();
  const [isHover, setIsHover] = useState(false);
  const [isHoverListButton, setIsHoverListButton] = useState(false);
  const [isHoverCreateButton, setIsHoverCreateButton] = useState(false);
  let pathLink;
  switch (path) {
    case 'question':
      pathLink = 'questions';
      break;
    case 'exam':
      pathLink = 'exam-archive';
      break;
    case 'exercise':
      pathLink = 'exercises';
      break;
    default:
      pathLink = path;
      break;
  }

  return (
    <div className='flex h-[fit-content] w-full flex-col bg-white'>
      <button
        className='z-20 flex w-full flex-row
              items-center justify-between rounded-[12px] bg-white px-[20px] py-[16px]'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => handleClick(path)}
      >
        <div className='flex flex-row items-center justify-start gap-x-[16px]'>
          <IconProp
            fill={
              pathname.includes(`/admin/${pathLink}/manage`) ||
              pathname.includes(`/admin/${pathLink}/create`) ||
              isHover
                ? '#4285F4'
                : '#5B5B5B'
            }
          />
          <p
            style={{
              color:
                pathname.includes(`/admin/${pathLink}/manage`) ||
                pathname.includes(`/admin/${pathLink}/create`) ||
                isHover
                  ? '#4285F4'
                  : '#5B5B5B',
            }}
          >
            {`Quản lý ${titleName}`}
          </p>
        </div>
        {isOpen ? (
          <Icon.ChevronUp
            fill={
              pathname.includes(`/admin/${pathLink}/manage`) ||
              pathname.includes(`/admin/${pathLink}/create`) ||
              isHover
                ? '#4285F4'
                : '#5B5B5B'
            }
            width={'20px'}
          />
        ) : (
          <Icon.ChevronDown
            fill={
              pathname.includes(`/admin/${pathLink}/manage`) ||
              pathname.includes(`/admin/${pathLink}/create`) ||
              isHover
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
          maxHeight: isOpen ? '300px' : '0px',
          overflow: 'hidden',
          transitionDuration: isOpen ? '1.2s' : '0.8s',
        }}
      >
        <NavLink
          to={`/admin/${pathLink}/manage`}
          className='flex w-full flex-row items-center justify-start gap-x-[16px] rounded-[12px] bg-transparent px-[20px] py-[16px]'
          style={(a) => ({
            color: a.isActive || a.isPending || isHoverListButton ? '#4285F4' : '#5B5B5B',
            backgroundColor:
              a.isActive || a.isPending || isHoverListButton ? '#f1f6fe' : 'transparent',
          })}
          onMouseEnter={() => setIsHoverListButton(true)}
          onMouseLeave={() => setIsHoverListButton(false)}
        >
          {`Danh sách ${titleName}`}
        </NavLink>
        <NavLink
          to={`/admin/${pathLink}/create`}
          className='flex w-full flex-row items-center justify-start gap-x-[16px] rounded-[12px] bg-transparent px-[20px] py-[16px]'
          style={(a) => ({
            color: a.isActive || a.isPending || isHoverCreateButton ? '#4285F4' : '#5B5B5B',
            backgroundColor:
              a.isActive || a.isPending || isHoverCreateButton ? '#f1f6fe' : 'transparent',
          })}
          onMouseEnter={() => setIsHoverCreateButton(true)}
          onMouseLeave={() => setIsHoverCreateButton(false)}
        >
          {`Tạo ${titleName}`}
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminAsideLink;
