// 入口文件
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/antd.min.css'
//将App组件渲染到index.html的div标签中
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);