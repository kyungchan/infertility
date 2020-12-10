<template>
  <div>
    <v-parallax height="250" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            {{ board.name }}
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-fab-transition>
        <v-btn
          :to="`${board.code}/editor`"
          color="pink"
          fixed
          dark
          bottom
          right
          fab
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="7" sm="5" md="4" lg="3" class="d-flex py-0">
          <v-text-field placeholder="검색" hide-details dense></v-text-field>
          <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        </v-col>
      </v-row>
      <ul class="pa-0 ma-0">
        <div v-show="!posts.length" class="py-10 text-center">
          작성된 글이 없습니다.
        </div>

        <li v-for="post in posts" :key="post._id">
          <router-link
            :to="`${post.boardCode}/${post._id}`"
            class="text-decoration-none"
          >
            <board-item
              :title="post.title"
              :preview="post.preview"
              :date="post.createdAt"
              :view="post.view"
              color="indigo"
            ></board-item
          ></router-link>
        </li>
      </ul>
      <v-pagination
        class="elevation-0"
        v-model="page"
        @input="onPageChange"
        :length="parseInt(total / 10) + (total % 10 ? 1 : 0)"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import BoardItem from "../components/home/BoardItem";
import sanitizeHtml from "sanitize-html";
import axios from "axios";

const apiPrefix = "/api"; // production mode를 구분

export default {
  components: { BoardItem },
  props: ["board"],
  data: () => ({
    page: 1,
    total: 0,
    posts: [],
  }),
  beforeRouteUpdate(to, from, next) {
    axios
      .get(`${apiPrefix}/posts/${to.params.id}?page=${to.query.page || 1}`)
      .then((result) => {
        console.log(result.data);
        this.posts = result.data.posts;
        this.total = result.data.count;
        this.page = to.query.page * 1 || 1;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/posts/${to.params.id}?page=${to.query.page || 1}`)
      .then((result) => {
        next((vm) => {
          vm.posts = result.data.posts;
          vm.posts.forEach((e) => {
            e.preview = sanitizeHtml(e.content, { allowedTags: [] });
          });
          vm.total = result.data.count;
          vm.page = to.query.page * 1 || 1;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onPageChange(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
    },
  },
  computed: {
    headers() {
      return [
        { text: "No", value: "no" },
        { text: "Test Name", value: "name" },
      ];
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
