// 封装request模块
import axios from 'axios' // 引入axios插件
import JSONBig from 'json-bigint' // 处理大数字插件
import store from '@/store' // 引入vuex中的store实例
import router from '@/router' // 引入路由对象实例
// 创建一个新的插件实例

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 设置一个常量的基础地址
  transformResponse: [function (data) {
    // 当后台响应的字符串回到axios请求时就会触发
    // data 是一个字符串，把字符串转化成对象并返回，默认的是JSON.parse()
    // 如果data是个空字符串，直接转化就会报错
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }] // 处理后台返回的数据 字符串=>对象 JSON.parse() => JSONBig.parse()
}) // 创建一个axios的请求工具

// 拦截器
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 在返回配置之前，往配置里塞入token
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}` // 统一注入token
    // 配置信息
    return config
  }
}, function (error) {
  return Promise.reject(error) // 直接返回错误
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 响应数据 返回得到的响应数据 第一层data是axios默认包data，第二个data是接口返回里面的包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 错误的时候token容易失效，处理token失效的问题
  // 如何判断失效
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    // 表示token过期，先判断是否有refresh_token
    if (store.state.user.refresh_token) {
      try {
        // 发送一个请求换取新的token
        let result = await axios({
          method: 'push',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token, // 拿到新的token之后
            refresh_token: store.state.user.refresh_token
          }
        }) // 更新vuex的数据，也更新了本地缓存数据
        return instance(error.config) // 将刚才错误的请求再次发送出去，将promise返回
      // result 就是返回结果
      } catch (error) {
        // 如果出错，表示补救措施无效，应跳转到登录页面并且把废掉的user全部干掉
        store.commit('clearUser') // 清空所有用户信息
        router.push(toPath)
      }
    } else {
      // 跳转对象
      // 连refresh_token都没有
      // 获取当前页面地址
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance // 导出request工具
