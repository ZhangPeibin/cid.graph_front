import { Layout } from 'antd';
import React from 'react';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Pie from '../charts/pie';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Home from '../home';
import Web3Tool from '../web3tool';
import { 
  Route, 
  Link ,
  Routes,
  useRoutes,
  BrowserRouter,
  Navigate
} from 'react-router-dom'
const {Footer, Sider, Content } = Layout;
//管理的路由组件
export default function Admin() {
  return (//管理的路由组件
  <Layout style={{minHeight:'100vh'}}>
    <Sider>
      <LeftNav/>
    </Sider>
    <Layout>
      <Header>Header</Header>
      <Content style={{margin: 20 , backgroundColor:'#fff'}}>
        
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/category' element={<Category/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/charts/pie' element={<Pie/>}></Route>
          <Route path='/charts/bar' element={<Bar/>}></Route>
          <Route path='/web3tool' element={<Web3Tool/>}></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

      </Content>
      <Footer style={{textAlign:'center',color :'#ccccc'}}>使用谷歌浏览器效果更好!</Footer>
    </Layout>
  </Layout>
    )
}
