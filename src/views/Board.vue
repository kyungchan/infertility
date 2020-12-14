<template>
  <div class="topScroll">
    <v-fab-transition>
      <v-btn
        v-if="userRule == 'admin'"
        transition="scale-transition"
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
    <v-parallax height="250" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            <transition name="fade" mode="out-in">
              <span :key="board.name">{{ board.name }}</span>
            </transition>
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="7" sm="5" md="4" lg="3" class="d-flex py-0">
          <v-text-field
            placeholder="검색"
            hide-details
            dense
            v-model="search"
            @keydown.enter="onSearch"
          ></v-text-field>
          <v-btn icon @click="onSearch"><v-icon>mdi-magnify</v-icon></v-btn>
        </v-col>
      </v-row>
      <ul class="pa-0 ma-0">
        <div v-if="!posts.length" class="py-10 text-center">
          작성된 글이 없습니다.
        </div>

        <li v-for="post in posts" :key="post._id">
          <router-link
            :to="`./${post.boardCode}/${post._id}`"
            class="text-decoration-none"
          >
            <v-slide-y-reverse-transition appear hide-on-leave duration="1000">
              <board-item
                :title="post.title"
                :preview="post.preview"
                :date="$moment(post.createdAt).format('YYYY-MM-DD hh:mm:ss')"
                :view="post.view"
                color="indigo"
              ></board-item>
            </v-slide-y-reverse-transition>
          </router-link>
        </li>
      </ul>
      <v-pagination
        class="elevation-0"
        v-model="page"
        v-if="posts.length"
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

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  components: { BoardItem },
  props: ["board"],
  data: () => ({
    page: 1,
    total: 0,
    posts: [],
    search: "",
  }),
  created() {
    if (this.$route.params.id > 6 || this.$route.params.id < 1) {
      this.$router.replace("/error");
    }
  },
  mounted() {
    this.search = this.$route.query.search;
    setTimeout(() => {
      this.$scrollTo.scrollTo(".topScroll", 800, {
        offset: -80,
        easing: [0.65, 0, 0.35, 1],
      });
    }, 50);
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get(
        `${apiPrefix}/posts/${to.params.id}?page=${to.query.page || 1}${
          to.query.search ? "&search=" + to.query.search : ""
        }`
      )
      .then((result) => {
        this.posts = result.data.posts;
        this.posts.forEach((e) => {
          e.preview = sanitizeHtml(e.content, { allowedTags: [] });
        });
        this.total = result.data.count;
        this.page = to.query.page * 1 || 1;
        this.$scrollTo.scrollTo(".topScroll", 800, {
          offset: -80,
          easing: [0.65, 0, 0.35, 1],
        });
        next();
      })
      .catch(() => {
        this.$router.replace("/error");
      });
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get(
        `${apiPrefix}/posts/${to.params.id}?page=${to.query.page || 1}${
          to.query.search ? "&search=" + to.query.search : ""
        }`
      )
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
      .catch(() => {
        next((vm) => {
          vm.$router.replace("/error");
        });
      });
  },
  methods: {
    onPageChange(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
    },
    onSearch() {
      this.$router.push(`${this.$route.path}?page=1&search=${this.search}`);
    },
  },
  computed: {
    userRule() {
      return this.$store.state.rule;
    },
    headers() {
      return [
        { text: "No", value: "no" },
        { text: "Test Name", value: "name" },
      ];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
