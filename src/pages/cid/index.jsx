import React from 'react'
import { Card } from 'antd';
import { Divider, List, Typography } from 'antd';
import { Pagination } from 'antd';
import { Input, Space } from 'antd';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
import "./index.less"
import {addCid, reqCids, reqGetToken, reqGetTotalInfo, reqGraphs} from '../../api';
import { Col, Row } from 'antd';
import { useEffect,useState } from 'react';
import {Web3Storage} from "web3.storage";
const { Search } = Input;

const onSearch = (value) => console.log(value);

// 返回对象数组扁平化 可以用于渲染
const flatten = (arr) => {
    if(!arr) return []
    const res =  arr.map(item =>  item.ipfs_cid + " " + item.name + " " + item.desc )
    return res
}

const flattenCID = (arr) => {
    if(!arr) return []
    const res =  arr.map(item =>  item.cid )
    return res
}
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2YTQzQ0Q0MEUwZkRhODU2Q2JGOUYzN0Y5MkJkNTM2RjRlODAwNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTcwODIxMjc0MTAsIm5hbWUiOiJydXN0LXZpZGVvLWJhaXNjIn0.-jf-5qDcA2fbQ66hmNlquxLJ8JdAftrrUEQtftbNsIM"
export default function CidGraph() {
    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error,isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    // 首页total
    const [totalInfo,setTotalInfo] = useState({})
    // 登录后的token
    const [token,setToken] = useState('')
    // 图表数据
    const [graphs,setGraphs] = useState([])
    // cid 数据
    const [cids,setCids] = useState([])

    // 分页
    const [current, setCurrent] = useState(1);

    const client = new Web3Storage({token: TOKEN});

    const onInputChange = async (event) => {
        const selectedFiles = event.target.files;
        console.log(selectedFiles)
        try {
            const rootCid = await client.put(selectedFiles,{wrapWithDirectory:false});
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            addCidRequest(rootCid,selectedFiles[0])
        } catch {
            console.log("Failed to send to IPFS");
        }
    }


    useEffect(()=>{
        if(!token){
            onSignIn();
        }
    })

    // 每次页面挂载时会执行一次
    useEffect(() => {
        const reqGetTotalInfoRes = async () => {
            const res = await reqGetTotalInfo();
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
        if(token){
            console.log("token",token);
            const reqObj = {
                token: token,
                page: current
            }
            reqGraphsRes(reqObj)
        }
    },[token,current])

    useEffect(() => {
        //获取账号的graphs
        const reqCidPools = async (reqObj) => {
            const res = await reqCids(reqObj);
            setCids(res.data)
            console.log('cids',cids);
        }
        if(token){
            const reqObj = {
                token: token,
                page: current
            }
            reqCidPools(reqObj)
        }
    },[token,current])

    const getIPFSLink = (cid) =>{
        return "https://ipfs.io/ipfs/" + cid['cidItem']
    }

    const onSignIn = () => {
        const requestObj = {
            kind: "www",
            name: "zzz",
            password: "yyy23456",
            username: "yyy"
        }
        reqGetToken(requestObj).then(res => {
            console.log('sign in success',res.data.token);
            setToken(res.data.token)
            localStorage.setItem("token",res.data.token)
        }
        ).catch(err => {
            console.log(err)
        })
    }


    const addCidRequest = (cid,file) => {
        const requestObj = {
            cid: cid,
            desc: file.name,
            name: file.name,
            size: file.size,
            state: 0,
            type: file.type,
            version: 0
        }
        addCid(requestObj).then(res => {
                console.log(res)
            }
        ).catch(err => {
            console.log(err)
        })
    }
    
  return (
    <div className='cidgraph'>
        <div className='cidgraph-header'>
            <div className='logo'></div>
            <div style={{marginRight:"32px",color:"#ffffff",marginLeft:"16px"}}> <h2 style={{color:"#ffffff"}}>Cid.Graph</h2></div>
            <Search className='cidgraph-header-search' placeholder="SEARCH BY PUECE COD DELE OR MINAB ID" onSearch={onSearch} enterButton />

            <div>
                <input type="file"
                       id="file"
                       onChange={onInputChange}
                       style={{display: "none"}}/>
                <button className='btn-upload'>
                    <label htmlFor="file" >
                        Upload
                    </label>
                </button>
            </div>

            {connectors.map((connector) => (
            <button className='btn-connect'
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect(connector)}
            >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
            ))}
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
                    <div  className='cidgraph-card-colume'>
                        <List  className='cidgraph-card-colume-list'
                               header={<div style={{marginLeft:"16px"}}>CID</div>}
                               pagination = {false}
                               dataSource={flattenCID(cids.lists)}
                               renderItem={(cidItem) => <List.Item className='list-item'>
                                   <img
                                       height={52}
                                       width={72}
                                       alt="preview"
                                       style={{objectFit:"scale-down",marginRight:"12px"}}
                                       src={getIPFSLink({cidItem})}
                                   />
                                   {cidItem}
                               </List.Item>}
                        />
                        <Pagination style={{height: '32px', lineHeight: '32px', textAlign: 'right'}} current={current} onChange={page=>setCurrent(page)} total={cids.total} />
                    </div>                </Col>
                <Col span={12}>
                    <div  className='cidgraph-card-colume'>
                        <List  className='cidgraph-card-colume-list'
                            header={<div style={{marginLeft:"16px"}}>  CID</div>}
                            pagination = {false}
                            dataSource={flatten(graphs.lists)}
                            renderItem={(item) => <List.Item className='list-item'>
                                <img
                                    height={52}
                                    alt="logo"
                                    style={{marginRight:"12px"}}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                                {item}
                            </List.Item>}
                            />
                         <Pagination style={{height: '32px', lineHeight: '32px', textAlign: 'right'}} current={current} onChange={page=>setCurrent(page)} total={graphs.total} />
                    </div>
                </Col>
             </Row>
        </div>
    </div>

  )
}
