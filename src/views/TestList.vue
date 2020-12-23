<template>
  <div>
    <v-parallax height="250" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            나의 심리 상태 검사
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <ul class="pa-0">
        <li v-for="survey in surveys" :key="survey._id">
          <router-link :to="`/test/${survey._id}`" class="text-decoration-none">
            <board-item
              :title="survey.title"
              :preview="survey.description"
              :likebtn="false"
              color="indigo"
            ></board-item>
          </router-link>
        </li>
      </ul>
    </v-container>
  </div>
</template>

<script>
import BoardItem from "../components/home/BoardItem";
import axios from "axios";
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  components: { BoardItem },
  data: () => ({ surveys: {} }),
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/tests/title`)
      .then((result) => {
        next((vm) => {
          vm.surveys = result.data;
        });
      })
      .catch(() => {
        next((vm) => {
          vm.$router.replace("/error");
        });
      });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
