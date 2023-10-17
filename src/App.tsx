import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { Loading } from './components';
import { ENVIRONMENT } from './config';
import { AdministratorRoute, UserRoute } from './routes';
import useBoundStore from './store';

const App = () => {
  const setToken = useBoundStore.use.setToken();
  const getUserProfile = useBoundStore.use.getUserProfile();

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams({ token: '' });

  const { token: queryToken } = Object.fromEntries(searchParams);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log('Environment:', ENVIRONMENT);

    if (
      queryToken &&
      queryToken !== '' &&
      window.location.pathname.split('/')[1] === 'login' &&
      window.location.pathname.split('/').length === 2
    ) {
      setToken(queryToken);
    } else {
      getUserProfile().then(() => {
        setTimeout(() => setLoading(false), 1000);
      });
    }
  }, [queryToken, setToken, getUserProfile]);

  useEffect(() => {
    if (queryToken && queryToken !== '') {
      navigate('/');
    }
  }, [queryToken, navigate]);

  if (loading) return <Loading />;
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path='/admin/*' element={<AdministratorRoute />} />
          <Route path='*' element={<UserRoute />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
