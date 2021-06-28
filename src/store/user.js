import { auth } from "@/plugins/firebase";
import { databaseFB } from "@/plugins/axios";
import {storage} from '@/plugins/axios';
const config = {
  headers: { "content-type": "multipart/form-data" },
};

export default {
  state: {
    token: localStorage.getItem("jwt-token") || "",
    user: "",
    uid: localStorage.getItem("uid") || ""
    //HGvS8THVbudf2tLZF9qQ9ItWMf82
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
    }
  },

  actions: {
    // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
    async signUpUser({ commit }, { email, login, password, avatar }) {
      commit("setLoading", true);
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (data) => {
          await databaseFB.put(
            `users/${data.user.uid}.json?auth=${data.user._lat}`,
            {
              email,
              login,
              avatar,
              id: data.user.uid
            }
          );
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log("error", error);
        });
    },

    //АУТЕНТИФИКАЦИЯ
    async loginUser({ commit }, { email, password }) {
      commit("setLoading", true);

      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (data) => {
          console.log(data);
          commit("setToken", {
            uid: data.user.uid,
            token: data.user._lat
          });
          const { data: currentUser } = await databaseFB.get(
            `users/${data.user.uid}.json?auth=${data.user._lat}`
          );
          commit("setUserToState", currentUser);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
          throw error;
        });
    },
    //LOGOUT
    async logoutUset({ commit }) {
      await auth.signOut().then(() => {
        commit("clearToken");
        commit("clearUser");
      });
    },

    //GET CURRENT USER

    async getCurrentUser({getters, commit}){
      const uid = getters["currentUID"];
      const token = getters["currentToken"];
      const { data: currentUser } = await databaseFB.get(
        `users/${uid}.json?auth=${token}`
      );
      commit("setUserToState", currentUser);
    },

    //GET USER BY ID

    async getUserById({getters}, id){

      const token = getters["currentToken"];
      const { data: user } = await databaseFB.get(
        `users/${id}.json?auth=${token}`
      );
      return user
    },

    //UPDATE USER DATA
    async updateUserData({ getters, commit }, payload) {
      const uid = getters["currentUID"];
      const token = getters["currentToken"];
      const currentUser = getters['currentUser'];
      let avatarURL = null;

      try {
        const {city, phone} = payload;
        const { data: updateUser } = await databaseFB.patch(
          `users/${uid}.json?auth=${token}`,
          {
            city, phone
          }
        );
        //если была произведена замена аватара
        if (payload.avatar) {
          console.log('payload.avatar', payload.avatar)
          const formData = new FormData();
          formData.append("file", payload.avatar);
          const { data } = await storage.post("files/", formData, config);
          console.log('data.file', data.file)
          avatarURL = data.file;

          await databaseFB.patch(`users/${uid}.json?auth=${token}`, {
            avatar: avatarURL,
          });

          commit("setUserToState", {
            ...currentUser,
            ...updateUser
          });
        }
      } catch (e) {
        console.log(e)
      }
    }
  },

  getters: {
    currentUID: (s) => s.uid,
    currentToken: (s) => s.token,
    currentUser: (s) => s.user
  }
};
