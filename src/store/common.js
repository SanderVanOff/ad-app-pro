export default {
  state: {
    loading: false
  },

  mutations: {
    setLoading(state, status) {
      state.loading = status;
    }
  },

  actions: {},

  getters: {
    loading: (s) => s.loading
  }
};
