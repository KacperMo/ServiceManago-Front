import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/o-firmie",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/firmy",
      name: "companies.index",
      component: () => import("../views/Company/IndexView.vue"),
    },
    {
      path: "/firmy/create",
      name: "companies.create",
      component: () => import("../views/Company/CreateView.vue"),
    },
    {
      path: "/firmy/:id",
      name: "companies.show",
      component: () => import("../views/Company/ShowView.vue"),
    },
    {
      path: "/firmy/:id/edit",
      name: "companies.edit",
      component: () => import("../views/Company/EditView.vue"),
    },
  ],
});

export default router;
