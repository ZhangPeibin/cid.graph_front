import React from 'react'
import { Card } from 'antd';
import { Divider, List, Typography } from 'antd';
import { Pagination } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import "./index.less"
import { reqGetToken,reqGetTotalInfo, reqGraphs } from '../../api';
import { Col, Row } from 'antd';
import { useEffect,useState } from 'react';
const { Search } = Input;

const onSearch = (value) => console.log(value);

// 返回对象数组扁平化 可以用于渲染
const flatten = (arr) => {
    if(!arr) return []
    const res =  arr.map(item =>  item.ipfs_cid + " " + item.name + " " + item.desc )
    console.log('res',res)
    return res

}

export default function CidGraph() {
    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    // 首页total
    const [totalInfo,setTotalInfo] = useState({})
    // 登录后的token
    const [token,setToken] = useState('')
    // 图表数据
    const [graphs,setGraphs] = useState([])

    // 分页
    const [current, setCurrent] = useState(1);


    // 每次页面挂载时会执行一次
    useEffect(() => {
        const reqGetTotalInfoRes = async () => {
            const res = await reqGetTotalInfo();
            console.log("totalInfo",res);
            setTotalInfo(res.data)
        }
        reqGetTotalInfoRes() 
    },[])

    useEffect(() => {
        //获取账号的graphs
        const reqGraphsRes = async (reqObj) => {
            const res = await reqGraphs(reqObj);
            setGraphs(res.data)
            console.log('graphs',res.data);
        }
        if(token !== ''){
            console.log("token",token);
            const reqObj = {
                token: token,
                page: current
            }
            reqGraphsRes(reqObj)
        }
    },[token,current])

    const onSignIn = () => {
        console.log("sign in")
        const requestObj = {
            kind: "www",
            name: "zzz",
            password: "yyy23456",
            username: "yyy"
        }
        reqGetToken(requestObj).then(res => {
            console.log('sign in success',res.data.token);
            setToken(res.data.token)
        }
        ).catch(err => {
            console.log(err)
        })
    }
    
  return (
    <div className='cidgraph'>
        <div className='cidgraph-header'>
            <div className='logo'>logo</div>
            <Search className='cidgraph-header-search' placeholder="SEARCH BY PUECE COD DELE OR MINAB ID" onSearch={onSearch} enterButton />
            {connectors.map((connector) => (
            <button className='btn-connect'
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect(connector)}
            >
                CONNECT WALLET
            </button>
            ))}
            <button className='btn-connect' onClick={()=>onSignIn()}>登录|注册</button>
        </div>
        <div className='cidgraph-content'>
             <Row gutter={16} className="cidgraph-cards">
                <Col span={8}>
                    <div  className='cidgraph-card'>
                        <h2 className='h2'>TOTAL UNQUE CIDS</h2>
                        <p>{totalInfo.total_unque_cids}</p>
                    </div>
                </Col>
                <Col span={8}>
        
                        <div  className='cidgraph-card'>
                            <h2 className='h2'>TOTAL GRAPH CIDS</h2>
                            <p>{totalInfo.total_graph_cids}</p>
                        </div>
      
                </Col>
                <Col span={8}>
                    
                        <div  className='cidgraph-card'>
                            <h2 className='h2'>TOTAL DATA STORED</h2>
                            <p>{totalInfo.total_data_stored}</p>
                        </div>
                    
                </Col>
             </Row>

             <Row  gutter={16}>
                <Col span={12}>
                    <div  className='cidgraph-card-colume'>1111</div>
                </Col>
                <Col span={12}>
                    <div  className='cidgraph-card-colume'>
                        <List  className='cidgraph-card-colume-list'
                            header={<div>CID</div>}
                            pagination = {false}
                            dataSource={flatten(graphs.lists)}
                            renderItem={(item) => <List.Item className='list-item'>{item}</List.Item>}
                            />
                         <Pagination style={{height: '32px', lineHeight: '32px', textAlign: 'right'}} current={current} onChange={page=>setCurrent(page)} total={graphs.total} />
                    </div>
                </Col>
             </Row>
        </div>
    </div>

  )
}
