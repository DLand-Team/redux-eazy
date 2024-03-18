import path from 'path';
import { defineConfig } from 'vite';

// ----------------------------------------------------------------------

export default defineConfig({
  build: {
    minify: process.env.DEBUG ? false : true,
    sourcemap: 'hidden',
    lib: {
      entry: 'src/index.ts', // 设置入口文件
      name: 'redux-eazy', // 起个名字
      fileName: (format) => `redux-eazy.${format}.js`, // 打包后的文件名
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@emotion/react',
        '@mui/material',
        '@emotion/styled',
        '@mui/system',
        '@mui/x-data-grid',
        '@mui/x-date-pickers',
        'yup',
        '@mui/lab',
      ],
      output: {
        sourcemap: process.env.DEBUG ? true : false,
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          '@mui/system': '@mui/system',
          yup: 'yup',
          '@emotion/react': '@emotion/react',
          '@mui/material': '@mui/material',
          '@emotion/styled': '@emotion/styled',
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 8032,
    proxy: {
      '/api': {
        // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'https://scaling.com.au/api', // 目标地址 --> 服务器地址
        // target: 'http://localhost:4001/api', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true, // 允许websocket代理
        // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 8032,
  },
});
