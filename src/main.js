import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI)

import Bus from '@/utils/bus.js'
Vue.use(Bus)

import permission from '@/permission.js'

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
