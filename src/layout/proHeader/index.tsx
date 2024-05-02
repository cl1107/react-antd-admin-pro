import antd from '@/assets/svg/antd.svg';
import { Layout, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProBreadcrumb from './components/Breadcrumb';
import { HeaderRight } from './components/HeaderRight';
import styles from './index.module.less';

const ProHeader = () => {
  const navigate = useNavigate();
  const redirectTo = (path: string) => {
    navigate(path);
  };

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  return (
    <Layout.Header
      className={styles.header}
      style={{ background: colorBgContainer, borderBottom: `1px solid ${colorBorder}` }}
    >
      <div className="flex items-center">
        <div aria-hidden="true" className="font-600 text-lg" onClick={() => redirectTo('/')}>
          <img src={antd} className="w-8 h-8 mr-3" />
          <span>React Antd Admin Pro</span>
        </div>
        <nav className="pl-4">
          <ProBreadcrumb />
        </nav>
      </div>
      <HeaderRight />
    </Layout.Header>
  );
};

export default ProHeader;
