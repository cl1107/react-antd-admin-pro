import FixTabPanel from '@/components/stateless/FixTabPanel';
import { Input } from 'antd';

const ProDemo = () => {
  return (
    <FixTabPanel>
      <h2>
        项目文档<span style={{ fontSize: 12, color: '#999', margin: '0 10px' }}>待完善</span>
      </h2>
      <Input placeholder="Basic usage" />
    </FixTabPanel>
  );
};

export default ProDemo;
