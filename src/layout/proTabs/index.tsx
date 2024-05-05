import { Button, Dropdown, Tabs, TabsProps, theme } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { StickyContainer, Sticky } from 'react-sticky-ts'
import { MyErrorBoundary } from '@/components/stateful';
import Loading from '@/components/stateless/Loading';
import { useGlobalStore } from '@/store';
import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { Sticky, StickyContainer } from 'react-sticky';
import Fullscreen from '../fullscreen';

const ProTabs = () => {
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useGlobalStore();
  console.log(panes, 'panes');
  const [isReload, setIsReload] = useState(false);
  // const pathRef = useRef('');

  const navigate = useNavigate();
  const { t } = useTranslation();
  // const { panesItem, tabActiveKey } = props;
  const { pathname, search } = useLocation();
  const fullPath = pathname + search;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderTabBar = (_props: TabsProps, DefaultTabBar: React.ComponentType<TabsProps>) => (
    <Sticky topOffset={40} relative>
      {({ style }: { style: React.CSSProperties }) => (
        <DefaultTabBar
          key={nanoid()}
          {..._props}
          className="pro-tabs"
          style={{ ...style, background: colorBgContainer }}
        />
      )}
    </Sticky>
  );

  useEffect(() => {
    document.querySelector('#container')?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  // tab点击
  const onTabClick = (targetKey: string) => {
    const { path } = panes.filter((item) => item.key === targetKey)[0];
    navigate(path);
  };

  // const onTabScroll = ({ direction }) => {
  //   console.log('direction', direction);
  // };

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'remove') removeTab(targetKey);
  };

  // 刷新当前 tab
  const refreshTab = () => {
    setIsReload(true);
    setTimeout(() => {
      setIsReload(false);
    }, 1000);
  };

  const onTabContextMenu = (rightMenuKey: string) => {
    if (rightMenuKey === 'all') {
      const filterPanes = panes.filter((pane) => pane.key === '/');
      setPanes(filterPanes);
      navigate('/');
      setActiveKey('/');
    }
    if (rightMenuKey === 'other') {
      const filterPanes = panes.filter((pane) => pane.key === '/' || pane.key === activeKey);
      setPanes(filterPanes);
    }
  };

  // tab 右键菜单
  const tabRightMenu = [
    {
      label: '关闭其他',
      key: 'other',
    },
    {
      label: '全部关闭',
      key: 'all',
    },
  ];

  const fixError = () => {
    refreshTab();
  };

  return (
    <StickyContainer className="layout-container" id="container">
      <Tabs
        hideAdd
        type="editable-card"
        onChange={onChange}
        onTabClick={onTabClick}
        // onTabScroll={onTabScroll}
        onEdit={onEdit}
        renderTabBar={renderTabBar}
        tabBarStyle={{
          zIndex: 2,
        }}
        activeKey={activeKey}
        destroyInactiveTabPane={false}
        tabBarExtraContent={{
          // left: (
          //   <Space align="center" size={30} style={{ margin: '0 25px' }}>
          //     <FireOutlined style={{ color: '#eb2f96', fontSize: 16 }} />
          //   </Space>
          // ),
          right: (
            <div className="flex items-center">
              <Fullscreen ele="#fullScreen" placement="left" tips="主内容全屏" />
              {panes.length > 2 ? (
                <Dropdown
                  menu={{
                    items: tabRightMenu,
                    onClick: ({ key }) => {
                      onTabContextMenu(key);
                    },
                  }}
                  trigger={['hover']}
                >
                  <Button type="link">
                    More <DownOutlined />
                  </Button>
                </Dropdown>
              ) : null}
            </div>
          ),
        }}
        items={panes.map((pane) => ({
          label: (
            <div className="flex items-center gap-2">
              {pane.key === fullPath && pane.key !== '/404' && (
                <SyncOutlined onClick={refreshTab} title="刷新" spin={isReload} />
              )}
              {pane.i18nKey ? t(pane.i18nKey) : pane.label}
            </div>
          ),
          key: pane.key,
          closable: pane.closable,
          forceRender: true,
          children: (
            <MyErrorBoundary fixError={fixError}>
              <div className="layout-tabpanel">
                {isReload && pane.key === fullPath && pane.key !== '/404' ? (
                  <Loading />
                ) : (
                  <>{pane.content}</>
                )}
              </div>
            </MyErrorBoundary>
          ),
        }))}
      />
    </StickyContainer>
  );
};

export default ProTabs;
