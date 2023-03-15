import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'

const service = axios.create({
  timeout: 12000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 往header头中自动添加token
    const hastoken = getToken()
    if (hastoken && config.url !== '/forum/login/' && config.url !== '/datas/datas/' && config.url !== '/WEBt/terminals/') {
      config.headers['token'] = hastoken
    }
    switch (config.urlType) {
      case 'Xterm':
        config.url = import.meta.env.VITE_BASE_LOGIN_URL + config.url
        break
      case 'Login':
        config.url = import.meta.env.VITE_BASE_LOGIN_URL + config.url
        break
      case 'NetDevOps':
        config.url = import.meta.env.VITE_BASE_URL + config.url
        break
    }
    // 请求拦截进来 显示loading效果
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code !== 1000) {
      ElMessage({
        message: error.response.data.msg || '请求失败',
        type: 'error',
        duration: 1000
      })
      return Promise.reject(response)
    }
    return response.data
  },
  function (error) {
    console.log(`output->error`, error.response.data.msg)
    // 对响应错误做点什么
    ElMessage({
      message: error.response.data.msg || '请求失败',
      type: 'error',
      duration: 1000
    })
    return Promise.reject(error)
  }
)

export default service
