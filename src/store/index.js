import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    userName: "",
    rule: "",
  },
  mutations: {
    signIn(state, user) {
      state.userId = user.userId;
      state.userName = user.userName;
      state.rule = user.rule;
    },
    signOut(state) {
      state.userId = "";
      state.userName = "";
      state.rule = "";
      axios.post("/api/auth/signout");
    },
  },
  actions: {},
  modules: {},
});
