import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
      component: () => import("../views/AboutView.vue"),
      meta: { auth: false },
    },
    {
      path: "/firmy",
      name: "companies.index",
      component: () => import("../views/Company/IndexView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/create",
      name: "companies.create",
      component: () => import("../views/Company/CreateView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/:id",
      name: "companies.show",
      component: () => import("../views/Company/ShowView.vue"),
      meta: { auth: true },
    },
    {
      path: "/firmy/:id/edit",
      name: "companies.edit",
      component: () => import("../views/Company/EditView.vue"),
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
  to.meta.isLoggedIn = store.isLoggedIn;
  if (to.meta.auth === true && isGuest && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
