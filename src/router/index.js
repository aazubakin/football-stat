import Vue from 'vue'
import VueRouter from 'vue-router'
import Ligues from '../views/Ligues.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ligues',
    component: Ligues,
  },
  {
    name: 'teams',
    path: '/teams/:id',
    component: () => import('../views/Teams.vue'),
    props: true,
  },
  {
    name: 'LigueCalendar',
    path: '/ligue_calendar/:id',
    component: () => import('../views/LigueCalendar.vue'),
    props: true,
  },
  {
    name: 'TeamCalendar',
    path: '/team_calendar/:id',
    component: () => import('../views/TeamCalendar.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
