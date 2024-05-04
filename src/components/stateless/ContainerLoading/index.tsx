import { Card } from 'antd';
import type { CSSProperties, FC } from 'react';

const ContainerLoading: FC<{ style?: CSSProperties; bordered?: boolean }> = ({
  style,
  bordered = true,
}) => {
  return <Card loading bordered={bordered} style={{ height: '100%', ...style }} />;
};
export default ContainerLoading;
