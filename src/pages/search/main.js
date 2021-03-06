import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../../plugins/element.js'
import '../../plugins/request.js'
import '../../assets/reset.css'
import 'element-ui/lib/theme-chalk/display.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
