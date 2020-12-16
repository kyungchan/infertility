import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import vueCookies from "vue-cookies";

Vue.prototype.$axios = Axios;
Vue.prototype.$moment = require("moment");
Vue.prototype.$scrollTo = require("vue-scrollto");
Vue.config.productionTip = false;

Vue.use(vueCookies);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    // 모든 401 status code에 로그아웃 > 토큰이 만료되거나 기타 토큰오류
    if (err.response.status === 401) {
      Vue.$cookies.remove("userId");
      store.commit("signOut");
      router.replace("/error");
      return;
    }
    return Promise.reject(err);
  }
);
