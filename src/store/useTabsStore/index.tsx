import Home from '@/pages/home';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import {
  ApartmentOutlined,
  DeploymentUnitOutlined,
  FireOutlined,
  GlobalOutlined,
  HeatMapOutlined,
  HomeOutlined,
  QrcodeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

export interface PanesItem {
  label: string;
  i18nKey: string;
  key: string;
  content: React.ReactNode;
  closable: boolean;
  path: string;
}
export interface MenusItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: MenusItem[];
}
export interface TabsState {
  activeKey: string;
  setActiveKey: (key: string) => void;
  panes: PanesItem[];
  setPanes: (panes: PanesItem[]) => void;
  menus: MenusItem[];
  setMenus: (menus: MenusItem[]) => void;
  workspaces: { label: string; code: string }[];
  setWorkspaces: (workspaces: { label: string; code: string }[]) => void;
  activeWorkspace: string;
  setActiveWorkspace: (workspace: string) => void;
  removeTab: (targetKey: string, callbackFun?: () => void) => void;
}

export const defaultMenus = [
  { label: 'home', key: '/', icon: <HomeOutlined /> },
  { label: 'demo', key: '/demo', icon: <GlobalOutlined /> },
  { label: 'Parallax', key: '/parallax', icon: <FireOutlined /> },
  { label: 'QrGenerate', key: '/qrcode', icon: <QrcodeOutlined /> },
  { label: 'PrismRender', key: '/prism', icon: <FireOutlined /> },
  { label: 'ReactTilt', key: '/tilt', icon: <QrcodeOutlined /> },
  { label: 'Music', key: '/music', icon: <FireOutlined /> },
  { label: 'Crypto', key: '/crypto', icon: <QrcodeOutlined /> },
  { label: 'Video', key: '/video', icon: <FireOutlined /> },
  { label: 'Three', key: '/three', icon: <QrcodeOutlined /> },
  { label: 'Echarts', key: '/echarts', icon: <FireOutlined /> },
  { label: 'ChatGPT', key: '/markmap', icon: <QrcodeOutlined /> },
  { label: 'Mermaid', key: '/mermaid', icon: <FireOutlined /> },
  {
    label: '技术栈',
    key: '/sub-act',
    icon: <HeatMapOutlined />,
    children: [
      {
        label: '前端技术栈',
        key: '/sub-coupons',
        icon: <FireOutlined />,
        children: [
          { label: 'Vue', key: '/coupons/add' },
          { label: 'Angular', key: '/coupons/edit' },
        ],
      },
      { label: '后端技术栈', key: '/product', icon: <DeploymentUnitOutlined /> },
    ],
  },
  {
    label: '构建工具',
    key: '/sub-list',
    icon: <ApartmentOutlined />,
    children: [
      { label: 'Webpack', key: '/coupons/list' },
      { label: 'Vite', key: '/order/list' },
    ],
  },
  {
    label: 'Error',
    key: '/sub-error',
    icon: <QuestionCircleOutlined />,
    children: [{ label: 'ErrorBoundary', key: '/error' }],
  },
];

export const testMenus = [
  { label: 'home', key: '/', icon: <HomeOutlined /> },
  { label: 'demo', key: '/demo', icon: <GlobalOutlined /> },
];

export const useTabsStore = create<TabsState>((set) => ({
  activeKey: '',
  setActiveKey: (key) => set({ activeKey: key }),
  panes: [
    {
      label: '首页',
      i18nKey: 'home',
      key: '/',
      content: <Home />,
      closable: false,
      path: '/',
    },
  ],
  setPanes: (panes) => set({ panes }),
  menus: defaultMenus,
  setMenus: (menus) => set({ menus }),
  workspaces: [
    { label: '默认工作区', code: 'default' },
    { label: '测试工作区', code: 'test' },
  ],
  setWorkspaces: (workspaces) => set({ workspaces }),
  activeWorkspace: 'default',
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  removeTab: (targetKey, callbackFun = () => {}) => {
    set((state) => {
      const delIndex = state.panes.findIndex((item) => item.key === targetKey);
      const filterPanes = state.panes.filter((pane) => pane.key !== targetKey);
      // 删除非当前/当前tab
      if (targetKey !== state.activeKey) {
        return { panes: filterPanes };
      }
      const nextPath = filterPanes[delIndex - 1]?.key || '/';
      const navigate = useNavigate();
      navigate(nextPath);
      return { activeKey: nextPath, panes: filterPanes };
    });
    callbackFun();
  },
}));
