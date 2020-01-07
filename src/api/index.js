/*
 * @Description: 
 * @version: 
 * @Author: WuTao
 * @Date: 2020-01-07 00:14:35
 * @LastEditors  : WuTao
 * @LastEditTime : 2020-01-07 00:59:06
 */
/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */

 import ajax from './ajax'
const BASE = ''
// // 登录
// export function reqLogin(username, password){
//   return ajax('/login', {username, password}, 'POST')
// }

// 登录
export const reqLogin = (username, password) => ajax(`${BASE}/login`, {username, password}, 'POST')

// 
export const reqAddUser = (user) => ajax(`${BASE}/manage/user/add`, user, 'POST')