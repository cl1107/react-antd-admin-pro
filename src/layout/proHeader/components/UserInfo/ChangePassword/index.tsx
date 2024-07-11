import { LockOutlined } from '@ant-design/icons';
import { Col, Form, Input, message, Modal, Progress, Row } from 'antd';
import type { RuleObject } from 'antd/lib/form';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

const passwordStrengthTestMap = new Map([
  ['LOW', /^[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,}$/],
  [
    'MEDIUM',
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,}$/,
  ],
  [
    'SAFE',
    /(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,}$/,
  ],
  [
    'HIGH',
    /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[\W_!@#$%^&*`~()-+=])[a-zA-Z\d\W_!@#$%^&*`~()-+=]{10,}$/,
  ],
]);

export const ChangePassword: React.FC<{
  isChangePasswordVisible: boolean;
  onCancel?: () => void;
  isPwdExpired?: boolean;
}> = ({ isChangePasswordVisible, onCancel, isPwdExpired }) => {
  const [strokeColor, setStrokeColor] = useState('rgb(170, 0, 51)');
  const [progress, setProgress] = useState<number>(0);
  const [strengthPolicy, setStrengthPolicy] = useState<string>('MEDIUM');
  const [tip, setTip] = useState<string>(
    '数字、小写字母，大写字母或特殊字符中的任意两种组成，长度至少 6 位',
  );

  useEffect(() => {
    if (isChangePasswordVisible) {
      // getPasswordStrengthPolicyApi().then((res) => {
      //   if (res) {
      //     setTip(res.desc);
      //     setStrengthPolicy(res.name);
      //   }
      // });
    }
  }, [isChangePasswordVisible]);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };
  const onFinish = async (values: { newPwd: string; oldPwd: string }) => {
    if (values.oldPwd === values.newPwd) {
      message.info('新密码不能与旧密码相同');
      return;
    }
    // 调用密码修改接口然后回到登录页面重新登录
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue } = e.target;
    setProgress(targetValue.length);
    passwordStrengthTestMap.forEach((value, key) => {
      if (value.test(targetValue)) {
        switch (key) {
          case 'LOW':
            setProgress(25);
            // setStrong('exception');
            setStrokeColor('rgb(170, 0, 51)');
            break;
          case 'MEDIUM':
            setProgress(50);
            // setStrong('exception');
            setStrokeColor('rgb(255, 204, 51)');
            break;
          case 'SAFE':
            setProgress(75);
            // setStrong('success');
            setStrokeColor('rgb(102, 153, 204)');
            break;
          case 'HIGH':
            setProgress(100);
            // setStrong('exception');
            setStrokeColor('rgb(0, 128, 0)');
            break;
          default:
            // setStrong('exception');
            setStrokeColor('rgb(170, 0, 51)');
            break;
        }
      }
    });
  };

  const formatProgress = (percent?: number) => {
    switch (percent) {
      case 0:
        return '';
      case 25:
        return '低';
      case 50:
        return '中等';
      case 75:
        return '安全';
      case 100:
        return '高';
      default:
        return '不符合要求';
    }
  };

  const validateNewPassword = (rule: RuleObject, value: string) => {
    const reg = passwordStrengthTestMap.get(strengthPolicy);
    if (reg && reg.test(value)) {
      return Promise.resolve();
    }
    // return Promise.reject(passwordTipMap.get(strengthPolicy));
    return Promise.reject();
  };

  return (
    <Modal
      title="修改密码"
      open={isChangePasswordVisible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelButtonProps={isPwdExpired ? { style: { display: 'none' } } : undefined}
      closable={!isPwdExpired}
      cancelText="取消"
      okText="确定"
      width={800}
    >
      <Form
        form={form}
        name="changePassword"
        labelCol={{ span: 5 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="旧密码"
          style={{ marginBottom: 4 }}
          name="oldPwd"
          rules={[{ required: true, message: '请输入旧密码' }]}
        >
          <Input.Password placeholder="输入旧密码" prefix={<LockOutlined />} name="oldPwd" />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPwd"
          style={{ marginBottom: 4 }}
          rules={[
            {
              required: true,
              validator: validateNewPassword,
            },
          ]}
        >
          <Input.Password
            placeholder="输入新密码"
            prefix={<LockOutlined />}
            name="newPwd"
            onChange={handleChange}
          />
        </Form.Item>
        <Row style={{ marginTop: -4, marginBottom: 4 }}>
          <Col offset={5}>
            <div>{tip}</div>
            <Row>
              <Col span={6}>密码强度：</Col>
              <Col span={18}>
                <Progress
                  percent={progress}
                  size="small"
                  strokeColor={strokeColor}
                  format={formatProgress}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item
          label="确认新密码"
          style={{ marginBottom: 4 }}
          name="confirmNewPwd"
          rules={[
            {
              required: true,
              validator: (rule, value) => {
                if (value === form.getFieldsValue().newPwd) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不相同'));
              },
            },
          ]}
        >
          <Input.Password placeholder="确认新密码" prefix={<LockOutlined />} name="confirmNewPwd" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
