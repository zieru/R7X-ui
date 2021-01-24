import api from './index'
import { axios } from '@/utils/request'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/store/mutation-types'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function logincheck (parameter) {
  return axios({
    url: 'user/test',
    method: 'post',
    data: parameter
  })
}

export function login (parameter) {
/*
  return axios({
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
  */
  return axios({
    url: process.env.VUE_APP_API_LOGIN_URL,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  /* return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }) */
  console.log('getinfo', 'Bearer ' + Cookies.get(ACCESS_TOKEN))
   axios.defaults.headers.common = {
    Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN)
  }
  return axios({
    url: process.env.VUE_APP_API_USERDETAIL_URL,
    method: 'get'
  })
}

export function getCurrentUserNav (token) {
  return axios({
    url: '/user/nav',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: '/api/v1/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
