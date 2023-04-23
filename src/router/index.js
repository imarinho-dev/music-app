import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const ManageView = () => import("@/views/ManageView.vue");
const SongView = () => import("@/views/SongView.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView,
  },
  {
    name: "about",
    path: "/about",
    component: AboutView,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: ManageView,
    // beforeEnter: (to, from, next) => {
    //   const store = useUserStore();

    //   if (store.userLoggedIn) {
    //     next();
    //   } else {
    //     next({ name: "home" });
    //   }
    // },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: SongView,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "text-yellow-400 dark:text-yellow-400",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
