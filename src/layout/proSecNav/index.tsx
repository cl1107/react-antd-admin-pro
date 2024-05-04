import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGlobalStore } from '@/store';
import styles from './index.module.less';

const pathSubmenu = {
  '/home': ['home'],
  '/coupons/add': ['/sub-act', '/sub-coupons'],
  '/coupons/edit': ['/sub-act', '/sub-coupons'],
  '/product': ['/sub-act', '/sub-coupons'],
};

const ProSecNav = () => {
  const menus = useGlobalStore((state) => state.menus);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedKeys, setSelectedKeys] = useState(['home']);

  // 当前路由对应的 sub menu key
  const [openKeys, setOpenKeys] = useState(['home']);

  // 提取放在redux中, tab 切换时改成 false
  const [isOpenChange, setIsOpenChange] = useState(false);

  // NOT READY FOR PRIME TIME
  // submenu keys of first level
  const [rootSubmenuKeys] = useState(['/sub-act', '/sub-list', '/sub-error']);

  useEffect(() => {
    const selectedPathKey = pathname;
    setSelectedKeys([selectedPathKey]);
    setOpenKeys(isOpenChange ? openKeys : pathSubmenu[pathname] ?? openKeys);
  }, [pathname, openKeys, isOpenChange]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setIsOpenChange(true);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect = ({ key }: { key: string }) => {
    navigate(key);
    setIsOpenChange(false);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      theme="light"
      className={styles.menu}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
      items={menus}
    />
  );
};

export default ProSecNav;
