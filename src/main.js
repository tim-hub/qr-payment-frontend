import Vue from 'vue'
import App from './App.vue'
import VueQrcodeReader from 'vue-qrcode-reader'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueQrcodeReader)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
