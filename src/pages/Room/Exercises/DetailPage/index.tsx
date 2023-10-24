import quiz from '../../../../data/exercises';
import { Page } from '../../../../layout';

import Large from './Large';
import Medium from './Medium';

const DetailPage: React.FC = () => {
  return (
    <Page title={`${quiz.fromTemplate.subject.name}-${quiz.fromTemplate.chapter.name}`}>
      <Medium />
      <Large />
    </Page>
  );
};

export default DetailPage;
