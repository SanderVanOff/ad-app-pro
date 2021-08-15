// import { storage } from "@/plugins/axios";
import supabase from "@/plugins/supabase";
//константы
// const config = {
//   headers: { "content-type": "multipart/form-data" },
// };

export default {
  state: {
    currentChat: null,
    messages: [],
  },

  mutations: {
    addChatToState(state, chat){
      state.currentChat = chat
    },
    pushMessageToState(state, message) {
      console.log(state, message)
    }
  },

  actions: {
    async getUserChats(_, id) {
      console.log("id", id);
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("customer.id", id);

      return data;
    },

    async fetchChatByData({commit}, { adID, currentUserID }) {
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("adID", adID);

      let currentChat = null;
      console.log("adID", adID);

      data.length
        ? (currentChat = await data.find(
            (item) => item.customer.id === currentUserID
          ))
        : (currentChat = null);
      commit("addChatToState", currentChat)
      return currentChat;
    },

    //создание нового чата
    async createNewChat(_, newChat) {
      const { data } = await supabase.from("chat").insert([{ ...newChat }]);
      console.log("data", data[0]);
      return data[0];
    },

    async addNewMessage({ commit}, { chatID, newMessage }) {
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("id", chatID);

      const messages = data[0].messages;
      messages.push(newMessage)
      // console.log('messages', messages)
      // console.log('newMessage', newMessage)

      const { data: message } = await supabase
        .from("chat")
        .update({messages})
          .eq("id", chatID);

      commit("pushMessageToState", message)
    },
  },

  getters: {
    currentChat: (s) => s.currentChat,
  },
};
