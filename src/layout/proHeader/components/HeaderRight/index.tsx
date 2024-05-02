import { Space, Switch } from 'antd';
import { useState } from 'react';
import HeaderSearch from '../HeaderSearch';
import { SwitchWorkspace } from '../SwitchWorkspace';
import { UserInfo } from '../UserInfo';
// import { SwitchThemeButton } from '@/components/SwitchThemeButton';
import LanguageSwitcher from '@/components/stateless/LanguageSwitcher';
import Fullscreen from '@/layout/fullscreen';
import { useTabsStore } from '@/store/useTabsStore';
import { useProThemeContext } from '@/theme/hooks';
import { findMenuItem } from '@/utils/menu';
import { GithubOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const highlightText = (text: string, searchText: string) => {
  const highlightStr = `<span style="color:red">${searchText}</span>`;
  // new 出来一个正则表达式reg>根据动态数据变量来创建
  // 参数一 将 searchText的值解析成字符串,并根据这个创建正则表达式,
  // 参数二 匹配模式  "gi"
  const reg = new RegExp(searchText, 'gi');
  // 返回替换后的心字符串
  return text.replace(reg, highlightStr);
};

export const HeaderRight = () => {
  const navigate = useNavigate();
  const menus = useTabsStore((state) => state.menus);

  const [options, setOptions] = useState<{ label: JSX.Element; value: string }[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const handleSearch = (value: string | undefined) => {
    if (value) {
      const res = findMenuItem(value, menus);
      console.log('🚀 ~ file: index.js ~ line 70 ~ handleSearch ~ res', res);
      if (Array.isArray(res)) {
        const option = res.map((item) => {
          if (item.path.startsWith('https://') || item.path.startsWith('http://')) {
            return {
              label: (
                <a
                  target="_blank"
                  href={item.path}
                  style={{ display: 'block', width: '100%' }}
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.name, value),
                  }}
                  rel="noreferrer"
                />
              ),
              value: item.name,
            };
          }
          return {
            label: (
              <Link
                to={item.path}
                style={{ display: 'block', width: '100%' }}
                dangerouslySetInnerHTML={{
                  __html: highlightText(item.name, value),
                }}
              />
            ),
            value: item.name,
          };
        });
        setOptions(option);
      }
    } else {
      setOptions([]);
    }
  };
  // 按下enter选中后跳转路由
  // TODO:更改any
  const handleSelect = (optionsParams: any) => {
    if (optionsParams) {
      if (optionsParams.label.props.to) {
        navigate(optionsParams.label.props.to);
      } else if (optionsParams.label.props.href) {
        window.open(optionsParams.label.props.href, '_blank');
      }
    }
  };

  const { myTheme, setMyTheme } = useProThemeContext();

  const setAntdTheme = () => {
    setMyTheme(myTheme === 'light' ? 'dark' : 'light');
  };

  const redirectGithub = () => {
    window.open('https://github.com/wkylin/promotion-web', '_blank');
  };

  return (
    <div className={styles['header__right']}>
      <Space size={12}>
        <HeaderSearch
          className={`${styles.action}`}
          placeholder="菜单"
          options={options}
          onSelect={handleSelect}
          onSearch={handleSearch}
          onBlur={() => {
            setOptions([]);
            setTimeout(() => {
              setIsFocus(false);
            }, 300);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
        />
        <Switch
          className="!mb-1"
          checkedChildren={<SunOutlined />}
          unCheckedChildren={<MoonOutlined />}
          onClick={setAntdTheme}
        />
        <GithubOutlined style={{ fontSize: 16 }} onClick={redirectGithub} />
        <Fullscreen />
        <LanguageSwitcher />
        <SwitchWorkspace />
        <UserInfo />
      </Space>
    </div>
  );
};
