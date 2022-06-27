import React from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import {useState,useEffect} from 'react'
import {reqWeather} from '../../api'
import { useLocation } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import Wallet from '../wallet/wallet'
//头部组件
export default function Header() {
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  const [province, setProvince] = useState('')
  const [weather,setWeather] = useState('-')
  
  // useEffect的作用是相当于didMount和didUpdate时候会自动执行  这个是肯定的 只要你组件有更新 这个函数一定会执行。
  // 反复执行这个进行渲染 会消耗性能 如果能实现if(prevs.status== this.state.status) 则不渲染，同样的，在useEffect中 如果你要比对，就在后面加上[state]即可。
  // [stateA、stateB] 当stateA stateB和上次都一样时候  跳过本次更新  否则进行更新
  // state会有三种情况：
  // 1. 不传
  // 表示每轮组件渲染完成后执行，也就是渲染一次执行一次。有点像 componentDidUpdate
  // 2. 传空数组 []
  // 表示没有任何依赖，永远都只执行一次。有点像 componentDidMount
  // 3. 传入一个依赖数组 [props.haha]
  // 表示依赖发生变化，渲染后执行。还是像 componentDidUpdate 只是设置了门槛
  //如果你在useEffect开了定时器或者消息订阅 那你需要再组件销毁时（willUnmount）进行清除。清除的方法是定义一个return 函数
  useEffect(() => {
    //获取当前时间
    const timer = setInterval(() => {
      setCurrentTime(formateDate(Date.now()))
    }, 1000)//每隔一秒执行一次 获取当前时间
    return ()=>{
      clearInterval(timer)
    }
  }) 

  useEffect(() => {
    //获取当前天气
    const getWeather = async () => {
      const {province, weather} = await reqWeather('110101')
      console.log('weather',weather)
      setWeather(weather)
      setProvince(province)
    }
    getWeather()
  },[]) //仅在挂载

  const loc = useLocation()

  //获取当前路径
  const getTitle = () => {
    const pathname = loc.pathname
    let title = '' 
    menuConfig.forEach(item => {
      if (item.key === pathname) {
        title =  item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === pathname)
        title =  cItem ? cItem.title : item.title
      }
    })
    return title
  }
  

  return (
    <div className='header'>
      <div className='header-top'>
        <span><Wallet/></span>
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>
          {getTitle()}
        </div>
        <div className='header-bottom-right'>
          <span>{currentTime}</span>
          {/* <img src={dayPicticturl} alt="weather"/> */}
          <span>{province}</span>
          <span>{weather}</span>
        </div>

      </div>
    </div>
  )
}
