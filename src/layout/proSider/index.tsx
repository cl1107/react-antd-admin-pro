import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';

const ProSider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout.Sider
      width={208}
      collapsedWidth={80}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      className="h-full"
    >
      {children}
      <div className={'h-10 lh-10 px-4 mb-1 cursor-pointer'} onClick={onCollapse}>
        {collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: '16px', color: '#08c', cursor: 'pointer' }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: '18px', color: '#08c', cursor: 'pointer' }} />
        )}
      </div>
    </Layout.Sider>
  );
};

export default ProSider;
