export default {
    state: {
      errors: []
    },
  
    mutations: {
      setError(state, error) {
        state.errors.push(error);
      },
    },
  
    actions: {},
  
    getters: {
        errors: (s) => s.errors
    }
  };
  