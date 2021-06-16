import Vue from "vue";
import VueRouter from "vue-router";
import Ligues from "../views/Ligues.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Ligues",
    component: Ligues,
  },
  {
    path: "/teams",
    name: "Teams",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Teams.vue"),
  },
  {
    path: "/teams/:id",
    component: () => import("../views/Teams.vue"),
  },
  {
    path: "/ligue_calendar",
    name: "LigueCalendar",
    component: () => import("../views/LigueCalendar.vue"),
  },
  {
    path: "/team_calendar",
    name: "TeamCalendar",
    component: () => import("../views/TeamCalendar.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
