import FixTabPanel from '@/components/stateless/FixTabPanel';
import { useTabsStore } from '@/store/proTabsContext';
import { Alert, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddCoupons = () => {
  const { activeKey, removeTab } = useTabsStore();
  const navigate = useNavigate();
  const closeActiveOpenAngular = () => {
    removeTab(activeKey, () => {
      navigate('coupons/edit', { replace: true });
    });
  };
  return (
    <FixTabPanel>
      <Button type="link" onClick={closeActiveOpenAngular}>
        关闭当前标签 并打开 Angular标签
      </Button>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
    </FixTabPanel>
  );
};

export default AddCoupons;
