import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store/index.js";

// Routing progress bar
import NProgress from "nprogress";
import "../assets/nprogress.css";

import Home from "../views/Home.vue";
import Editor from "..//views/Editor.vue";
import Board from "..//views/Board.vue";
import Article from "..//views/Article.vue";
import Survey from "..//views/Survey.vue";

import AdminLogin from "../views/Admin/Login";
import Admin from "../views/Admin/Admin";

import ErrorPage from "..//views/Error.vue";

Vue.use(VueRouter);

const boards = [
  { code: "0", name: "난임 정보 마당" },
  { code: "1", name: "난임과 신체 건강" },
  { code: "2", name: "신체 건강 중재" },
  { code: "3", name: "난임과 정서적 건강" },
  { code: "4", name: "정서 건강 중재" },
  { code: "5", name: "성 건강" },
  { code: "6", name: "생활습관" },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/boards/:id",
    name: "Board",
    component: Board,
    props: (route) => ({ board: boards[route.params.id] }),
  },
  {
    path: "/boards/:id/editor",
    name: "Editor",
    meta: { authRequired: true },
    component: Editor,
    props: (route) => ({ board: boards[route.params.id] }),
  },
  {
    path: "/boards/:id/:postId",
    name: "Article",
    component: Article,
    props: (route) => ({ board: boards[route.params.id] }),
  },
  {
    path: "/boards/:id/:postId/editor",
    name: "ArticleEdit",
    meta: { authRequired: true },
    component: Editor,
    props: (route) => ({ board: boards[route.params.id], editMode: true }),
  },
  {
    path: "/survey",
    name: "Survey",
    component: Survey,
  },
  {
    path: "/admin",
    meta: { authRequired: true },
    component: Admin,
  },
  {
    path: "/admin/login",
    component: AdminLogin,
  },
  {
    path: "*",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
// Auth navigation gaurd
router.beforeEach((to, from, next) => {
  if (Vue.$cookies.get("userId"))
    axios
      .post(`${apiPrefix}/auth/refresh`)
      .then((res) => {
        store.commit("signIn", res.data.user);
      })
      .catch(() => {
        store.commit("signOut");
        return next();
      });
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (store.state.rule == "admin") return next();
    else {
      return next({ path: "/error" });
    }
  }
  return next();
});

// Progress bar part
NProgress.configure({ showSpinner: false });
NProgress.configure({ easing: "ease", speed: 300 });
router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
