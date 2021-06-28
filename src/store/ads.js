import { databaseFB } from "@/plugins/axios";
// import { databaseAds } from "@/plugins/axios";

export default {
  state: {
    ads: [],
  },

  mutations: {
    setAdsToState(state, ads) {
      state.ads = ads;
    },
    updateAdInState(state, payload) {
      let idx = state.ads.findIndex(item => item.id === payload.id);
      state.ads[idx] = payload
      console.log('adsss', state.ads)
    },
  },

  actions: {
    //Получение все объявлений
    async fetchAdsFromDB({ commit, getters }) {
      const token = getters["currentToken"];
      try {
        const { data: ads } = await databaseFB.get(
          `ads-list.json?auth=${token}`
        );
        const allAds = Object.keys(ads).map((key) => {
          return ads[key];
        });
        //при отсутствии firebase
        // const { data: ads } = await databaseAds.get();
        // const allAds = Object.keys(ads).map((key) => {
        //   return ads[key];
        // });

        commit("setAdsToState", allAds);
        return allAds
      } catch (e) {
        console.log(e);
      }
    },
    //Получение объявления по ИД
    async getAdById({ getters }, id) {
      try {
        const token = getters["currentToken"];

        const { data: ad } = await databaseFB.get(
          `ads-list/${id}.json?auth=${token}`
        );
        return ad;
      } catch (e) {
        console.log(e);
      }
    },

    //Добавление/ удаление в избранном
    async addFavoriteAdToUser({ commit, getters, dispatch }, id) {
      const token = getters["currentToken"];
      const user = getters["currentUser"];
      const allAd = getters["allAds"];

      try {
        if (allAd.lenght === 0) {
          await dispatch("fetchAdsFromDB");
        }

        const currentAd = allAd.find((item) => item.id === id);
        console.log("currentAd", currentAd);

        //Добавляем каким пользователям понравилась запись
        let likes = currentAd.likes ? currentAd.likes : [];

        likes.includes(user.id)
          ? (likes = likes.filter((item) => item !== user.id))
          : likes.push(user.id);

        const { data: adLikes } = await databaseFB.patch(
          `ads-list/${id}.json?auth=${token}`,
          {
            likes,
          }
        );

        commit("updateAdInState", { ...currentAd, ...adLikes });
        console.log('allAds', allAd)
        //Добавляем текущему пользователю понравившиеся записи
        let favorites = user.favorites ? user.favorites : [];

        favorites.includes(id)
          ? (favorites = favorites.filter((item) => item !== id))
          : favorites.push(id);

        const { data: updateUser } = await databaseFB.patch(
          `users/${user.id}.json?auth=${token}`,
          {
            favorites,
          }
        );

        commit("setUserToState", {
          ...user,
          ...updateUser,
        });
      } catch (e) {
        console.log(e);
      }
    },

    //Добавление просмотров при посещении товара
    async addingViewOnVisit({ commit, getters }, id) {
      const allAds = getters["allAds"];
      const token = getters["currentToken"];
      const user = getters["currentUser"];

      try {
        const currentAd = allAds.find((item) => item.id === id);
        let views = currentAd.views ? currentAd.views : [];

        if (!views.includes(user.id)) {
          views.push(user.id);
        }

        const { data: adViews } = await databaseFB.patch(
          `ads-list/${id}.json?auth=${token}`,
          {
            views,
          }
        );
        commit("updateAdInState", { ...currentAd, ...adViews });
      } catch (e) {
        console.log(e);
      }
    },
  },

  getters: {
    allAds: (s) => s.ads,
  },
};
