import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';

import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

const Item = Form.Item

class Login extends Component {

  handleSubmit = e => {
    e.preventDefault(); // 阻止事件的默认行为：阻止表单的提交
    this.props.form.validateFields(async (err, values) => {
      if(!err){
        // alert(`发送登陆的请求,username=${username}, password=${password}`)
        const {username, password} = values
        const result = await reqLogin(username, password)
        if(result.status === 0){ // 登录成功
          message.success('登录成功')

          // 保存user
          const user = result.data
          memoryUtils.user = user // 保存到内存中
          storageUtils.saveUser(user) // 保存在local中

          // 跳转到管理界面,不需要回退过来
          this.props.history.replace('/')
        } else { // 登录失败
          message.error(result.msg)
        }
      } else {
        console.log('验证失败！')
      }
    })
  }

  // 对密码自定验证
  validatePwd = (rule, value, callback) => {
    value = value.trim()
    if (!value){
      callback('密码不能为空！')
    } else if (value.length < 4){
      callback('密码不能小于4位！')
    } else if (value.length > 12){
      callback('密码不能大于12位！')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须是英文、数字或者下划线组成')
    } else {
      callback() // 验证通过
    }
  }
  render() {
    // 如果用户已经登录，自动跳转到管理界面
    const user = memoryUtils.user
    if(!user && !user._id) {
      return <Redirect to='/' />
    }

    const {getFieldDecorator} = this.props.form
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
              {getFieldDecorator('username', {
                initialValue: '', // 初始值
                rules: [
                  { required: true, whiteSpace: true, message: '请输入用户名!' },
                  { min: 4, message: '用户名不能少于4位'},
                  { max: 12, message: '用户名不能大于12位'},
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或者下划线组成'}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Item>
            <Item>  
              {getFieldDecorator('password', {
                initialValue: '', // 初始值
                rules: [
                  { validator: this.validatePwd }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
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

const WrapperForm = Form.create()(Login)

export default WrapperForm


/*
async和await
1. 作用？
  简化promise对象的使用：不用再使用then()类指定成功/失败的回调函数
  以同步编码（没有回调函数）方式实现异步流程
2. 哪里写await?
  在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3. 哪里写async?
  await所在函数（最近的）定义的左侧写async
*/