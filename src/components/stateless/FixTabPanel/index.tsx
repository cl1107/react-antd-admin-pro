import React from 'react';

const FixTabPanel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '100%', minHeight: 'calc(100vh - 232px)' }}>{children}</div>
);

export default FixTabPanel;
