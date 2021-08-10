import Vue from "vue";
import Vuex from "vuex";

//modules
import Ads from "./ads";
import User from "./user";
import Chat from "./chat";
import Common from "./common";
import Errors from './errors'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: [Ads, User, Chat, Common, Errors]
});

export default store;
