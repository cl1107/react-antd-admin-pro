import { Watermark } from 'antd';
import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from './components/stateless/Loading';
import rootRouter from './routers';
import AuthRouter from './routers/authRouter';
// import { sentryInit } from './utils';

const App = () => {
  // const { i18n } = useTranslation()
  const [loading, setLoading] = useState(true);
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 1500));
  useEffect(() => {
    // sentryInit();
    asyncCall()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const element = useRoutes(rootRouter);

  if (loading) {
    return <Loading />;
  }

  return <AuthRouter>{element}</AuthRouter>;
};

export default App;
