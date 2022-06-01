import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import router from './router'
import {
  setHeaderToken
} from './helper/auth'
import './app.css'
axios.defaults.baseURL = 'http://localhost:8000/api/'

Vue.config.productionTip = false

const token = localStorage.getItem('token');

if (token) {
  setHeaderToken(token)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')