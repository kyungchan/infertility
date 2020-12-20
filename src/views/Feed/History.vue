<template>
  <div class="topScroll">
    <v-parallax height="250" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            최근 본 게시글
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-card tile outlined>
        <v-card-text>
          <ul class="pa-0 ma-0">
            <div v-if="!posts.length" class="py-10 text-center">
              최근 본 글이 없습니다.
            </div>

            <li v-for="post in posts" :key="post._id">
              <v-slide-y-reverse-transition
                appear
                hide-on-leave
                duration="1000"
              >
                <list-item
                  link="/"
                  :subtitle="boards[post.boardCode].name"
                  :title="post.title"
                  :content="post.preview"
                  :color="boards[post.boardCode].color"
                ></list-item>
              </v-slide-y-reverse-transition>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ListItem from "@/components/home/ListItem";
import sanitizeHtml from "sanitize-html";
import axios from "axios";

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  components: { ListItem },
  data: () => ({
    posts: [],
    boards: [
      { code: "0", name: "난임 정보 마당", color: "pink" },
      { code: "1", name: "난임과 신체 건강", color: "indigo" },
      { code: "2", name: "신체 건강 중재", color: "indigo" },
      { code: "3", name: "난임과 정서적 건강", color: "amber" },
      { code: "4", name: "정서 건강 중재", color: "amber" },
      { code: "5", name: "성 건강", color: "orange" },
      { code: "6", name: "생활습관", color: "orange" },
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.$scrollTo.scrollTo(".topScroll", 800, {
        offset: -80,
        easing: [0.65, 0, 0.35, 1],
      });
    }, 50);
  },
  beforeRouteUpdate(to, from, next) {
    axios
      .get(`${apiPrefix}/users/history`)
      .then((result) => {
        this.posts = result.data.posts.reverse();
        this.posts.forEach((e) => {
          e.preview = sanitizeHtml(e.content, { allowedTags: [] });
        });
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
      .get(`${apiPrefix}/users/history`)
      .then((result) => {
        next((vm) => {
          vm.posts = result.data.posts.reverse();
          vm.posts.forEach((e) => {
            e.preview = sanitizeHtml(e.content, { allowedTags: [] });
          });
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
.quad-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black, 0px 0px 4px black,
    0px 0px 4px black;
  word-break: keep-all;
}
</style>
