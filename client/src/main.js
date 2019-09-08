import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { router } from './routes'

new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App)
})
