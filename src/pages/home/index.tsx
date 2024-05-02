import FixTabPanel from '@/components/stateless/FixTabPanel';
import TypedText from '@/components/stateless/TypedText';
import { Input } from 'antd';
import { version } from 'react';

const Home = () => {
  return (
    <FixTabPanel>
      <h2>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h2>React version: {version}</h2>
      <Input placeholder="Basic usage" />
    </FixTabPanel>
  );
};

export default Home;
