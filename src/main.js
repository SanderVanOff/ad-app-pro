import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

//firebase
// import { auth } from "@/plugins/firebase";
// import { databaseFB } from "@/plugins/axios";

//supabase
import supabase from "@/plugins/supabase";

//Валидация
import VueFormulate from "@braid/vue-formulate";
import { ru } from "@braid/vue-formulate-i18n";

//theme
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "./theme.scss";

//Loader
import VueLoaders from "vue-loaders";
import "vue-loaders/dist/vue-loaders.css";
import Loader from "@/components/ui/vLoader.vue";

Vue.config.productionTip = false;

//Подключение плагинов
Vue.use(VueFormulate, {
  plugins: [ru],
  locale: "ru",
});
Vue.use(VueLoaders);

//global components
Vue.component("Loader", Loader);


let app;

if (!app) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");

  supabase.auth.onAuthStateChange(async (_, data) => {
    store.commit("setToken", {
      uid: data.user.id,
      token: data.access_token,
    });
    const currentUser = await store.dispatch("getUserById", data.user.id);
    store.commit("setUserToState", currentUser);
  });

  // auth.onAuthStateChanged(async(user) => {
  //   app = new Vue({
  //     router,
  //     store,
  //     render: (h) => h(App)
  //   }).$mount("#app");

  //   if (user) {
  //     await store.commit("setToken", { uid: user.uid, token: user._lat });
  //     await databaseFB.get(`users/${user.uid}.json?auth=${user._lat}`).then((res) => {
  //       store.commit("setUserToState", { ...res.data });
  //     });
  //   } else {
  //     router.push("/login?USER_NOT_AUTH");
  //   }
  // });
}
