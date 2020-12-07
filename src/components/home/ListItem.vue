<!-- 홈 화면 게시글 리스트의 한 요소 -->
<template>
  <v-alert
    tile
    colored-border
    :color="color"
    border="left"
    elevation="0"
    class="py-0"
    :to="link"
  >
    <div>{{ title }}</div>
    <div class="text--secondary caption">{{ date }}</div>
  </v-alert>
</template>

<script>
export default {
  props: ["color", "title", "date", "link"],
};
</script>
