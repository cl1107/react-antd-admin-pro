// import { findNestedChildrenFirstPathAndName } from '@r5/shared/utils';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Spin } from 'antd';
import { useReducer } from 'react';
// import './index.less';
// import clsx from 'clsx';
import { useGlobalStore } from '@/store';
import { defaultMenus, testMenus } from '@/store/tabsSlice';
import { findNestedChildrenFirstKeyAndLabel } from '@/utils/menu';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

// function loop(menuParam: PortalApi.MenuItem, parent?: PortalApi.MenuItem[0]) {
//   for (let i = 0; i < menuParam.length; i++) {
//     const menuItem = menuParam[i];
//     menuItem.parent = parent;
//     if (menuItem.children) {
//       loop(menuItem.children, menuItem);
//     }
//   }
//   return menuParam;
// }
export const SwitchWorkspace = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    workspaces: workspaceList,
    activeWorkspace: workspaceKey,
    panes,
    setActiveWorkspace,
    setMenus,
    setActiveKey,
    setPanes,
  } = useGlobalStore((state) => ({
    workspaces: state.workspaces,
    activeWorkspace: state.activeWorkspace,
    panes: state.panes,
    setActiveWorkspace: state.setActiveWorkspace,
    setMenus: state.setMenus,
    setActiveKey: state.setActiveKey,
    setPanes: state.setPanes,
  }));
  const [spinning, toggleSpinning] = useReducer((x) => !x, false);

  const workspaceName = workspaceList.find((item) => item.code === workspaceKey)?.label;
  const handleMenuClick = async (e: any) => {
    toggleSpinning();
    // const menu = await getMenuApi({
    //   projectName: e.key,
    //   id: initialData.userInfo?.id ?? '',
    // });
    // const res = loop(menu, undefined);
    setActiveWorkspace(e.key);
    let tmp;
    //get menu from workspace then set menu
    if (e.key === 'default') {
      setMenus(defaultMenus);
      tmp = defaultMenus;
    } else {
      setMenus(testMenus);
      tmp = testMenus;
    }
    const { key } = findNestedChildrenFirstKeyAndLabel(tmp[0]);
    setActiveKey(key);
    if (key != pathname) {
      navigate(key);
    }

    toggleSpinning();
  };

  const dropDownList = (
    <Menu
      className="switch-workspace__dropdown"
      onClick={handleMenuClick}
      selectedKeys={[workspaceKey ?? '']}
      items={workspaceList?.map((item) => {
        return { label: item.label, key: item.code };
      })}
    >
      {/* {workspaceList?.map((item) => (
        <Menu.Item key={item.name}>{item.describe}</Menu.Item>
      ))} */}
    </Menu>
  );
  return (
    <div className={styles['switch-workspace']}>
      <div className="flex items-center h-full text-sm cursor-pointer">
        <Dropdown dropdownRender={() => dropDownList} placement="bottom" arrow trigger={['click']}>
          <div className="flex items-center justify-center">
            <div className="my-1 mr-1">{workspaceName}</div> <DownOutlined />
          </div>
        </Dropdown>
      </div>
      {spinning && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-1100 flex items-center justify-center bg-black-0.2">
          <Spin size="default" spinning={spinning} />
        </div>
      )}
    </div>
  );
};
