import bgImage from '@/assets/images/signIn/bg.jpg';
import AlignCenter from '@/components/stateless/AlignCenter';
import { useGlobalStore } from '@/store';
import { setLocalStorage } from '@/utils/publicFn';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, theme } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { LoginCard } from './LoginCard';

const { Content } = Layout;

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
};

const SignIn = () => {
  const navigate = useNavigate();
  const updateUserInfo = useGlobalStore((state) => state.updateUserInfo);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    // 模拟后端登录
    const { username } = values;
    setLocalStorage('token', { token: username });
    navigate('/');
    updateUserInfo({
      username: username,
      lastLogin: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      roleName: '管理员',
    });
  };

  return (
    <Layout>
      <div
        className="absolute z-1 inset-0 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] blur-3xl"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '215rem',
        }}
      ></div>
      <Content style={{ background: colorBgContainer }}>
        <AlignCenter>
          <LoginCard>
            <div className="p-6 login-content">
              <div className="login-form-title">React Antd Admin Pro</div>
              <div className="flex justify-center mb-6 text-base">用户登录</div>
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                  username: process.env.AUTH_USER,
                  password: process.env.AUTH_PASSWORD,
                }}
                onFinish={onFinish}
              >
                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                  <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password placeholder="输入密码" prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>记住用户名</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" className="w-full">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </LoginCard>
        </AlignCenter>
      </Content>
    </Layout>
  );
};

export default SignIn;
