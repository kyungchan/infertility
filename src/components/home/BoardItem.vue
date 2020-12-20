<!-- 홈 화면 게시글 리스트의 한 요소 -->
<template>
  <v-card outlined class="my-2">
    <v-card-title primary-title class="font-weight-medium">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div v-if="preview" class="text--secondary caption preview">
        {{ preview }}
      </div>
      <v-row class="px-3">
        <div v-if="view" class="text--secondary caption">
          {{ `${date}${view ? " | 조회 " + view : ""}` }}
        </div>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="onLike" :color="like ? 'red' : ''" icon>
          <v-icon>{{ like ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default {
  methods: {
    onLike() {
      this.$axios
        .post(`${apiPrefix}/users/likes`, {
          set: !this.like,
          postId: this.id,
        })
        .then(() => {
          this.like = !this.like;
          this.$store.dispatch("getLikes");
        });
    },
  },
  data: () => ({
    like: false,
  }),
  mounted() {
    this.like = this.getLike.includes(this.id);
  },
  computed: {
    getLike() {
      return this.$store.state.likes;
    },
  },
  props: ["preview", "color", "title", "date", "link", "view", "id"],
};
</script>

<style scoped>
.v-btn:before {
  background-color: initial;
}
.preview {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
