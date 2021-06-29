import { databaseFB } from "@/plugins/axios";
// import { databaseAds } from "@/plugins/axios";

export default {
  state: {
    ads: []
  },

  mutations: {
    setAdsToState(state, ads) {
      state.ads = ads;
    },
    updateAdInState(state, payload) {
      let idx = state.ads.findIndex((item) => item.id === payload.id);
      state.ads[idx] = payload;
    },
    addLikeToAd(state, { id, uid }) {
      const ad = state.ads.find((item) => item.id === id);
      ad.likes.push(uid);
    },

    deleteLikeFromAd(state, { id, uid }) {
      const ad = state.ads.find((item) => item.id === id);
      const idx = ad.likes.findIndex((item) => item === uid);
      ad.likes.splice(idx, 1);
    }
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
          return {
            ...ads[key],
            likes: "likes" in ads[key] ? ads[key].likes : [],
            views: 'views' in ads[key] ? ads[key].views: []
          };
        });

        commit("setAdsToState", allAds);
        return allAds;
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
        return {...ad,
        likes: 'likes' in ad ? ad.likes : [],
        views: 'views' in ad ? ad.views : [],
        };
      } catch (e) {
        console.log(e);
      }
    },

    //Добавление/ удаление в избранном
    async addFavoriteAdToUser({ commit, getters }, id) {
      const token = getters["currentToken"];
      const user = getters["currentUser"];
      //Получаем нужное объявление
      const currentAd = getters["allAds"].find((item) => item.id === id);

      try {
        //Добавляем каким пользователям понравилась запись

        currentAd.likes.includes(user.id)
          ? commit("deleteLikeFromAd", { id, uid: user.id })
          : commit("addLikeToAd", { id, uid: user.id });

        await databaseFB.patch(`ads-list/${id}.json?auth=${token}`, {
          likes: currentAd.likes
        });

        //Добавляем текущему пользователю понравившиеся записи
        let favorites = user.favorites ? user.favorites : [];

        favorites.includes(id)
          ? (favorites = favorites.filter((item) => item !== id))
          : favorites.push(id);

        const { data: updateUser } = await databaseFB.patch(
          `users/${user.id}.json?auth=${token}`,
          {
            favorites
          }
        );

        commit("setUserToState", {
          ...user,
          ...updateUser
        });
      } catch (e) {
        console.log(e);
      }
    },

    //Добавление просмотров при посещении товара
    async addingViewOnVisit({ commit, getters }, id) {
      const token = getters["currentToken"];
      const user = getters["currentUser"];

      try {
        const currentAd = getters["allAds"].find((item) => item.id === id);

        if (!currentAd.views.includes(user.id)) {
          currentAd.views.push(user.id);
        }

        const { data: adViews } = await databaseFB.patch(
          `ads-list/${id}.json?auth=${token}`,
          {
            views: currentAd.views
          }
        );
        commit("updateAdInState", { ...currentAd, ...adViews });
      } catch (e) {
        console.log(e);
      }
    }
  },

  getters: {
    allAds: (s) => s.ads
  }
};
