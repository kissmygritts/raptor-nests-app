import Vue from 'vue'
import VueRouter from 'vue-router'
import NestsMap from '@/views/NestsMap.vue'
import NestsCreate from '@/views/NestsCreate.vue'
import NestsShow from '@/views/NestsShow.vue'
import NestsTable from '@/views/NestsTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: NestsMap
  }, {
    path: '/nests/create',
    name: 'nests-create',
    component: NestsCreate
  }, {
    path: '/nests/new',
    name: 'nests-new',
    component: () => import(/* webpackChunkName: "nests-new" */ '../views/NestsNew.vue')
  }, {
    path: '/nests/:id',
    name: 'nests-show',
    component: NestsShow
  }, {
    path: '/table',
    name: 'nests-table',
    component: NestsTable
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

export default router
