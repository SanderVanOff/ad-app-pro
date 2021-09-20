export default {
  state: {
    notification: [],
  },

  mutations: {
    setNotification(state, notification) {
      state.notification.push(notification);
      setTimeout(()=> {
        state.notification.shift()
      }, 5000)
      console.log("notification", notification);
      
    },

    clearNotification(state){
      state.notification = []
    }

  },

  actions: {},

  getters: {
    notification: (s) => s.notification,
  },
};
