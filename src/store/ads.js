import { databaseFB } from "@/plugins/axios";
import { storage } from "@/plugins/axios";
import supabase from '@/plugins/supabase'
//константы
const config = {
  headers: { "content-type": "multipart/form-data" },
};

export default {
  state: {
    ads: [],
  },

  mutations: {
    setAdsToState(state, ads) {
      state.ads = ads;
    },

    setAdToState(state, ad) {
      state.ads.push(ad);
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
    },

    changeStatusAdFromState(state, { id, status }) {
      const ad = state.ads.find((item) => item.id === id);
      ad.status = status;
    },
  },

  actions: {
    //Получение все объявлений
    async fetchAdsFromDB({ commit }) {

        const { data: allAds, error } = await supabase.from("ads").select();
        commit("setAdsToState", allAds);
        commit("setError", { type: "error fetchAds", error });
        return allAds;
    },

    async fetchCategories({commit}) {
      const { data, error } = await supabase.from("categories").select();
      commit("setError", { type: "error fetch categories", error });
      return data
    },
    //Получение объявления по ИД
    async getAdById({ getters }, id) {
      try {
        const token = getters["currentToken"];

        const { data: ad } = await databaseFB.get(
          `ads-list/${id}.json?auth=${token}`
        );
        return {
          ...ad,
          likes: "likes" in ad ? ad.likes : [],
          views: "views" in ad ? ad.views : [],
        };
      } catch (e) {
        console.log(e);
      }
    },

    //создание нового объявления
    async publicNewAd({ getters, commit, dispatch }, formData) {
      //получаем токен
      const token = getters["currentToken"];

      const {
        id,
        user,
        categoryId,
        title,
        description,
        cost,
        condition,
        city,
        phone,
        communication,
        delivery,
        mainImage: indexMainImage,
        imagesFiles,
      } = formData;
      //отправляем объявление в БД
      const { data: newAd } = await databaseFB.put(
        `ads-list/${id}.json?auth=${token}`,
        {
          id,
          uid: user.id,
          categoryId,
          title,
          description,
          cost,
          condition,
          city,
          phone,
          communication,
          status: "moderation",
          delivery,
          createDate: new Date(),
        }
      );
      //добавляем изображение в Сторадж
      const { images, mainImage } = await dispatch("putImagesToStorage", {
        token,
        id,
        indexMainImage,
        imagesFiles,
      });

      commit("setAdToState", { ...newAd, images, mainImage });
    },

    //добавление изображений в Storage
    async putImagesToStorage(_, { token, id, indexMainImage, imagesFiles }) {
      //Если есть изображение, то добавить в Storage, а потом URL добавить в БД
      let images = [];

      if (imagesFiles.length) {
        const formData = new FormData();

        for (let i = 0; i < imagesFiles.length; i++) {
          formData.append("file", imagesFiles[i]);
          const { data } = await storage.post("files/", formData, config);
          images.push(data.file);
        }
        await databaseFB.patch(`ads-list/${id}.json?auth=${token}`, {
          images,
          mainImage: images[indexMainImage],
        });
      } else {
        //Если изображение не добавлено, то нужно поставить стандартное!
        images.push("https://www.medkv.ru/images/detailed/10/no_photo.jpg");
        await databaseFB.patch(`ads-list/${id}?auth=${token}`, {
          images,
          mainImage: images[indexMainImage],
        });
      }

      return { images, mainImage: images[indexMainImage] };
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
          likes: currentAd.likes,
        });

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
            views: currentAd.views,
          }
        );
        commit("updateAdInState", { ...currentAd, ...adViews });
      } catch (e) {
        console.log(e);
      }
    },

    //изменение статуса объявления
    async changeStatusAdById({ getters, commit }, id) {
      const allAds = getters["allAds"];
      const token = getters["currentToken"];

      try {
        const currentAd = allAds.find((item) => item.id === id);
        let status = currentAd.status === "closed" ? "moderation" : "closed";

        await databaseFB.patch(`ads-list/${id}.json?auth=${token}`, {
          status,
        });
        commit("changeStatusAdFromState", { id: currentAd.id, status });
      } catch (e) {
        console.log(e);
      }
    },
  },

  getters: {
    allAds: (s) => s.ads,
  },
};
