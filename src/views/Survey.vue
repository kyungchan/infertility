<template>
  <v-container>
    <div v-if="step == 0" id="surveyContainer">
      <survey :survey="survey"></survey>
    </div>
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
let surveyJson = {
  locale: "ko",
  title: { ko: "우울 (CES-D)검사" },
  description: { ko: "우울 증상을 측정하기 위한 검사입니다." },
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "radiogroup",
          name: "question1",
          title: {
            ko: "평소에는 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴진다.",
          },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question2",
          title: {
            ko: "평소에는 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴진다.",
          },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question3",
          title: {
            ko:
              "어느 누가 도와준다 하더라도 나의 울적한 기분을 떨쳐버릴 수 없을 것 같았다.",
          },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question4",
          title: { ko: "무슨 일을 하든 정신을 집중하기가 힘들었다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question5",
          title: { ko: "비교적 잘 지냈다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "-1", text: { ko: "1~2일" } },
            { value: "-2", text: { ko: "3~4일" } },
            { value: "-3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question6",
          title: { ko: "상당히 우울했다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question7",
          title: { ko: "모든 일들이 힘들게 느껴졌다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question8",
          title: { ko: "앞일이 암담하게 느껴졌다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question9",
          title: { ko: "지금까지의 내 인생은 실패작이라는 생각이 들었다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question10",
          title: { ko: "적어도 보통 사람들만큼의 능력은 있었다고 생각한다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "-1", text: { ko: "1~2일" } },
            { value: "-2", text: { ko: "3~4일" } },
            { value: "-3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question11",
          title: { ko: "잠을 설쳤다(잠을 잘 이루지 못했다)." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question12",
          title: { ko: "두려움을 느꼈다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question13",
          title: { ko: "평소에 비해 말수가 적었다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question14",
          title: { ko: "세상에 홀로 있는 듯한 외로움을 느꼈다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question15",
          title: { ko: "큰 불만 없이 생활 했다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "-1", text: { ko: "1~2일" } },
            { value: "-2", text: { ko: "3~4일" } },
            { value: "-3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question16",
          title: { ko: "사람들이 나에게 차갑게 대하는 것 같았다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question17",
          title: { ko: "갑자기 울음이 나왔다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question18",
          title: { ko: "마음이 슬펐다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question19",
          title: { ko: "사람들이 나를 싫어하는 것 같았다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
        {
          type: "radiogroup",
          name: "question20",
          title: { ko: "도무지 뭘 해 나갈 엄두가 나지 않았다." },
          isRequired: true,
          choices: [
            { value: "0", text: { ko: "1일 이하" } },
            { value: "1", text: { ko: "1~2일" } },
            { value: "2", text: { ko: "3~4일" } },
            { value: "3", text: { ko: "5일 이상" } },
          ],
        },
      ],
    },
  ],
  showProgressBar: "both",
  progressBarType: "questions",
};

export default {
  components: {
    survey,
  },
  data: () => {
    surveyModel = new SurveyVue.Model(surveyJson);
    return {
      survey: surveyModel,
      step: 0,
    };
  },
  mounted() {
    surveyModel.onComplete.add((result) => this.onComplete(result.data));
  },
  methods: {
    onComplete: function (result) {
      this.step++;
      console.log(result);
      this.score = Object.values(result).reduce((acc, c) => {
        return acc + c * 1;
      }, 0);
      console.log(this.score);
    },
  },
  computed: {
    completeLength: function () {
      return Object.keys(this.result).length;
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
