import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './theme/index.css'
import ElementUI from 'element-ui';

// 导入markdown编辑器
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VMdEditor.use(githubTheme);
Vue.use(VMdEditor);

//elementui
Vue.config.productionTip = false
Vue.use(ElementUI)

import global_ from './Base.vue'
Vue.prototype.GLOBAL = global_;

import Bus from '@/utils/bus.js'
Vue.use(Bus)

import permission from '@/permission.js'

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
