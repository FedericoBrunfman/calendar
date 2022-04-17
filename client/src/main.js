import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Spinner from './components/spinner.vue'
import Loading from './components/loading.vue'

Vue.component('spinner', Spinner)
Vue.component('loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
