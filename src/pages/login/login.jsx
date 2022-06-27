import React from 'react'
import logo from '../../assets/images/logo.png'
import './login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// 登录的路由组件
const onFinish = (values) => {
  console.log('Received values of form: ', values);

};
export default function Login() {

  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <div className='login-content'>
        <h2>用户登录</h2>
        <Form name="normal_login" className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="username"
            rules={[
              {
                required: true,
                message: '请输入你的用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入你的密码！',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

//toDO
//前台表单验证
//收集表单输入数据