import { Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGlobalStore } from '@/store';
import { getKeyName } from '@/utils/publicFn';
import styles from './index.module.less';

const ProSecNav = () => {
  const { menus, addTab } = useGlobalStore((state) => ({
    menus: state.menus,
    addTab: state.addTab,
  }));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //TODO:提取到全局store， autoComplete组件需要使用
  const [openKeys, setOpenKeys] = useState<React.Key[]>([]); // 左侧菜单默认展开的subMenu key
  const [selectedKeys, setSelectedKeys] = useState(['/']);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      theme="light"
      className={styles.menu}
      // defaultOpenKeys={openKeys}
      openKeys={openKeys.map((item) => String(item))}
      onOpenChange={(value) => setOpenKeys(value)}
      onSelect={async ({ key, selectedKeys, keyPath, item, domEvent }) => {
        if (pathname !== key) {
          const { tabKey, title, element, i18nKey } = getKeyName(key);
          addTab({
            label: title,
            content: element,
            key: tabKey,
            closable: tabKey !== '/',
            path: key,
            i18nKey,
          });
          navigate(key);
          setSelectedKeys([key]);
        }
      }}
      items={menus}
    />
  );
};

export default ProSecNav;
