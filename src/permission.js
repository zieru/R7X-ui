/* import Vue from 'vue' */
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult', 'logincallback'] // no redirect whitelist
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  /*
  if (Vue.ls.get(ACCESS_TOKEN)) {
*/
  if (Cookies.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
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
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                // setelah login
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: 'Error',
              description: 'Request for user information failed, please try again'
            })
            store.dispatch('Logout').then(() => {
                next({ path: '/user/login', query: { redirect: to.fullPath, xc: 'getinfoerror' } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      //  setelah logout
      next({ path: '/user/login', query: { redirect: to.fullPath, xc: 'unauthorized', xx: 'nouserinfo' } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
