import Vue from "vue";
import Vuex from "vuex";

//modules
import Ads from "./ads";
import User from "./user";
import Common from "./common";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: [Ads, User, Common]
});

export default store;
