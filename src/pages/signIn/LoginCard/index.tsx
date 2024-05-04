import type { ReactNode } from 'react';
import './index.less';

export const LoginCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="login-card">
      <div className="login-card__inner">{children}</div>
    </div>
  );
};
