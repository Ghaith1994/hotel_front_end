import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'

import 'vue-select/src/scss/vue-select.scss'
import 'vue2-datepicker/index.css'

Vue.component('v-select', vSelect)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
