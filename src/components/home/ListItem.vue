<!-- 홈 화면 게시글 리스트의 한 요소 -->
<template>
  <router-link :to="link" class="text-decoration-none">
    <v-alert
      tile
      colored-border
      :color="color"
      border="left"
      elevation="0"
      class="py-0"
    >
      <div class="one-line text--secondary caption">{{ subtitle }}</div>
      <div class="one-line subtitle-2 font-weight-bold">{{ title }}</div>
      <div class="text--secondary caption">{{ date }}</div>
      <div class="one-line text--secondary caption">{{ content }}</div>
    </v-alert>
  </router-link>
</template>

<script>
export default {
  data: () => ({
    boards: [
      { code: "0", name: "난임 정보 마당" },
      { code: "1", name: "난임과 신체 건강" },
      { code: "2", name: "신체 건강 중재" },
      { code: "3", name: "난임과 정서적 건강" },
      { code: "4", name: "정서 건강 중재" },
      { code: "5", name: "성 건강" },
      { code: "6", name: "생활습관" },
    ],
  }),
  props: ["color", "title", "date", "link", "content", "subtitle"],
};
</script>

<style scoped>
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
