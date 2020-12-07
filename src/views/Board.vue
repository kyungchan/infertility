<template>
  <div>
    <v-parallax height="250" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            {{ board.name }}
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="7" sm="5" md="4" lg="3" class="d-flex py-0">
          <v-text-field placeholder="검색" hide-details dense></v-text-field>
          <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
        </v-col>
      </v-row>
      <ul class="pa-0 ma-0">
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            view="200"
            color="indigo"
          ></board-item>
        </li>
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            view="200"
            color="indigo"
          ></board-item>
        </li>
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            color="indigo"
          ></board-item>
        </li>
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            color="indigo"
          ></board-item>
        </li>
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            color="indigo"
          ></board-item>
        </li>
        <li>
          <board-item
            title="남성 난임 치료에서 효과적인 식품보조제"
            preview="남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제남성 난임 치료에서 효과적인 식품보조제..."
            date="2020-11-23"
            color="indigo"
          ></board-item>
        </li>
      </ul>
      <v-pagination
        class="elevation-0"
        v-model="page"
        :length="3"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import BoardItem from "../components/home/BoardItem";
export default {
  components: { BoardItem },
  props: ["board"],
  data: () => ({
    page: 5,
    items: [{ no: 1, name: "rwer" }],
  }),
  computed: {
    headers() {
      return [
        { text: "No", value: "no" },
        { text: "Test Name", value: "name" },
      ];
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
