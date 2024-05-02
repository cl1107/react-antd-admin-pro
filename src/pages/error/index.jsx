import FixTabPanel from '@/components/stateless/FixTabPanel';
import React from 'react';

const MyError = () => {
  const error = { error: 'error' };
  return (
    <FixTabPanel>
      <h3>Cool! Hi, React && Ant Design</h3>
      {error.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </FixTabPanel>
  );
};

export default MyError;
