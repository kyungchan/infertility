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
            검색: {{ $route.query.query }}
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <ul class="pa-0 ma-0">
        <div v-if="!posts.length" class="py-10 text-center">
          검색된 글이 없습니다.
        </div>

        <li v-for="post in posts" :key="post._id">
          <router-link
            :to="`./${post.boardCode}/${post._id}`"
            class="text-decoration-none"
          >
            <v-slide-y-reverse-transition appear hide-on-leave duration="1000">
              <board-item
                :id="post._id"
                :title="post.title"
                :preview="post.preview"
                :date="$moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss')"
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
    query: "",
  }),
  mounted() {
    this.query = this.$route.query.query;
    setTimeout(() => {
      this.$scrollTo.scrollTo(".topScroll", 800, {
        offset: -80,
        easing: [0.65, 0, 0.35, 1],
      });
    }, 50);
  },
  beforeRouteUpdate(to, from, next) {
    this.query = this.$route.query.query;
    axios
      .get(
        `${apiPrefix}/posts/search?query=${to.query.query}&page=${
          to.query.page || 1
        }`
      )
      .then((result) => {
        this.$scrollTo.scrollTo(".topScroll", 800, {
          offset: -80,
          easing: [0.65, 0, 0.35, 1],
        });
        this.posts = result.data.posts;
        this.posts.forEach((e) => {
          e.preview = sanitizeHtml(e.content, { allowedTags: [] });
        });
        this.total = result.data.count;
        this.page = to.query.page * 1 || 1;
        next();
      })
      .catch(() => {
        this.$router.replace("/error");
      });
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    axios
      .get(
        `${apiPrefix}/posts/search?query=${to.query.query}&page=${
          to.query.page || 1
        }`
      )
      .then((result) => {
        console.log(result);
        next((vm) => {
          vm.query = vm.$route.query.query;
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
      console.log(this.qury);
      this.$router.push(`${this.$route.path}?query=${this.query}&page=${page}`);
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
.quad-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black, 0px 0px 4px black,
    0px 0px 4px black;
  word-break: keep-all;
}

ul {
  list-style: none;
}
</style>
