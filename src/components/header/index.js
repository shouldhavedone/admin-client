import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import './index.less'

import LinkButton from '../link-button'
import { formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api/index'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    text: '',
    temperature: ''
  }
  getTime = () => {
    // 每隔一秒钟获取当前事件，并更新状态数据currentTime
    this.intervalsId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000)
  }

  getWeather = async () => {
    // 调用接口请求异步获取数据
    const {text, temperature} = await reqWeather('成都')
    this.setState({text, temperature})
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title 
    menuList.forEach(item => {
      if(item.key === path) { // 如果当前item的key与path一样，item的title就是需要显示的title
        title = item.title
      } else if(item.children) {
        // 在所有子item中查找
        const cItem = item.children.find(cItem => cItem.key === path)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }

  Logout = () => {
    Modal.confirm({
      content: '确定要退出吗？',
      onOk: () => {
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}

        // 跳转到login
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('cancel')
      },
    })
  }

  componentDidMount() {
    // 获取当前时间
    this.getTime()
  }
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalsId)
  }
  render() {
    const {currentTime} = this.state
    const {username} = memoryUtils.user
    const title = this.getTitle()

    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.Logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
