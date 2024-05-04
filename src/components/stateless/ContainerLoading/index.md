## 整个页面 loading

若页面父容器不是 Card 等自带 loading 的组件，在接口 loading 时可以使用该组件

### Demo:

```tsx
import { useState } from 'react';
import * as React from 'react';
import { ContainerLoading } from 'r5-ui';

export default () => {
  return <ContainerLoading />;
};
```
