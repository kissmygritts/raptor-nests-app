import Vue from 'vue'
import VueRouter from 'vue-router'
import { decodeToken } from '@/utils/decodeToken.js'
import { getSavedState } from '@/utils/localStorage.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "nests-map" */ '../views/NestsMap.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "nests-map" */ '../views/Login.vue')
  },
  {
    path: '/nests/new',
    name: 'nests-new',
    component: () => import(/* webpackChunkName: "nests-new" */ '../views/NestsNew.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/nests/:id',
    name: 'nests-show',
    component: () => import(/* webpackChunkName: "nests-show" */ '../views/NestsShow.vue'),
    meta: { requiresAuth: true }
  }
  // , {
  //   path: '/table',
  //   name: 'nests-table',
  //   component: () => import(/* webpackChunkName: "nests-table" */ '../views/NestsTable')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// add dev only routes
if (process.env.NODE_ENV === 'development') {
  router.addRoutes([
    {
      path: '/_forms',
      name: 'forms-sandbox',
      component: () => import(/* webpackChunkName: 'form-sandbox' */ '../views/dev/FormSandbox.vue')
    }
  ])
}

// router guards
router.beforeEach(async (to, from, next) => {
  const token = getSavedState('token')
  const { isVerified } = await decodeToken(token)
  console.log({ msg: 'router/index.js', token, isVerified })

  if (to.matched.some(record => record.meta.requiresAuth) && !isVerified) {
    console.log('IS NOT VERIFIED')
    next('/login')
  }

  next()
})

export default router
