import TabTools from '@/layouts/basicLayout/components/TabTools';
import { useTabsStore } from '@/store/useTabsStore';
import { CloseCircleFilled } from '@ant-design/icons';
import { useSize } from 'ahooks';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

// const { TabPane } = panes;

const OperationsSlot = {
  right: <TabTools placement="bottomLeft" />,
};
export const TabsHistory = () => {
  const navigate = useNavigate();
  const { activeKey, setActiveKey, panes, setPanes, removeTab } = useTabsStore();

  /**
   * tabs编辑
   * @param {string} targetKey 被编辑的tab‘s key
   * @param {string} action 删除或者添加
   */
  const handleTabsEdit = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    action: string,
  ) => {
    if (action === 'remove' && typeof targetKey === 'string') removeTab(targetKey);
  };

  /**
   * tab切换时，路由要变化
   * @param {string} TabActiveKey
   */
  const handleTabsChange = (TabActiveKey: string) => {
    const { path } = panes.filter((item) => item.key === TabActiveKey)[0];
    navigate(path);
    setActiveKey(TabActiveKey);
  };

  const { width: headerRightWidth } = useSize(document.querySelector('#RootHeaderRight')) ?? {
    width: 390,
  };

  return (
    <div
      className={styles['section-layout-panes']}
      style={{
        width: `calc(100vw - 208px - ${headerRightWidth}px)`,
      }}
    >
      <Tabs
        tabBarExtraContent={OperationsSlot}
        defaultActiveKey="/"
        type="editable-card"
        activeKey={activeKey}
        onChange={handleTabsChange}
        hideAdd
        onEdit={handleTabsEdit}
        items={panes.map((item) => {
          // const comp = getRouteCom(item.path);
          return {
            label: item.name,
            key: item.path,
            closeIcon: <CloseCircleFilled style={{ color: '#ec6057', fontSize: 16 }} size={16} />,
          };
        })}
      />
    </div>
  );
};
