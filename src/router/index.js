import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Editor from "..//views/Editor.vue";
import Board from "..//views/Board.vue";
import Article from "..//views/Article.vue";

Vue.use(VueRouter);

const boards = [
  { id: "health", name: "난임과 신체 건강" },
  { id: "health-mediate", name: "신체 건강 중재" },
  { id: "emotion", name: "난임과 정서적 건강" },
  { id: "emotion-mediate", name: "정서 건강 중재" },
  { id: "sexual-health", name: "성 건강" },
  { id: "lifestyle", name: "생활습관" },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor,
  },
  {
    path: "/boards/:id",
    name: "Board",
    component: Board,
    props: (route) => ({ board: boards[route.params.id - 1] }),
  },
  {
    path: "/boards/:id/:articleId",
    name: "Article",
    component: Article,
    props: (route) => ({ board: boards[route.params.id - 1] }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
