import React from 'react';

const AlignCenter = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-100vh items-center justify-center w-full">{children}</div>
);

export default AlignCenter;
