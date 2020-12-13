import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index.js";

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
      window.$cookies.set("userId", user.userId, "2h");
    },
    signOut(state) {
      state.userId = "";
      state.userName = "";
      state.rule = "";
      axios.post("/api/auth/signout");
      window.$cookies.remove("userId");
      router.push("/");
    },
  },
  actions: {},
  modules: {},
});
