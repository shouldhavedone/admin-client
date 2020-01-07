/*
 * @Description: 
 * @version: 
 * @Author: WuTao
 * @Date: 2020-01-05 17:12:54
 * @LastEditors  : WuTao
 * @LastEditTime : 2020-01-07 14:02:24
 */
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 如果内存没有存储user => 当前没有登录
    if(!user || !user._id){
      // 自动跳转到登录（在render()中
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{height: '100%'}}>
        <Sider><LeftNav /></Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/products' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#ccc'}}>Made with ❤ by WuTao</Footer>
        </Layout>
      </Layout>
    )
  }
}
