import { storage } from "@/plugins/axios";
import supabase from "@/plugins/supabase";
import { getErrorMessage } from "@/utils/errorsMessages";
import { getSuccessMessage } from "@/utils/successMessages";

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
      state.ads.unshift(ad);
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
      const { data: allAds, error } = await supabase.from("ads").select().order('id', { ascending: false });
      commit("setAdsToState", allAds);
      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage("ERROR_FETCH_AD_DATA"),
          message: error.message,
        });
      } else {
        return allAds;
      }
    },

    async fetchCategories({ commit }) {
      const { data, error } = await supabase.from("categories").select();

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage("ERROR_FETCH_CATEGORIES_DATA"),
          message: error.message,
        });
      } else {
        return data;
      }
    },
    //Получение объявления по ИД
    async getAdById(_, id) {
      const { data } = await supabase
        .from("ads")
        .select()
        .eq("id", id);
      return data[0];
    },

    //создание нового объявления
    async publicNewAd({ commit, dispatch }, formData) {
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

      const { data, error } = await supabase.from("ads").insert([
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
        },
      ]);

      //добавляем изображение в Сторадж
      const { images, mainImage } = await dispatch("putImagesToStorage", {
        id,
        indexMainImage,
        imagesFiles,
      });

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage("ERROR_CREATE_NEW_AD"),
          message: error.message,
        });
      } else {
        commit("setAdToState", { ...data, images, mainImage });
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "success",
          title: "Успешно",
          text: getSuccessMessage("SUCCESS_CREATE_AD"),
        })
      }
    },

    //обновление объявления
    async updateAd({ commit, dispatch }, updateData) {
      // const currentAd = await dispatch("getAdById", updateData.id);
      const {
        condition,
        title,
        description,
        cost,
        city,
        delivery,
        phone,
        mainImage: indexMainImage,
        images: oldImage,
        imagesFiles,
        communication,
      } = updateData;

      //
      const { data, error } = await supabase
        .from("ads")
        .update({
          condition,
          title,
          description,
          cost,
          city,
          delivery,
          phone,
          communication,
          changeDate: new Date(),
        })
        .eq("id", updateData.id);
      //
      const { images, mainImage } = await dispatch("putImagesToStorage", {
        id: updateData.id,
        indexMainImage,
        imagesFiles,
        images: oldImage,
      });

      if (error) {
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "danger",
          title: "Ошибка",
          text: getErrorMessage("ERROR_UPDATE_AD"),
          message: error.message,
        });
      } else {
        commit("setAdToState", { ...data, images, mainImage });
        commit("setNotification", {
          id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
          type: "success",
          title: "Успешно",
          text: getSuccessMessage("SUCCESS_UPDATE_AD"),
        })
      }
    },

    //добавление изображений в Storage
    async putImagesToStorage(
      _,
      { id, indexMainImage, imagesFiles, images = [] }
    ) {
      //Если есть изображение, то добавить в Storage, а потом URL добавить в БД

      if (imagesFiles.length) {
        const formData = new FormData();

        for (let i = 0; i < imagesFiles.length; i++) {
          formData.append("file", imagesFiles[i]);
          const { data } = await storage.post("files/", formData, config);
          images.push(data.file);
        }
      } else if (!imagesFiles.length && !images.length) {
        //Если изображение не добавлено, то нужно поставить стандартное!
        images.push("https://www.medkv.ru/images/detailed/10/no_photo.jpg");
      }

      await supabase
        .from("ads")
        .update([{ images, mainImage: images[indexMainImage] }])
        .eq("id", id);

      return { images, mainImage: images[indexMainImage] };
    },

    //Добавление/ удаление в избранном
    async addFavoriteAdToUser({ commit, getters }, id) {
      const user = getters["currentUser"];
      //Получаем нужное объявление
      const currentAd = getters["allAds"].find((item) => item.id === id);

      try {
        //Добавляем каким пользователям понравилась запись

        currentAd.likes.includes(user.id)
          ? commit("deleteLikeFromAd", { id, uid: user.id })
          : commit("addLikeToAd", { id, uid: user.id });

        await supabase
          .from("ads")
          .update([{ likes: currentAd.likes }])
          .eq("id", id);

        //Добавляем текущему пользователю понравившиеся записи
        let favorites = user.favorites;

        favorites.includes(id)
          ? (favorites = favorites.filter((item) => item !== id))
          : favorites.push(id);

        await supabase
          .from("users")
          .update([{ favorites }])
          .eq("id", user.id);

        commit("setUserToState", {
          ...user,
          favorites,
        });
      } catch (e) {
        console.log(e);
      }
    },

    //Добавление просмотров при посещении товара
    async addingViewOnVisit({ commit, getters }, id) {
      const user = getters["currentUser"];

      try {
        const currentAd = getters["allAds"].find((item) => item.id === id);

        if (!currentAd.views.includes(user.id)) {
          currentAd.views.push(user.id);
        }

        await supabase
          .from("ads")
          .update([{ views: currentAd.views }])
          .eq("id", id);

        commit("updateAdInState", { ...currentAd, views: currentAd.views });
      } catch (e) {
        console.log(e);
      }
    },

    //изменение статуса объявления
    async changeStatusAdById({ getters, commit }, {id, reasonChangeAd}) {
      const allAds = getters["allAds"];


        const currentAd = allAds.find((item) => item.id === id);
        let status = currentAd.status === "closed" ? "moderation" : "closed";
        currentAd.reasonChangeAd.push({
          date: new Date(),
          reason: reasonChangeAd
        })

        const {error} = await supabase
          .from("ads")
          .update([{ status, changeDate: new Date(), reasonChangeAd: currentAd.reasonChangeAd}])
          .eq("id", id);

          if(error) {
            commit("setNotification", {
              id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
              type: "danger",
              title: "Ошибка",
              text: getErrorMessage("ERROR_UPDATE_AD"),
              message: error.message,
            });
          }else {
            commit("changeStatusAdFromState", { id: currentAd.id, status });
            let text = status === "closed" ? "SUCCESS_CLOSE_AD" : "SUCCESS_OPEN_AD"
            commit("setNotification", {
              id: (Date.now() + Math.floor(Math.random(1000))).toString(32),
              type: "success",
              title: "Успешно",
              text: getSuccessMessage(text),
            })
          }

        
    },
  },

  getters: {
    allAds: (s) => s.ads,
  },
};
