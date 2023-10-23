import Skeleton from 'react-loading-skeleton';

import { AsideLink, Icon } from '../../components';
import subjects from '../../data/subjects';
import { Aside } from '../../layout';
interface RoomAsideProps {
  title?: string;
  subTitle?: string;
  description?: string;
  baseRoute: string;
}

const RoomAside: React.FC<RoomAsideProps> = ({ title, subTitle, description, baseRoute }) => {
  // const { subjects } = useAppSelector((state: RootState) => state.library);

  // const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   dispatch(getAllSubjects());
  // }, [dispatch]);

  return (
    <Aside title={title} subTitle={subTitle} description={description}>
      <div className='flex flex-col space-y-4'>
        {subjects !== null ? (
          subjects?.map((subj, index) => {
            return (
              <AsideLink
                to={`${baseRoute}/${index}`}
                content={subj.title}
                Icon={Icon.Exercise}
                key={`${subj.title}-${index}`}
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
