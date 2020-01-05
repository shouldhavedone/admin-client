import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import './login.less'
import logo from './images/logo.jpg'


const Item = Form.Item

export default class Login extends Component {

  handleSubmit = e => {
    e.preventDefault(); // 阻止事件的默认行为：阻止表单的提交
    alert('发送登陆的请求')
  }

  render() {
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </Item>
            <Item>  
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className='login-form-button'>
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
