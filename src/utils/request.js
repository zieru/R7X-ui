import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import cookies from 'js-cookie'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 1000 * 60 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = ACCESS_TOKEN
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 406) {
      notification.warn({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            //  window.location.reload()
          }, 1500)
        })
      }
    } else if (error.response.status === 406) {
      notification.warn({
        message: 'Forbidden',
        description: data.message
      })
    } else {
      console.log(error.response.status)
      notification.error({
        message: 'General Error',
        description: error
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  cookies.get(ACCESS_TOKEN)
  Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // config.headers['ACCESS_TOKEN'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
  }, function (error) {
  if (!error.response) {
    notification.error({
      message: 'Network error',
      description: 'Backend server no response, Please check your network connection or contact administrator'
    })
  }
  if (typeof error.response !== 'undefined') {
    console.log('err resp', error.response)
    console.log('err resp status', error.response.status)
    if (typeof error.response.status !== 'undefined') {
      if (error.response.status === 401) {
        return Promise.reject(error.response)
      } else if (error.response.status === 406) {
        notification.warn({
          message: 'Warning',
          description: error.response.data.message || error.message + ' While accessing : ' + error.config.url
        })
      } else {
        store.dispatch('debugPanel', error.response.data)
        notification.error({
          message: error.response.data.errors || error.errors + 'General Error',
          description: error.response.data.message || error.message + ' While accessing : ' + error.config.url
        })
        return Promise.reject(error)
      }
    }
  }
})

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
