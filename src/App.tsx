import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { Loading } from './components';
import { ENVIRONMENT } from './config';
import { useAppDispatch } from './hooks';
import { AdministratorRoute, UserRoute } from './routes';
import { getUserProfile } from './slices/actions/user.action';
import { AuthAction } from './slices/auth';

const App = () => {
  const dispatch = useAppDispatch();

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
      dispatch(AuthAction.setToken(queryToken));
    } else {
      dispatch(getUserProfile()).then(() => {
        setTimeout(() => setLoading(false), 400);
      });
    }
  }, [dispatch, queryToken]);

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
