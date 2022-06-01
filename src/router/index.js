import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('../components/HomeComponent.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComponent.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/DashboardComponent.vue')
  },
  {
    path: '/list-items',
    name: 'list-item',
    component: () => import('../components/ListComponent.vue'),
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // jika ingin akses halaman yang butuh auth
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/login')
  }

  // jika ingin akses halaman yang butuh auth
  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/home')
  }

  next()
})

export default router