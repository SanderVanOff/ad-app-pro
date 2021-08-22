import Vue from "vue";
import Vuex from "vuex";

//modules
import Ads from "./ads";
import User from "./user";
import Chat from "./chat";
import Common from "./common";
import Notification from './notification'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: [Ads, User, Chat, Common, Notification]
});

export default store;
