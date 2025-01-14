import Loading from '@/components/stateless/Loading';
import { Suspense, lazy } from 'react';

/**
 * 带有回退到加载组件的组件延迟加载器
 */
const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>): React.ReactElement => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// 以下路由可根据需求另分成不同的文件维护
// 结合 proSecNav组件中的menuItems

const SignIn = lazy(() => import('@/pages/signIn'));
const Layout = lazy(() => import('@/layout'));
const Home = lazy(() => import('@/pages/home'));
const Demo = lazy(() => import('@/pages/demo'));
const Exception403 = lazy(() => import('@/components/stateless/Exception/exception403'));
const NoMatch = lazy(() => import('@/components/stateless/NoMatch'));

const rootRouter = [
  {
    path: '/',
    name: '首页',
    i18nKey: 'home',
    key: '/',
    auth: true,
    element: lazyLoad(Layout),
    children: [
      {
        index: true,
        name: '首页',
        key: '/',
        i18nKey: 'home',
        auth: true,
        element: lazyLoad(Home),
      },
      {
        index: false,
        path: 'demo',
        name: 'Demo',
        i18nKey: 'demo',
        key: '/demo',
        auth: true,
        element: lazyLoad(Demo),
      },
      {
        path: '*',
        name: 'No Match',
        key: '*',
        element: lazyLoad(NoMatch),
      },
    ],
  },
  {
    index: false,
    path: 'signIn',
    name: '登录',
    key: '/signIn',
    auth: false,
    element: lazyLoad(SignIn),
  },
  {
    index: false,
    path: '/403',
    name: '403',
    key: '/403',
    auth: false,
    element: lazyLoad(Exception403),
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: lazyLoad(NoMatch),
  },
];

export default rootRouter;
