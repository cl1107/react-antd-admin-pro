import { useGlobalStore } from '@/store';
import { removeLocalStorage } from '@/utils/publicFn';
import { DownOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Popover, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeAvatar } from './ChangeAvatar';
import { ChangePassword } from './ChangePassword';
import './index.less';

const { Meta } = Card;
export const UserInfo = () => {
  const navigate = useNavigate();
  const userInfo = useGlobalStore((state) => state.userInfo);
  const [isChangeAvatarVisible, setIsChangeAvatarVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  const handleCancel = () => {
    setIsChangeAvatarVisible(false);
  };
  const handleCancel2 = () => {
    setIsChangePasswordVisible(false);
  };

  const handleLogout = () => {
    removeLocalStorage('token');
    useGlobalStore.setState({ userInfo: { username: '', lastLogin: '', roleName: '' } });
    navigate('/signIn', { replace: true });
  };

  const CardContain = (
    <Card
      bordered={false}
      actions={[
        null,
        <Button type="text" key="logout" style={{ width: 110 }} onClick={handleLogout}>
          <LogoutOutlined key="logout" />
          退出
        </Button>,
      ]}
    >
      <Meta
        style={{ padding: 0 }}
        avatar={
          <div onClick={() => setIsChangeAvatarVisible(true)} className="cursor-pointer">
            <Avatar icon={<UserOutlined />} />
          </div>
        }
        title={
          <div>
            <span>{userInfo?.username}</span>

            <Button type="link" onClick={() => setIsChangePasswordVisible(true)}>
              修改密码
            </Button>
          </div>
        }
        description={
          <div>
            {userInfo?.lastLogin
              ? `上次登录时间：${dayjs(userInfo?.lastLogin).format('YYYY-MM-DD HH:mm:ss')}`
              : null}
          </div>
        }
      />

      <div className="flex mt-4 mb-3 text-[rgba(0,0,0,0.85)]">
        <Tooltip title="系统角色">
          <TeamOutlined className="!mt-0.5 !mr-4" />
        </Tooltip>
        <div className="w-60">{userInfo.roleName}</div>
      </div>
    </Card>
  );
  return (
    <div className="user-info">
      <Popover content={CardContain} placement="bottomRight" trigger={['click']}>
        <div className="flex items-center h-full">
          <Avatar icon={<UserOutlined />} />
          <span className="my-1 mx-2 text-sm cursor-pointer">{userInfo?.username || '管理员'}</span>
          <DownOutlined style={{ fontSize: 12 }} />
        </div>
      </Popover>
      {isChangeAvatarVisible && (
        <ChangeAvatar isChangeAvatarVisible={isChangeAvatarVisible} onCancel={handleCancel} />
      )}
      {isChangePasswordVisible && (
        <ChangePassword
          isChangePasswordVisible={isChangePasswordVisible}
          onCancel={handleCancel2}
        />
      )}
    </div>
  );
};
