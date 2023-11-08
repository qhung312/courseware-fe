import { useLayoutEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { AsideLink, Icon } from '../../components';
import { Aside } from '../../layout';
import useBoundStore from '../../store';

import type { Subject } from '../../types/subject';

interface LibraryAsideProps {
  title?: string;
  subTitle?: string;
  description?: string;
  baseRoute: string;
}

const LibraryAside: React.FC<LibraryAsideProps> = ({ title, subTitle, description, baseRoute }) => {
  const subjects = useBoundStore.use.subjects();
  const getAllSubjects = useBoundStore.use.getAllSubjects();

  useLayoutEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  return (
    <Aside title={title} subTitle={subTitle} description={description}>
      <div className='flex flex-col space-y-4'>
        {subjects !== null ? (
          subjects?.map((subj: Subject) => {
            return (
              <AsideLink
                to={`${baseRoute}/${subj._id}`}
                content={subj.name}
                Icon={Icon.Book}
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
