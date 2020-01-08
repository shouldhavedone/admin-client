/*
 * @Description: 
 * @version: 
 * @Author: WuTao
 * @Date: 2020-01-07 13:44:18
 * @LastEditors  : WuTao
 * @LastEditTime : 2020-01-08 23:42:12
 */
const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: 'home'
  },
  {
    title: '商品',
    key: '/products',
    icon: 'appstore',
    children: [
      {
        title: '品类管理',
        key: '/products/category',
        icon: 'unordered-list'
      },
      {
        title: '商品管理',
        key: '/products/manage',
        icon: 'tool'
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety-certificate'
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart'
      }
    ]
  },
]

export default menuList