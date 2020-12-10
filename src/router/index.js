import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Editor from "..//views/Editor.vue";
import Board from "..//views/Board.vue";
import Article from "..//views/Article.vue";

Vue.use(VueRouter);

const boards = [
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
    props: (route) => ({ board: boards[route.params.id - 1] }),
  },
  {
    path: "/boards/:id/editor",
    name: "Editor",
    component: Editor,
    props: (route) => ({ board: boards[route.params.id - 1] }),
  },
  {
    path: "/boards/:id/:postId",
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
