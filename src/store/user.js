import { storage } from "@/plugins/axios";
import supabase from "@/plugins/supabase";
import {getErrorMessage} from "@/utils/errorsMessages";
import { getSuccessMessage } from "@/utils/successMessages";

const config = {
  headers: { "content-type": "multipart/form-data" },
};

export default {
  state: {
    token: localStorage.getItem("jwt-token") || "",
    user: "",
    uid: localStorage.getItem("uid") || "",
  },

  mutations: {
    setToken(state, { token, uid }) {
      localStorage.setItem("jwt-token", token);
      localStorage.setItem("uid", uid);
      state.token = token;
      state.uid = uid;
    },
    setUserToState(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    clearToken(state) {
      state.token = null;
      state.uid = null;
      localStorage.removeItem("jwt-token");
      localStorage.removeItem("uid");
    },
  },

  actions: {
    // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
    async signUpUser({ commit, dispatch }, { email, login, password, avatar }) {
      commit("setLoading", true);

      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage('EMAIL_HAS_BEEN_REGISTER'),
          message: error.message,
        });
        throw Error;
      } else {
        await dispatch("addUserInfoToDB", {
          id: user.id,
          email,
          login,
          avatar,
        });
      }
      commit("setLoading", false);
    },

    //ДОБАВЛЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ В БАЗУ
    async addUserInfoToDB({ commit }, { id, email, login, avatar }) {
      const { error } = await supabase
        .from("users")
        .insert([{ id, email, login, avatar }]);
      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage('ERROR_OCCURRED_DATA'),
          message: error.message,
        });
      }
    },

    //АУТЕНТИФИКАЦИЯ
    async loginUser({ commit, dispatch }, { email, password }) {
      commit("setLoading", true);

      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage('EMAIL_OR_PASSWORD_INVALID'),
          message: error.message,
        });
        throw Error;
      } else {
        commit("setToken", { uid: user.id, token: session.access_token });
        const currentUser = await dispatch("getUserById", user.id);
        commit("setUserToState", currentUser);
      }
      commit("setLoading", false);
    },
    //LOGOUT
    async logoutUset({ commit }) {
      await supabase.auth.signOut();
      commit("clearToken");
      commit("clearUser");
    },

    //GET CURRENT USER

    async getCurrentUser({ commit, dispatch }) {
      const user = supabase.auth.user();
      const currentUser = await dispatch("getUserById", user.id);
      commit("setUserToState", currentUser);
      return currentUser;
    },

    //GET USER BY ID

    async getUserById({ commit }, id) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id);

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage('ERROR_GET_USER_DATA'),
          message: error.message,
        });
      }
      return data[0];
    },

    //UPDATE USER DATA
    async updateUserData({ getters, commit }, payload) {
      const user = getters["currentUser"];

      const { city, phone } = payload;
      const { data, error } = await supabase
        .from("users")
        .update({ city, phone })
        .eq("id", user.id);

      //если была произведена замена аватара
      let avatarURL = null;
      if (payload.avatar) {
        const formData = new FormData();
        formData.append("file", payload.avatar);
        const { data } = await storage.post("files/", formData, config);
        avatarURL = data.file;

        await supabase
          .from("users")
          .update({ avatar: avatarURL })
          .eq("id", user.id);
      }
      if(error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage('ERROR_UPDATE_USER_DATA'),
          message: error.message,
        });
      } else {
        commit("setUserToState", data[0]);
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "success",
          title: "Успешно",
          text: getSuccessMessage('SUCCESS_UPDATE_USER'),
        })
      }
    },
  },

  getters: {
    currentUID: (s) => s.uid,
    currentToken: (s) => s.token,
    currentUser: (s) => s.user,
  },
};
