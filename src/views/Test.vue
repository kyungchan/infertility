<template>
  <v-container>
    <v-card v-if="step == 0">
      <v-card-text>
        <div id="surveyContainer">
          <survey :survey="survey"></survey>
        </div>
      </v-card-text>
    </v-card>
    <v-expand-transition>
      <v-card v-if="step == 1">
        <v-card-title> 결과 보기 </v-card-title>
        <v-card-text>
          <v-row>
            <v-col justify="center" align="center" cols="12">
              <div class="display-1 rounded-circle result-circle primary--text">
                {{ this.score + "점" }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="body-1 black--text font-weight-bold">
                경증의 우울증상
              </div>
              <div class="body-2 black--text font-weight-medium">
                검사 결과 해석 나오기검사 결과 해석 나오기검사 결과 해석
                나오기검사 결과 해석 나오기검사 결과 해석 나오기검사 결과 해석
                나오기검사 결과 해석 나오기검사 결과 해석 나오기검사 결과 해석
                나오기
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" to="/" tile depressed>홈으로</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-container>
</template>

<script>
import * as SurveyVue from "survey-vue";
import "../assets/survey/modern.css";
let survey = SurveyVue.Survey;
survey.cssType = "modern";
let surveyModel;
let surveyJson;

import axios from "axios";
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default {
  components: {
    survey,
  },
  beforeRouteEnter(to, from, next) {
    axios
      .get(`${apiPrefix}/tests/${to.params.testId}`)
      .then((result) => {
        surveyJson = result.data;
        next(() => {});
      })
      .catch(() => {
        next((vm) => {
          vm.$router.replace("/error");
        });
      });
  },
  data: () => {
    surveyModel = new SurveyVue.Model(surveyJson);
    return {
      surveyJson: null,
      survey: surveyModel,
      step: 0,
    };
  },
  mounted() {
    surveyModel.render();
    surveyModel.onComplete.add((result) => {
      this.score = Object.values(result.data).reduce((acc, c) => {
        return acc + c * 1;
      }, 0);
      axios
        .post(`${apiPrefix}/tests/${this.$route.params.testId}`, {
          uid: this.uid,
          answer: result.data,
          score: this.score,
        })
        .then(() => {
          this.step++;
        })
        .catch(() => {
          this.$router.replace("/error");
        });
    });
  },
  methods: {},
  computed: {
    completeLength: function () {
      return Object.keys(this.result).length;
    },
    uid() {
      return this.$store.state.uid;
    },
  },
};
</script>

<style scoped>
.complete {
  color: black;
  font-weight: 900 !important;
}
.result-circle {
  border: #009688 solid 3px;
  width: 150px;
  height: 150px;
  vertical-align: middle;
  display: table-cell;
}
</style>
