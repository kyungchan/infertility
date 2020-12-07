<!-- 홈 화면 게시글 리스트의 한 요소 -->
<template>
  <v-card outlined class="my-2">
    <v-card-title primary-title class="font-weight-medium">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div class="text--secondary caption">{{ preview }}</div>
      <div class="text--secondary caption">
        {{ `${date}${view ? " | 조회 " + view : ""}` }}
      </div></v-card-text
    >
  </v-card>
</template>

<script>
export default {
  props: ["preview", "color", "title", "date", "link", "view"],
};
</script>

<style scoped>
/*
.v-card__title {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}*/
</style>
