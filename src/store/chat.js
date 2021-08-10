// import { storage } from "@/plugins/axios";
import supabase from "@/plugins/supabase";
//константы
// const config = {
//   headers: { "content-type": "multipart/form-data" },
// };

export default {
  state: {
    currentChat: null,
  },

  mutations: {},

  actions: {
    async fetchChatByData(_, adID) {
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("adID", adID);

        const chat = Object.keys(data).map(key => {
            return data[key]
        })
        console.log('chat', chat)
        const currentChat = data.length ? data[0] : {};
        console.log('currentChat', currentChat)
        return currentChat
      ;
    },

    //создание нового чата
    async createNewChat(_, newChat) {
      const { data, error } = await supabase
        .from("chat")
        .insert([{ ...newChat }]);

      console.log("data", data);
      console.log("error", error);
    },
  },

  getters: {
    currentChat: (s) => s.currentChat,
  },
};
