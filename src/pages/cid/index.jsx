import React from 'react'
import {Card, message} from 'antd';
import {Divider, List, Typography} from 'antd';
import {Pagination} from 'antd';
import {Input, Space} from 'antd';
import "./index.less"
import {addCid, reqAddGraph, reqCids, reqGetToken, reqGetTotalInfo, reqGraphs} from '../../api';
import {Col, Row} from 'antd';
import {useEffect, useState} from 'react';
import {Web3Storage} from "web3.storage";
import InputDetailsPage from "./InputDetailsPage";
import {Profile} from "./Profile";
import ShowDetailsPage from "./ShowDetailsPage";
import {useContractWrite, useSignMessage} from "wagmi";
import {verifyMessage} from "ethers/lib.esm/utils";
import {ABI} from "../../contract/abi/CIDGRAPH";
import {CID_GRAPH_ADDRESS} from "../../contract/contract_address";
import Modal from "antd/es/modal/Modal";

const {Search} = Input;

const onSearch = (value) => console.log(value);

// 返回对象数组扁平化 可以用于渲染
const flatten = (arr) => {
    if (!arr) return []
    const res = arr.map(item => item)
    return res
}

const flattenCID = (arr) => {
    if (!arr) return []
    const res = arr.map(item => item)
    return res
}
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk2YTQzQ0Q0MEUwZkRhODU2Q2JGOUYzN0Y5MkJkNTM2RjRlODAwNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTcwODIxMjc0MTAsIm5hbWUiOiJydXN0LXZpZGVvLWJhaXNjIn0.-jf-5qDcA2fbQ66hmNlquxLJ8JdAftrrUEQtftbNsIM"
export default function CidGraph() {
    const recoveredAddress = React.useRef();
    const { data, isError, isLoading,isSuccess, write }  = useContractWrite({
        addressOrName: CID_GRAPH_ADDRESS,
        contractInterface: ABI,
        functionName: 'addCid',
    })
    const graphWrite   = useContractWrite({
        addressOrName: CID_GRAPH_ADDRESS,
        contractInterface: ABI,
        functionName: 'addCidGraph',
    })
    const {signMessage} = useSignMessage({
        onSuccess(data, variables) {
            // Verify signature when sign message succeeds
            const address = verifyMessage(variables.message, data)
            recoveredAddress.current = address
        },
    })

    // 首页total
    const [totalInfo, setTotalInfo] = useState({})
    // 登录后的token
    const [token, setToken] = useState('')
    // 图表数据
    const [graphs, setGraphs] = useState([])
    // cid 数据
    const [cids, setCids] = useState([])

    // 分页
    const [current, setCurrent] = useState(1);
    const [cidPageIndex, setCidPageIndex] = useState(1);

    const [showInputDialog, isShowInputDialog] = useState(false);
    const [showDetailsDialog, isShowDetailsDialog] = useState(false);
    const [showDetailsData, setShowDetailsData] = useState(null);
    const [cidOnChainVisible, setCidOnChainVisible] = useState(false);
    const [cidOnChainArgs, setCidOnChainArgs] = useState(null);
    const [cidOnChainModalText, setCidOnChainModalText] = useState("Save your uploaded file information on nervos network ?");

    const [askInputGraphVisible, setAskInputGraphVisible] = useState(false);

    const [graphOnChainVisible, setGraphOnChainVisible] = useState(false);
    const [graphOnChainModalText, setGraphOnChainModalText] = useState("Save your Graph information on nervos network ?");
    const [graphOnChainArgs, setGraphOnChainArgs] = useState(null);


    const [selectCid, setSelectCid] = useState("");
    const [selectFile, setSelectFile] = useState(null);



    const client = new Web3Storage({token: TOKEN});


    const onInputChange = async (event) => {
        const selectedFiles = event.target.files;
        console.log(selectedFiles)
        try {
            const rootCid = await client.put(selectedFiles,{wrapWithDirectory:false});
            setSelectCid(rootCid)
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            setSelectFile(selectedFiles[0])
            addCidRequest(rootCid,selectedFiles[0])
        } catch {
            console.log("Failed to send to IPFS");
        }
    }


    useEffect(() => {
        if (!token) {
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
    }, [])

    useEffect(() => {
        //获取账号的graphs
        const reqGraphsRes = async (reqObj) => {
            const res = await reqGraphs(reqObj);
            setGraphs(res.data)
            console.log('graphs', res.data);
        }
        if (token) {
            console.log("token", token);
            const reqObj = {
                token: token,
                page: current,
            }
            reqGraphsRes(reqObj)
        }
    }, [token, current])

    useEffect(() => {
        const reqCidPools = async (reqObj) => {
            const res = await reqCids(reqObj);
            setCids(res.data)
            console.log('cids', cids);
        }
        if (token) {
            const reqObj = {
                token: token,
                page: cidPageIndex,
                state: 1
            }
            reqCidPools(reqObj)
        }
    }, [token, cidPageIndex])

    const success = (msg) => {
        message.success(msg);
    };

    const getIPFSLink = (cid) => {
        return "https://ipfs.io/ipfs/" + cid
    }



    const onSignIn = () => {
        const requestObj = {
            kind: "www",
            name: "zzz",
            password: "yyy23456",
            username: "yyy"
        }
        reqGetToken(requestObj).then(res => {
                console.log('sign in success', res.data.token);
                setToken(res.data.token)
                localStorage.setItem("token", res.data.token)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const addGraph = (kv) => {
        setGraphOnChainArgs(kv)
        reqAddGraph(kv).then(res => {
                console.log(res)
                if (res["code"] === 200) {
                    success("add graph success")
                    isShowInputDialog(false)
                    setGraphOnChainVisible(true)
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const close = () => {
        isShowInputDialog(false)
        isShowDetailsDialog(false)
    }

    const clickItem = (cidItem) => {
        setSelectCid(cidItem['cid'])
        isShowInputDialog(true)
        isShowDetailsDialog(false)
    }

    const viewItem = (cidItem) => {
        setShowDetailsData(cidItem)
        isShowInputDialog(false)
        isShowDetailsDialog(true)
    }

    const addCidRequest = (cid, file) => {
        const requestObj = {
            cid: cid,
            desc: file.name,
            name: file.name,
            size: file.size,
            state: 0,
            type: file.type,
            version: 0
        }
        setCidOnChainArgs(requestObj)
        addCid(requestObj).then(res => {
                console.log(res)
                setCidOnChainVisible(true)
                // isShowInputDialog(true)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const handleCidOnChainOk = async () => {
        const obj = cidOnChainArgs;
        write({
            args: [obj['cid'],obj['name'], obj['size'], obj['type']],
        })
        setTimeout(() => {
            setCidOnChainVisible(false)
            setAskInputGraphVisible(true)
        }, 2000);
    }


    const handleGraphOnChainOk = async () => {
        const obj = graphOnChainArgs;
        graphWrite.write({
            args: [obj['cid'],obj['name'], obj['desc'], obj['metas'],
                obj['copyright'],obj['size'],obj['type']],
        })
        setCidOnChainVisible(false)
        setAskInputGraphVisible(false)
        setGraphOnChainVisible(false)
    }

    const handleAskGraphOk = ()=>{
        handleCancel();
        isShowInputDialog(true)
    }

    const handleCancel = () => {
        setCidOnChainVisible(false);
        setAskInputGraphVisible(false)
        setGraphOnChainVisible(false)
    };

    return (
        <div className='cidgraph'>
            <div className='cidgraph-header'>
                <div className='logo'/>
                <div style={{marginRight: "32px", color: "#ffffff", marginLeft: "16px"}}><h2
                    style={{color: "#ffffff"}}>Cid.Graph</h2></div>
                <Search className='cidgraph-header-search' placeholder="SEARCH BY PUECE COD DELE OR MINAB ID"
                        onSearch={onSearch} enterButton/>

                <div>
                    <input type="file"
                           id="file"
                           onChange={onInputChange}
                           style={{display: "none"}}/>
                    <button className='btn-upload'>
                        <label htmlFor="file">
                            Upload
                        </label>
                    </button>
                </div>

                <Profile/>
            </div>
            <div className='cidgraph-content'>
                <Row gutter={16} className="cidgraph-cards">
                    <Col span={8}>
                        <div className='cidgraph-card'>
                            <h2 className='h2'>TOTAL UNQUE CIDS</h2>
                            <p>{totalInfo.total_unque_cids}</p>
                        </div>
                    </Col>
                    <Col span={8}>

                        <div className='cidgraph-card'>
                            <h2 className='h2'>TOTAL GRAPH CIDS</h2>
                            <p>{totalInfo.total_graph_cids}</p>
                        </div>

                    </Col>
                    <Col span={8}>

                        <div className='cidgraph-card'>
                            <h2 className='h2'>TOTAL DATA STORED</h2>
                            <p>{totalInfo.total_data_stored}</p>
                        </div>

                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <div className='cidgraph-card-colume'>
                            <List className='cidgraph-card-colume-list'
                                  header={<div style={{marginLeft: "16px"}}>CID</div>}
                                  pagination={false}
                                  dataSource={flattenCID(cids.lists)}
                                  renderItem={(cidItem) => <List.Item className='list-item' onClick={() => {
                                      clickItem(cidItem)
                                  }}>
                                      {
                                          cidItem.type.startsWith("image/") ? (
                                              <img
                                                  height={52}
                                                  width={72}
                                                  alt="preview"
                                                  style={{objectFit: "scale-down", marginRight: "12px"}}
                                                  src={getIPFSLink(cidItem.cid)}
                                              />
                                          ) : (
                                              <img
                                                  height={52}
                                                  width={72}
                                                  alt="preview"
                                                  style={{objectFit: "scale-down", marginRight: "12px"}}
                                                  src={"https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ"}
                                              />
                                          )
                                      }

                                      {cidItem.cid}
                                  </List.Item>}
                            />
                            <Pagination style={{height: '32px', lineHeight: '32px', textAlign: 'right'}}
                                        defaultPageSize={6} current={cidPageIndex}
                                        onChange={page => setCidPageIndex(page)} total={cids.total}/>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='cidgraph-card-colume'>
                            <List className='cidgraph-card-colume-list'
                                  header={<div style={{marginLeft: "16px"}}> CID</div>}
                                  pagination={false}
                                  dataSource={flatten(graphs.lists)}
                                  renderItem={(cidItem) => <List.Item className='list-item' onClick={() => {
                                      viewItem(cidItem)
                                  }}>
                                      <List.Item.Meta
                                          avatar={
                                              cidItem.type.startsWith("image/") ? (
                                                  <img
                                                      height={52}
                                                      width={72}
                                                      alt="preview"
                                                      style={{objectFit: "scale-down", marginRight: "12px"}}
                                                      src={getIPFSLink(cidItem.ipfs_cid)}
                                                  />
                                              ) : (
                                                  <img
                                                      height={52}
                                                      width={72}
                                                      alt="preview"
                                                      style={{objectFit: "scale-down", marginRight: "12px"}}
                                                      src={"https://play-lh.googleusercontent.com/emmbClh_hm0WpWZqJ0X59B8Pz1mKoB9HVLkYMktxhGE6_-30SdGoa-BmYW73RJ8MGZQ"}
                                                  />
                                              )
                                          }
                                          title={<h4
                                              style={{color: "#ffffff"}}>{cidItem.name + " - " + cidItem.ipfs_cid} </h4>}
                                          description={<span style={{color: "#9e9c9c"}}>cidItem.desc</span>}
                                      />
                                  </List.Item>}
                            />
                            <Pagination style={{height: '32px', lineHeight: '32px', textAlign: 'right'}}
                                        current={current} onChange={page => setCurrent(page)} total={graphs.total}/>
                        </div>
                    </Col>
                </Row>
            </div>

            {showInputDialog && <InputDetailsPage
                addGraph={addGraph}
                close={close} cid={selectCid} selectFile={selectFile}/>}


            {showDetailsDialog && <ShowDetailsPage
                close={close} showDetailsData={showDetailsData}/>}


            <Modal
                visible={cidOnChainVisible}
                onOk={handleCidOnChainOk}
                onCancel={handleCancel}
            >
                <p>{cidOnChainModalText}</p>
            </Modal>

            <Modal
                visible={askInputGraphVisible}
                onOk={handleAskGraphOk}
                onCancel={handleCancel}
            >
                <p>{"perform graph operations on your data?"}</p>
            </Modal>


            <Modal
                visible={graphOnChainVisible}
                onOk={handleGraphOnChainOk}
                onCancel={handleCancel}
            >
                <p>{graphOnChainModalText}</p>
            </Modal>
        </div>

    )
}
