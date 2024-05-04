import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css';

import App from './App';
import { useProThemeContext } from './theme/hooks';
import myThemes from './theme/index';

dayjs.locale('zh-cn');

const ThemeIndex = () => {
  const { myTheme } = useProThemeContext();
  ConfigProvider.config({
    prefixCls: 'cl-ant',
    iconPrefixCls: 'cl-icon',
  });
  return (
    <BrowserRouter>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: myTheme === 'light' ? myThemes.lightTheme : myThemes.darkTheme,
          }}
          prefixCls="cl-ant"
          iconPrefixCls="cl-icon"
        >
          <App />
        </ConfigProvider>
      </StyleProvider>
    </BrowserRouter>
  );
};

export default ThemeIndex;
