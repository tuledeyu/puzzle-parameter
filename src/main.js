import Vue from 'vue'
import App from './App.vue'

import test from './index.js'
Vue.use(test)

new Vue({
  el: '#app',
  render: h => h(App)
})
