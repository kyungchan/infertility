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
