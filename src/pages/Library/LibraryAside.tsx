import { useLayoutEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { AsideLink, Icon } from '../../components';
import { Aside } from '../../layout';
import useBoundStore from '../../store';

import type { Subject } from '../../types/subject';

interface LibraryAsideProps {
  title?: string;
  description?: string;
  baseRoute: string;
  isDisplayToggleAside?: boolean;
}

const LibraryAside: React.FC<LibraryAsideProps> = ({
  title,
  description,
  baseRoute,
  isDisplayToggleAside = false,
}) => {
  const subjects = useBoundStore.use.subjects();
  const getAllSubjects = useBoundStore.use.getAllSubjects();

  useLayoutEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  return (
    <Aside title={title} description={description} isDisplayToggleAside={isDisplayToggleAside}>
      <div className='flex flex-col space-y-4'>
        {subjects !== null ? (
          subjects?.map((subj: Subject) => {
            return (
              <AsideLink
                to={`${baseRoute}/${subj._id}`}
                content={subj.name}
                Icon={Icon.Exercise}
                key={subj._id}
              />
            );
          })
        ) : (
          <Skeleton
            count={8}
            borderRadius={12}
            className='h-12'
            containerClassName='space-y-4'
            baseColor='#DBEBFF'
          />
        )}
      </div>
    </Aside>
  );
};

export default LibraryAside;
