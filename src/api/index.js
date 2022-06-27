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

reqWeather('北京').then(data => {
    console.log('data', data)
})

const BASE_URL = 'http://localhost:5000'

//获取一级 or 二级列表
export const reqCategorys = (parentId) => ajax(BASE_URL+'/manage/category/list', {parentId:parentId}, 'GET')
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE_URL+'/manage/category/add', {categoryName, parentId}, 'POST')

//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE_URL+'/manage/category/update', {categoryId, categoryName}, 'POST')