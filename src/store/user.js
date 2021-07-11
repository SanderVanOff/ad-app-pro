import { storage } from "@/plugins/axios";
import supabase from "@/plugins/supabase";

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
      dispatch("addUserInfoToDB", { id: user.id, email, login, avatar });
      commit("setError", { type: "error SignUp", error });
      commit("setLoading", false);
    },

    //ДОБАВЛЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ В БАЗУ
    async addUserInfoToDB(_, { id, email, login, avatar }) {
      await supabase.from("users").insert([{ id, email, login, avatar }]);
    },

    //АУТЕНТИФИКАЦИЯ
    async loginUser({ commit, dispatch }, { email, password }) {
      commit("setLoading", true);

      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      });
      error
        ? commit("setError", { type: "error SignUp", error })
        : commit("setToken", { uid: user.id, token: session.access_token });
      const currentUser = await dispatch("getUserById", user.id);
      commit("setUserToState", currentUser);
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
      commit("setUserToState", currentUser[0]);
    },

    //GET USER BY ID

    async getUserById({ commit }, id) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", id);
      commit("setError", { type: "error getUserById", error });
      return data;
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
      error
        ? commit("setError", { type: "error updateUser", error })
        : commit("setUserToState", data[0]);
    },
  },

  getters: {
    currentUID: (s) => s.uid,
    currentToken: (s) => s.token,
    currentUser: (s) => s.user,
  },
};
