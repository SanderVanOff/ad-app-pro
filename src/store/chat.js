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
    async fetchChatByData(_, { adID, currentUserID }) {
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("adID", adID);

      let currentChat = null;
      console.log('adID', adID)

      data.length
        ? (currentChat = await data.find(
            (item) => item.customer.id === currentUserID
          ))
        : (currentChat = null);
      return currentChat;
    },

    //создание нового чата
    async createNewChat(_, newChat) {
      const { data } = await supabase
        .from("chat")
        .insert([{ ...newChat }]);
      console.log('data', data[0])
        return data[0]
    },
  },

  getters: {
    currentChat: (s) => s.currentChat,
  },
};
