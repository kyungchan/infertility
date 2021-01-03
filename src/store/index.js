import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default new Vuex.Store({
  state: {
    uid: "",
    name: "",
    id: "",
    rule: "",
    likes: [],
    recentCount: 0,
    historyCount: 0,
  },
  mutations: {
    setLikes(state, likes) {
      state.likes = likes;
    },
    setRecentCount(state, count) {
      state.recentCount = count;
    },
    setHistoryCount(state, count) {
      state.historyCount = count;
    },
    signIn(state, user) {
      state.id = user.user.id;
      state.rule = user.user.rule;
      state.uid = user.user.uid;
      state.name = user.user.name;
      state.recentCount = user.count.recent;
      Vue.$cookies.set("userId", user.id, "1h"); // 토큰과 같은 시간
    },
    signOut(state) {
      state.id = "";
      state.rule = "";
      state.uid = "";
      state.name = "";
      state.likes = [];
      state.recentCount = 0;
      state.historyCount = 0;
      axios.post(`${apiPrefix}/auth/signout`);
      Vue.$cookies.remove("userId");
    },
  },
  actions: {
    getLikes(context) {
      axios
        .get(`${apiPrefix}/users/likes?page=0`)
        .then((result) => {
          context.commit("setLikes", result.data.likes);
        })
        .catch(() => {});
    },
  },
  modules: {},
});
