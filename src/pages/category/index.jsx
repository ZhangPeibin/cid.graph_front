import React, { useEffect } from 'react'
import { Card ,Table,Button ,Icon} from 'antd';
import {reqCategorys} from '../../api/index'
import './index.less'
// 商品分类路由

export default function Category() {
  //card右侧标题
  const title = '一级分类列表'

  //card右侧
  const extra = ''

  
  const [dataSource,setDataSource] = React.useState([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ])

  //获取分类列表
  const getCategorys = async () => {
    const result = await reqCategorys()
    if(result.status === 0){
      const categorys = result.data
      if(categorys.length > 0){
        this.setState({
          dataSource: categorys
        })
      }
    }
  }
  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name', 
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width:300,
      render: () => (
        <span>
          <Button type="primary"> <Icon type="detail" />查看</Button>
          <Button type="primary"> <Icon type="edit" />编辑</Button>
        </span>
      )
    },

  ];
  return (
      <Card className='category'
        title={title}
        extra={
          <Button type='primary'>
            <Icon type='plus'/>
            添加
          </Button>
        }>
        <Table 
          dataSource={dataSource} 
          columns={columns}
          bordered
         />;
    </Card>
  )
}
