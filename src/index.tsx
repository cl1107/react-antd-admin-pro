import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import ThemeIndex from './ThemeIndex';
import i18n from './i18n/i18n';
import './index.css';
import { ProThemeProvider } from './theme/hooks';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ProThemeProvider>
        <ThemeIndex />
      </ProThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);
