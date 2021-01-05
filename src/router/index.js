import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "nests-map" */ '../views/NestsMap')
  },
  // {
  //   path: '/nests/create',
  //   name: 'nests-create',
  //   component: NestsCreate
  // },
  {
    path: '/nests/new',
    name: 'nests-new',
    component: () => import(/* webpackChunkName: "nests-new" */ '../views/NestsNew.vue')
  },
  {
    path: '/nests/:id',
    name: 'nests-show',
    component: () => import(/* webpackChunkName: "nests-show" */ '../views/NestsShow.vue')
  },
  {
    path: '/table',
    name: 'nests-table',
    component: () => import(/* webpackChunkName: "nests-table" */ '../views/NestsTable')
  }
// {
  // path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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

export default router
