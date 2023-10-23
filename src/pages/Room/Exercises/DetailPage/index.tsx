import quiz from '../../../../data/exercises';
import { Page } from '../../../../layout';

import Medium from './Medium';

const DetailPage: React.FC = () => {
  return (
    <Page title={`${quiz.fromTemplate.subject.name}-${quiz.fromTemplate.chapter.name}`}>
      <Medium />
    </Page>
  );
};

export default DetailPage;
