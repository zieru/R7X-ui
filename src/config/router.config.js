// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'Home' },
    redirect: '/kriteria',
    children: [
      // dashboard
      {
        path: 'kriteria',
        name: 'Kriteria',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'Kriteria', keepAlive: true, permission: ['dashboard'], icon: 'dashboard' }
      },
      {
        path: 'topsis',
        name: 'topsis',
        component: () => import('@/views/topsis/index'),
        meta: { title: 'Topsis', keepAlive: true, permission: ['itdev', 'dashboard'], icon: 'dashboard' }
      },
      {
        path: '/users',
        name: 'users',
        redirect: '/users/management',
        component: PageView,
        meta: { title: 'User Management', icon: 'user', permission: ['admin'] },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/users/management',
            name: 'usermanagements',
            component: () => import('@/views/admin/user'),
            meta: { title: 'Collection', keepAlive: true, permission: ['dashboard'], icon: 'bars' }
          }

        ]
      },
      {
        path: '/datasource',
        name: 'datasource',
        component: PageView,
        meta: { title: 'Data Source', icon: 'database', permission: ['admin'] },
        children: [
          {
            path: '/datasource/collection',
            name: 'datasourcecollection',
            component: () => import('@/views/datasource/Bilco'),
            meta: { title: 'Collection', keepAlive: true, permission: ['dashboard'], icon: 'bars' }
          }

        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: 'Form', icon: 'form', permission: ['itdev'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: ['itdev'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: ['itdev'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: ['itdev'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: false,
        meta: { title: 'Personal Page', icon: 'user', keepAlive: true, permission: ['admin', 'user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: 'Your Profile', keepAlive: true, permission: ['admin', 'user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'Settings', hideHeader: true, permission: ['admin', 'user'] },
            redirect: '/account/settings/base/connected',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base/connected',
                name: 'BaseSettingsConnected',
                component: () => import('@/views/account/settings/BaseSettingConnectedAccount'),
                meta: { title: 'Connected Account', hidden: true, permission: ['user', 'admin'] }
              },
              {
                path: '/account/settings/perfomansi/target',
                name: 'PerfomansiTargetSettings',
                component: () => import('@/views/account/settings/PerfomansiTarget'),
                meta: { title: 'Target Perfomansi', hidden: true, permission: ['admin'] }
              },
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: 'My Info', hidden: true, permission: ['itdev'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['itdev'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['itdev'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['itdev'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['itdev'] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'logincallback',
        name: 'logincallback',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/LoginCallback')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
