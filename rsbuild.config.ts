import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import UnoCSS from '@unocss/postcss';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [UnoCSS()],
      },
    },
  },
  server: {
    port: 9999,
  },
  output: {
    sourceMap: {
      js: process.env.NODE_ENV === 'production' ? false : 'source-map',
      css: false,
    },
    assetPrefix: '/react-antd-admin-pro',
  },
  source: {
    define: {
      'process.env.AUTH_USER': JSON.stringify(process.env.AUTH_USER),
      'process.env.AUTH_PASSWORD': JSON.stringify(process.env.AUTH_PASSWORD),
      'process.env.APP_BASE_URL': JSON.stringify(process.env.APP_BASE_URL),
    },
    alias: {
      '@': './src',
    },
  },
});
