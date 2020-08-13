import axios from 'axios'
import store from '@/store'
import {Toast} from 'vant'
// 根据环境不同引入不同api地址
import {baseApi} from '@/config'
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideLoading) {
      // loading
      Toast.loading({
        forbidClick: true,
        duration: 0
      })
    }
    if (store.getters.token) {
      config.headers['token'] = ''
    }
    console.log("Now request " + config.url)
    console.log(config.data)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    console.log(res)
    if (response.status !== 200) {
      // 登录超时,重新登录
      if (response.status === 401) {
        store.dispatch('user/fedLogOut').then(() => {
          location.reload()
        })
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    Toast.clear()
    let errMsg = error.toString()
    console.log(errMsg) // for debug
    if (error.message.includes('timeout')) {
      return Promise.reject('网络超时')
    }
    return Promise.reject(errMsg)
  }
)

export default service
