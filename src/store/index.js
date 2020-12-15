import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default new Vuex.Store({
  state: {
    id: "",
    rule: "",
  },
  mutations: {
    signIn(state, user) {
      state.id = user.id;
      state.rule = user.rule;
      Vue.$cookies.set("userId", user.id, "1h"); // 토큰과 같은 시간
    },
    signOut(state) {
      state.id = "";
      state.rule = "";
      axios.post(`${apiPrefix}/auth/signout`);
      Vue.$cookies.remove("userId");
    },
  },
  actions: {},
  modules: {},
});
