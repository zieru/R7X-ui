import Vue from 'vue'
import moment from 'moment'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
import notification from 'ant-design-vue/lib/notification'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    debug: []
  },

  mutations: {
    SET_DEBUG_PANEL: (state, debug, trace) => {
      state.debug.push({
        debug: debug,
        trace: trace,
        date: moment.now()
      })
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    debugPanel ({ commit }, debug) {
      commit('SET_DEBUG_PANEL', debug)
    },
    debugPanelGet ({ commit }) {
      return this.state.debug
    },
    LoginCallBack ({ commit }, AccessToken) {
      //  alert(AccessToken)
      //  console.log(AccessToken)
      Cookies.set(ACCESS_TOKEN, AccessToken)
      commit('SET_TOKEN', AccessToken)
      store
        .dispatch('GetInfo')
        .then(res => {
          const roles = res && res.role
          console.log('result', res)
          console.log('roles src/permiision.js', roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)

            router.push('/')
          })
        })
        .catch(() => {
          notification.error({
            message: 'Error',
            description: 'Request for user information failed, please try again'
          })
        })
    },
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          Cookies.set(ACCESS_TOKEN, result.access_token)
          commit('SET_TOKEN', result.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo: function ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('getinfo')
          console.log('response', response)
          const result = response
          // console.log('result', result)
          // console.log('result perm', result.role)
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            role.permissionListArr = Object.values(role.permissionList)
            console.log('role permlist', role)
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', '/avatar2.jpg')

          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

  // 登出
  Logout ({ commit, state }) {
  return new Promise((resolve) => {
    logout(state.token).then(() => {
  resolve()
  }).catch(() => {
  resolve()
  }).finally(() => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  Vue.ls.remove(ACCESS_TOKEN)
  Cookies.remove(ACCESS_TOKEN)
  })
  })
}

}
}

export default user
