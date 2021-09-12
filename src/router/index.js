import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
Vue.use(Router);

//components

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home,
      meta: {
        layout: "main",
        auth: true
      },
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
      meta: {
        layout: "empty",
        auth: false
      }
    },
    {
      name: "Signup",
      path: "/signup",
      component: () => import("../views/Signup.vue"),
      meta: {
        layout: "empty",
        auth: false
      }
    },
    {
      name: "Forget",
      path: "/forget",
      component: () => import("../views/Forget.vue"),
      meta: {
        layout: "empty",
        auth: false
      }
    },
    {
      name: "createAd",
      path: "/create_ad",
      component: () => import("../views/CreateAd.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "Own",
      path: "/own",
      component: () => import("../views/Own.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "Favorites",
      path: "/favorites",
      component: () => import("../views/Favorites.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "Profile",
      path: "/profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "MessageList",
      path: "/message_list",
      component: () => import("../views/MessageList.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "MessageItem",
      path: "/messages/:id",
      component: () => import("../views/MessageItem.vue"),
      meta: {
        layout: "main",
        auth: false
      }
    },
    {
      name: "ProductItem",
      path: "/products/:id",
      component: () => import("../views/ProductItem.vue"),
      props: true,
      meta: {
        layout: "main",
        auth: true
      }
    },
    {
      name: "EditAd",
      path: "/edit-ad/:id",
      component: () => import("../views/EditAd.vue"),
      props: true,
      meta: {
        layout: "main",
        auth: true
      }
    }
  ]
});

export default router;
