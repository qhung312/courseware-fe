import { SVGProps } from 'react';
import { NavLink } from 'react-router-dom';

import { default as IconComponent } from '../Icon';

type AsideLinkProps = {
  to: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  content: string;
};

const AsideLink: React.FC<AsideLinkProps> = ({ to, content, Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `group flex flex-1 items-center justify-between rounded-xl bg-[#9DCCFF] bg-opacity-30 px-6 py-5 transition-all duration-300 hover:bg-[#4285F4] hover:bg-opacity-90 md:bg-[#4285F4] md:bg-opacity-90 md:py-3  xl:py-4 2xl:py-5`
          : `group flex flex-1 items-center justify-between rounded-xl bg-[#9DCCFF] bg-opacity-30 px-6 py-5 transition-all duration-300 hover:bg-[#4285F4] hover:bg-opacity-90 md:py-3  xl:py-4 2xl:py-5`
      }
    >
      {({ isActive }) => (
        <>
          <div className='flex items-center space-x-4'>
            <Icon
              className={
                isActive
                  ? 'fill-[#252641] group-hover:fill-white md:fill-white'
                  : 'fill-[#252641] group-hover:fill-white'
              }
            />
            <p
              className={`max-w-[200px] truncate md:max-w-[96px] lg:max-w-[175px] xl:max-w-[200px] ${
                isActive
                  ? 'text-[#252641] group-hover:text-white md:text-white'
                  : 'text-[#252641] group-hover:text-white'
              }  `}
            >
              {content}
            </p>
          </div>
          <IconComponent.ChevronRight
            className={`max-w-2 min-w-2 min-h-3 hidden h-auto max-h-3 md:block ${
              isActive ? 'md:fill-white' : 'fill-[#252641] group-hover:fill-white'
            } `}
          />
        </>
      )}
    </NavLink>
  );
};

export default AsideLink;
