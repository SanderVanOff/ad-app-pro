export default {
    state: {
      notification: []
    },
  
    mutations: {
      setNotification(state, notification) {
        state.notification.push(notification);
      },
    },
  
    actions: {},
  
    getters: {
      notification: (s) => s.notification
    }
  };
  