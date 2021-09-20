import supabase from "@/plugins/supabase";


export default {
  state: {
    currentChat: null,
    activeMessages: [],
    usersChats: [],
    messages: [],
  },

  mutations: {
    addChatToState(state, chat) {
      state.currentChat = chat;
    },
    pushActiveMessagesToState(state, message) {
      state.activeMessages = message;
    },
    pushChatsToState(state, chats) {
      state.usersChats = chats;
    },
  },

  actions: {
    //получение чатов пользователя
    async getUserChats({ commit }, id) {
      const { data } = await supabase
        .from("chat")
        .select()
        .match({ "customer.id": id, "seller.id": id });
      commit("pushChatsToState", data);
      return data;
    },

    //получение отдельного чата по ИД объявления
    async fetchChatByData({ commit }, { adID, currentUserID }) {
      const { data } = await supabase
        .from("chat")
        .select()
        .match({
          adID: adID,
          "customer.id": currentUserID,
          "seller.id": currentUserID,
        });

      let currentChat = null;

      data.length
        ? (currentChat = await data.find(
            (item) =>
              item.customer.id === currentUserID ||
              item.seller.id === currentUserID
          ))
        : (currentChat = null);
      commit("addChatToState", currentChat);

      return currentChat;
    },

    //создание нового чата
    async createNewChat({ commit }, newChat) {
      const { data } = await supabase.from("chat").insert([{ ...newChat }]);
      commit("addChatToState", data[0]);
      return data[0];
    },

    //добавление нового сообщения
    async addNewMessage({ commit }, { chatID, newMessage }) {
      const { data } = await supabase
        .from("chat")
        .select()
        .eq("id", chatID);

      const messages = data[0].messages;

      //менять статус предыдущим сообщениям, если отправляет сообщение собеседник
      for (let item of messages) {
        if (messages[messages.length - 1].ownerID !== newMessage.ownerID) {
          item.status = "read";
        }
      }

      messages.push(newMessage);

      const { data: currentChat } = await supabase
        .from("chat")
        .update({ messages })
        .eq("id", chatID);

      commit("addChatToState", currentChat[0]);
    },

    //изменение статуса сообщения
    async readMessage({ getters, commit }) {
      const currentChat = getters["currentChat"];
      const currentUser = getters["currentUser"];

      if (
        currentChat.messages.length &&
        currentChat.messages[currentChat.messages.length - 1].ownerID !==
          currentUser.id
      ) {
        const messages = currentChat.messages;
        for (let item of messages) {
          item.status = "read";
        }
        const { data } = await supabase
          .from("chat")
          .update({ messages })
          .eq("id", currentChat.id);
        commit("addChatToState", data[0]);
      }
    },

    async getNotReadMessages({commit}) {
      const { data } = await supabase.from("chat").select("messages");

      let notReadMessages=[];

      data.forEach(item => {
        notReadMessages = (notReadMessages.concat(item.messages)).filter(m => m.status === 'sent')
      })
      commit("pushActiveMessagesToState", notReadMessages)
    },
  },

  getters: {
    currentChat: (s) => s.currentChat,
    ActiveMessage: (s) => s.activeMessages,
    usersChats: (s) => s.usersChats,
  },
};
