import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Loading = () => (
  <div className="w-100vw h-100vh flex items-center justify-center">
    <Spin indicator={antIcon} />
  </div>
);

export default Loading;
