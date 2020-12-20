<template>
  <div class="topScroll">
    <v-parallax height="300" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            <transition name="fade" mode="out-in">
              <span :key="mainTitle">{{ mainTitle }}</span>
            </transition>
          </h1>
          <h4 class="subheading double-text-shadow">
            <div></div>
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card tile outlined>
            <v-card-title primary-title class="font-weight-medium pt-2 pb-0">
              <router-link
                to=""
                :class="`pink--text`"
                class="text-decoration-none"
              >
                난임 정보 마당</router-link
              >
            </v-card-title>
            <v-card-text class="pb-0">
              <v-divider class="my-3"></v-divider>
              <v-row>
                <v-col
                  class="py-0"
                  cols="12"
                  md="6"
                  v-for="post in infoPost"
                  :key="post.title"
                >
                  <list-item
                    :title="post.title"
                    :date="
                      $moment(post.createdAt).format('YYYY-MM-DD hh:mm:ss')
                    "
                    color="pink"
                    :link="`/boards/0/${post._id}`"
                  >
                  </list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-for="board in boards"
          :key="board.code"
          cols="12"
          sm="12"
          md="6"
          class="py-1"
        >
          <v-card tile outlined>
            <v-card-title primary-title class="font-weight-medium pt-2 pb-0">
              <router-link
                :to="`/boards/${board.code}`"
                :class="`${board.color}--text`"
                class="text-decoration-none"
              >
                {{ board.name }}</router-link
              >
              <v-spacer></v-spacer
              ><router-link
                :to="`/boards/${board.code}`"
                class="caption grey--text text-decoration-none mt-2"
              >
                더보기
              </router-link>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-divider class="my-3"></v-divider>
              <list-item
                v-if="board.post.title"
                :title="board.post.title"
                :date="
                  $moment(board.post.createdAt).format('YYYY-MM-DD hh:mm:ss')
                "
                :color="board.color"
                :link="`/boards/${board.code}/${board.post._id}`"
              ></list-item>
              <div v-else class="text-center mb-3">작성된 글이 없습니다.</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ListItem from "../components/home/ListItem";
import axios from "axios";
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  data: () => ({
    infoPost: [], // 난임 정보 마당용
    boards: [
      { code: "1", name: "난임과 신체 건강", color: "indigo", post: {} },
      { code: "2", name: "신체 건강 중재", color: "indigo", post: {} },
      { code: "3", name: "난임과 정서적 건강", color: "amber", post: {} },
      { code: "4", name: "정서 건강 중재", color: "amber", post: {} },
      { code: "5", name: "성 건강", color: "orange", post: {} },
      { code: "6", name: "생활습관", color: "orange", post: {} },
    ],
    mainTitle: "당신은 세상에서 가장 소중한 사람입니다",
    mainTitleList: [
      "당신은 세상에서 가장 소중한 사람입니다",
      "당신의 존재에 늘 감사합니다.",
      "오늘 하루도 고생 많았어요.",
      "당신의 앞날을 늘 응원합니다.",
      "오늘도 좋은 하루 보내세요.",
      "오늘 하루도 애쓰셨어요.",
    ],
  }),
  components: { ListItem },
  created() {
    this.loopText();
  },
  mounted() {
    setTimeout(() => {
      this.$scrollTo.scrollTo(".topScroll", 1, {
        offset: -100,
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/posts`)
      .then((result) => {
        next((vm) => {
          result.data.forEach((e) => {
            if (e._id == 0) vm.infoPost = e.value.value;
            else vm.boards[e._id - 1].post = e.value;
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
    loopText() {
      let i = 1;
      setInterval(() => {
        this.mainTitle = this.mainTitleList[i++];
        i = i % 6;
      }, 5000);
    },
  },
};
</script>
<style>
.double-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black;
}
.quad-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black, 0px 0px 4px black,
    0px 0px 4px black;
  word-break: keep-all;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
