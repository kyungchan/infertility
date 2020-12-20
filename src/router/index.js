import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store/index.js";

// Routing progress bar
import NProgress from "nprogress";
import "../assets/nprogress.css";

const Home = () => import("../views/Home.vue");
const Editor = () => import("..//views/Editor.vue");
const Board = () => import("..//views/Board.vue");
const Article = () => import("..//views/Article.vue");
const Test = () => import("..//views/Test.vue");
const TestList = () => import("..//views/TestList.vue");
const Login = () => import("../views/Login");
const Register = () => import("../views/Register");
const History = () => import("../views/Feed/History");
const Likes = () => import("../views/Feed/Like");
const Mypage = () => import("../views/Mypage");
const Admin = () => import("../views/Admin/Admin");

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
    meta: { adminRequired: true },
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
    meta: { adminRequired: true },
    component: Editor,
    props: (route) => ({ board: boards[route.params.id], editMode: true }),
  },
  {
    path: "/test",
    component: TestList,
    meta: { loginRequired: true },
  },
  {
    path: "/test/:testId",
    component: Test,
    meta: { loginRequired: true },
  },
  {
    path: "/admin",
    meta: { adminRequired: true },
    component: Admin,
  },
  {
    path: "/login",
    name: "login",
    props: true,
    component: Login,
  },
  {
    path: "/mypage",
    component: Mypage,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/history",
    component: History,
    meta: { loginRequired: true },
  },
  {
    path: "/likes",
    component: Likes,
    meta: { loginRequired: true },
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
router.beforeEach(async (to, from, next) => {
  if (Vue.$cookies.get("userId")) {
    await axios
      .post(`${apiPrefix}/auth/refresh`)
      .then((res) => {
        store.commit("signIn", res.data.user);
        if (!store.state.likes.length) store.dispatch("getLikes"); // 좋아요한 글은 최초에만 가져옴
      })
      .catch(() => {
        store.commit("signOut");
        return next();
      });
  }
  //로그인이 필요한 페이지
  if (to.matched.some((record) => record.meta.loginRequired)) {
    if (store.state.rule) return next();
    else {
      return next({ path: "/error" });
    }
  }
  //admin권한이 필요한 페이지
  if (to.matched.some((record) => record.meta.adminRequired)) {
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
