import Vue from 'vue'
import App from './App.vue'
import '../../plugins/element.js'
import '../../plugins/request.js'
import '../../assets/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
