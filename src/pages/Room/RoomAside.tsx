import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

import { AsideLink, Icon } from '../../components';
import { Aside } from '../../layout';
import useBoundStore from '../../store';
interface RoomAsideProps {
  title?: string;
  subTitle?: string;
  description?: string;
  baseRoute: string;
}

const RoomAside: React.FC<RoomAsideProps> = ({ title, description, baseRoute }) => {
  const subjects = useBoundStore.use.subjects();
  const getAllSubjects = useBoundStore.use.getAllSubjects();
  const { isLoading } = useQuery({
    queryKey: ['subjects', subjects],
    queryFn: async () => {
      await getAllSubjects();
      return subjects;
    },
    staleTime: Infinity,
  });

  return (
    <Aside title={title} description={description}>
      <div className='flex flex-col space-y-4'>
        {!isLoading ? (
          subjects?.map((subject, index) => {
            return (
              <AsideLink
                to={`${baseRoute}/${subject._id}`}
                content={subject.name}
                Icon={Icon.Exercise}
                key={`${subject.description}-${index}`}
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

export default RoomAside;
