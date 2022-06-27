import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
// 左侧导航组件
export default function LeftNav() {
  //根据menu的数据数组生成的标签数组
  const getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  

  //通过Hook可以获得pathname
  const location  = useLocation()
  // console.log("render()",location.pathname)
  return (
      <div className='left-nav'>
          <Link to='/' className='left-nav-header'>
            <img src={logo} alt="logo" />
            <h1>管理后台</h1>
          </Link>

          <Menu  mode="inline" theme='dark' selectedKeys={[location.pathname]} defaultOpenKeys={['/products']}>
              {getMenuNodes(menuList)}
          </Menu>
      </div>
  )
}

