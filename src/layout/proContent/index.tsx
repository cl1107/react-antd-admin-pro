import { useGlobalStore } from '@/store';
import { getKeyName } from '@/utils/publicFn';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { FloatButton, Layout, Space, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProTabs from '../proTabs';
import styles from './index.module.less';

const { Content, Footer } = Layout;

const ProContent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('home');
  const { activeKey, panes } = useGlobalStore();
  const [panesItem, setPanesItem] = useState({
    title: '',
    content: null,
    key: '',
    closable: false,
    path: '',
    i18nKey: '',
  });

  const pathRef = useRef('');
  const { pathname, search } = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const { tabKey, title, element, i18nKey } = getKeyName(pathname);
    const newPath = search ? pathname + search : pathname;
    pathRef.current = newPath;

    setPanesItem({
      title,
      content: element,
      key: tabKey,
      closable: tabKey !== '/',
      path: newPath,
      i18nKey,
    });
    setTabActiveKey(tabKey);
  }, [pathname, search, panes, activeKey]);

  return (
    <Layout className={styles.layout}>
      <Content className="layout-content" id="fullScreen" style={{ background: colorBgContainer }}>
        <ProTabs panesItem={panesItem} tabActiveKey={tabActiveKey} />
      </Content>
      <Footer className="layout-footer">
        <FloatButton.BackTop
          target={() => document.querySelector<HTMLDivElement>('#container') ?? document.body}
        >
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </FloatButton.BackTop>
        <Space>&copy; {new Date().getFullYear()} React Antd Admin Pro</Space>
      </Footer>
    </Layout>
  );
};

export default ProContent;
