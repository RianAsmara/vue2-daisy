import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/hello-world',
    name: 'Hello',
    component: () => import('../components/HelloWorld.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/')
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/hello-world')
  }

  next()
})

export default router