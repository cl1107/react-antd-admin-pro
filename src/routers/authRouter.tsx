import { getKeyName, getLocalStorage } from '@/utils/publicFn';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRouter = (props) => {
  const { pathname } = useLocation();
  const route = getKeyName(pathname);

  if (!route?.auth) return props.children;

  const { token } = getLocalStorage('token') || { token: null };
  if (!token) return <Navigate to="/signIn" replace />;

  // * 后端返回有权限路由列表 暂时硬编码 需要结合 proSecNav组件中的menuItems
  const routerList = [
    '/',
    '/home',
    '/demo',
    '/parallax',
    '/dashboard',
    '/tilt',
    '/prism',
    '/three',
    '/echarts',
    '/video',
    '/crypto',
  ];
  if (routerList.indexOf(pathname) === -1) return <Navigate to="/403" replace />;

  return props.children;
};

export default AuthRouter;
