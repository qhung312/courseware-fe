import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useState } from 'react';

import { Footer } from '../../../components';
import ProfileOption from '../../../components/ProfileOption';
import { Page } from '../../../layout';

const ActivityHistory = () => {
  const [currentOption, setCurrentOption] = useState(1);

  return (
    <Page title='Thông tin người dùng - Lịch sử hoạt động'>
      <main className='w-full'>
        {/* Banner */}
        <ProfileOption option={currentOption} setOption={(opt) => setCurrentOption(opt)} />
      </main>
      <Footer />
    </Page>
  );
};

export default ActivityHistory;
