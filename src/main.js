// with polyfills
/*
import 'core-js/stable'
import 'regenerator-runtime/runtime'
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import { Dialog } from '@/components'
import { axios } from 'axios'

import './components/global.less'
import './components/element.scss'
import wb from './registerServiceWorker'

import VueInstaller from 'vue-pwa-installer'
import moment from 'moment'
Vue.prototype.$workbox = wb
Vue.prototype.$moment = moment
Vue.config.productionTip = true
// mount axios Vue.$http and this.$http
Vue.use(VueAxios, axios)

Vue.use(Dialog)

Vue.use(VueInstaller, { /* options */ })
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
