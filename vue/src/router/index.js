import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/page/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { auth: false },
    },
    {
      path: "/o-firmie",
      name: "about",
      component: () => import("../views/page/AboutView.vue"),
      meta: { auth: false },
    },
    {
      path: "/firmy",
      name: "companies.index",
      component: () => import("../views/company/IndexView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/create",
      name: "companies.create",
      component: () => import("../views/company/CreateView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/:id",
      name: "companies.show",
      component: () => import("../views/company/ShowView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/:id/edit",
      name: "companies.edit",
      component: () => import("../views/company/EditView.vue"),
      meta: { auth: true },
    },
    {
      path: "/galezie",
      name: "industries.index",
      component: () => import("../views/industry/IndexView.vue"),
      meta: { auth: true },
    },
    {
      path: "/galezie/:id",
      name: "industries.show",
      component: () => import("../views/industry/ShowView.vue"),
      meta: { auth: true },
    },
    {
      path: "/galezie/create",
      name: "industries.create",
      component: () => import("../views/industry/CreateView.vue"),
      meta: { auth: true },
    },
    {
      path: "/galezie/:id/edit",
      name: "industries.edit",
      component: () => import("../views/industry/EditView.vue"),
      meta: { auth: true },
    },
    {
      path: "/kategorie",
      name: "categories.index",
      component: () => import("../views/category/IndexView.vue"),
      meta: { auth: true },
    },
    {
      path: "/kategorie/:id",
      name: "categories.show",
      component: () => import("../views/category/ShowView.vue"),
      meta: { auth: true },
    },
    {
      path: "/kategorie/create",
      name: "categories.create",
      component: () => import("../views/category/CreateView.vue"),
      meta: { auth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
      meta: { auth: false },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../views/auth/LogoutView.vue"),
      meta: { auth: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/RegisterView.vue"),
      meta: { auth: false },
    },
  ],
});

router.beforeEach((to, from) => {
  const store = useAuthStore();
  const isGuest = store.isGuest;
  if (to.meta.auth === true && isGuest && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
