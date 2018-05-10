export default {
  namespaced: true,
  state: {
    button_loading: false,
  },
  mutations: {
    // 按钮动画配置
    loading(state, data) {
      state.button_loading = data;
    },
  },
};
