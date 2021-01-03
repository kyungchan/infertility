<!-- 홈 화면 게시글 리스트의 한 요소 -->
<template>
  <v-alert
    v-if="deleted"
    tile
    border="left"
    elevation="0"
    class="py-0 pr-0"
    colored-border
  >
    <div class="pt-5">삭제된 게시글입니다.</div>
    <v-row class="mx-0">
      <v-spacer></v-spacer>
      <v-btn
        v-if="postId"
        @click.prevent="onLike"
        :color="like ? 'red' : ''"
        icon
      >
        <v-icon>{{ like ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
      </v-btn>
    </v-row>
  </v-alert>
  <router-link v-else :to="link" class="text-decoration-none">
    <v-alert
      tile
      colored-border
      :color="color"
      border="left"
      elevation="0"
      class="py-0 pr-0"
    >
      <div class="one-line text--secondary caption">{{ subtitle }}</div>
      <div class="one-line subtitle-2 font-weight-bold">{{ title }}</div>
      <div class="text--secondary caption">{{ date }}</div>
      <v-row class="mx-0">
        <div class="one-line text--secondary caption">{{ content }}</div>
        <v-spacer></v-spacer>
        <v-btn
          v-if="postId"
          @click.prevent="onLike"
          :color="like ? 'red' : ''"
          icon
        >
          <v-icon>{{ like ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
        </v-btn>
      </v-row>
    </v-alert>
  </router-link>
</template>

<script>
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  methods: {
    onLike() {
      this.$axios
        .post(`${apiPrefix}/users/likes`, {
          set: !this.like,
          postId: this.postId,
        })
        .then(() => {
          this.like = !this.like;
          this.$store.dispatch("getLikes");
        });
    },
  },
  computed: {
    getLike() {
      return this.$store.state.likes;
    },
  },
  mounted() {
    if (this.postId) this.like = this.getLike.includes(this.postId);
  },
  data: () => ({
    like: false,
  }),
  props: [
    "color",
    "title",
    "date",
    "link",
    "content",
    "subtitle",
    "postId",
    "deleted",
  ],
};
</script>

<style scoped>
.v-alert__content {
  width: 100%;
}
.v-btn:before {
  background-color: initial;
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
