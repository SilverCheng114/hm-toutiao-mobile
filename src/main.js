import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less' // vant样式文件
import '@/styles/index.less' // 引入全局的自定义样式
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
