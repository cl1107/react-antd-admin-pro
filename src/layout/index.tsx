import { Layout } from 'antd';
import ProContent from './proContent';
import ProHeader from './proHeader';
import ProSecNav from './proSecNav';
import ProSider from './proSider';

import styles from './index.module.less';

const ProLayout = () => (
  <Layout className={styles.layout}>
    <ProHeader />
    <Layout className={styles.layout}>
      <ProSider>
        <ProSecNav />
      </ProSider>
      <ProContent />
    </Layout>
  </Layout>
);

export default ProLayout;
