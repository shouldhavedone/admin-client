/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'
const BASE = ''
// // 登录
// export function reqLogin(username, password){
//   return ajax('/login', {username, password}, 'POST')
// }

// 登录
export const reqLogin = (username, password) => ajax(`${BASE}/login`, {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(`${BASE}/manage/user/add`, user, 'POST')

// json请求的接口请求函数
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=UOVk1e3DFyYL1fAkdhMYX4O5d7hr8M1d&callback=showLocation`
    jsonp(url, {}, (err, data) => {
      if(!err && !data.status){
        const {text, temperature} = data.results[0].now
        resolve({text, temperature}) 
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}
