import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGlobalStore } from '@/store';
import { getKeyName } from '@/utils/publicFn';
import { useShallow } from 'zustand/shallow';
import styles from './index.module.less';
const ProSecNav = () => {
  const { menus, addTab, openKeys, selectedKeys, setOpenKeys, setSelectedKeys } = useGlobalStore(
    useShallow((state) => ({
      menus: state.menus,
      addTab: state.addTab,
      openKeys: state.openKeys,
      setOpenKeys: state.setOpenKeys,
      selectedKeys: state.selectedKeys,
      setSelectedKeys: state.setSelectedKeys,
    })),
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
