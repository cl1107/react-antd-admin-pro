import FixTabPanel from '@/components/stateless/FixTabPanel';
import { Alert } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const EditCoupons = () => {
  const [searchParams] = useSearchParams();
  const term = searchParams.get('id');
  return (
    <FixTabPanel>
      <Alert
        message="Success Tips"
        description="Detailed description and advice about successful copywriting."
        type="success"
        showIcon
      />
      <span>Search Id: {term}</span>
    </FixTabPanel>
  );
};

export default EditCoupons;
