import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default new Vuex.Store({
  state: {
    userId: "",
    rule: "",
  },
  mutations: {
    signIn(state, user) {
      state.userId = user.userId;
      state.rule = user.rule;
      Vue.$cookies.set("userId", user.userId, "1h"); // 토큰과 같은 시간
    },
    signOut(state) {
      state.userId = "";
      state.rule = "";
      axios.post(`${apiPrefix}/auth/signout`);
      Vue.$cookies.remove("userId");
    },
  },
  actions: {},
  modules: {},
});
