import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

// jsonp解决ajax跨域的原理
// 1、jsonp只能解决get类型的ajax请求跨域问题
// jsonp请求不是ajax请求 而是一般的get请求
//基本原理
//浏览器端：
//1、创建script标签，指定src属性，来请求后台接口
//定义好用于接收响应数据的函数，并将函数名通过请求参数提交给后台

//服务器端：
// 接收到请求处理产生的数据后，返回一个函数调用的js代码，并将结果作为实参传入函数调用


//浏览器端：
// 收到响应自动执行函数调用的js代码 也就执行了提前定义好的回调函数 并得到了需要的结果数 
//实现方式：
export const reqWeather = (cityCode) => {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=cb792e2b8ecb3287c4e44cba62aac6f4`
        jsonp(url, {}, (err, data) => {
                // console.log('jsonp请求的接口请求函数', err, data)
                // 如果请求成功
                if(!err && data.status === '1') {
                    const result = data.lives[0]
                    //取出需要的数据
                    const {province,weather} = result
                    console.log('result',result)
                    resolve({province,weather} )
                }else{
                    message.error('请求失败')
                }
            }
        )
    })    
};

const BASE_URL = '/api'
//获取一级 or 二级列表
export const reqCategorys = (parentId) => ajax(BASE_URL+'/manage/category/list', {parentId:parentId}, 'GET')

//auth to get token
export const reqGetToken = (graphObj) => ajax(BASE_URL+'/auth', graphObj, 'POST')

//adduser: POST /api/v1/user
export const postAddUser = (userObj) => ajax(BASE_URL+'/api/v1/user', userObj, 'POST')

//api/v1/graph
export const reqAddGraph = (graphObj) => ajax(BASE_URL+'/api/v1/graph', graphObj, 'POST')

// 4.update graph:PUT /api/v1/graph/:graph_id
export const reqUpdateGraph = (graphObj) => ajax(BASE_URL+'/api/v1/graph/'+graphObj.id, graphObj, 'PUT')

// 5.get graph:GET /api/v1/graph/2
export const reqGraph = (graphId) => ajax(BASE_URL+'/api/v1/graph/'+graphId)

///total/info
export const reqGetTotalInfo = () => ajax(BASE_URL+'/total/info')

//Get multiple graphs /api/v1/graphs
export const reqGraphs = (reqObj) => ajax(BASE_URL+'/api/v1/graphs', reqObj,'GET')

export const reqCids = (reqObj) => ajax(BASE_URL+'/api/v1/cids', reqObj,'GET')


//add cid
export const addCid = (cidObj) => ajax(BASE_URL+'/api/v1/cid', cidObj, 'POST')
