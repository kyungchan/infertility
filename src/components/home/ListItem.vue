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
      <div class="title subtitle-2 font-weight-bold">{{ title }}</div>
      <div class="text--secondary caption">{{ date }}</div>
    </v-alert>
  </router-link>
</template>

<script>
export default {
  props: ["color", "title", "date", "link"],
};
</script>

<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
