<template>
  <v-container>
    <v-fade-transition hide-on-leave>
      <v-card v-if="step == 0">
        <v-card-title class="pb-0"> 우울 (CES-D)검사 </v-card-title>
        <v-card-title class="pt-0">
          <div class="subtitle-2">우울 증상을 측정하기 위한 검사입니다.</div>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[1] ? 'complete' : ''">
                1. 평소에는 아무렇지도 않던 일들이 괴롭고 귀찮게 느껴진다.
              </div>
              <v-radio-group row v-model="result[1]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[2] ? 'complete' : ''">
                2. 먹고 싶지 않고 식욕이 없었다.
              </div>

              <v-radio-group row v-model="result[2]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[3] ? 'complete' : ''">
                3. 어느 누가 도와준다 하더라도 나의 울적한 기분을 떨쳐버릴 수
                없을 것 같았다.
              </div>
              <v-radio-group row v-model="result[3]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[4] ? 'complete' : ''">
                4. 무슨 일을 하든 정신을 집중하기가 힘들었다.
              </div>
              <v-radio-group row v-model="result[4]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[5] ? 'complete' : ''">
                5. 비교적 잘 지냈다.
              </div>
              <v-radio-group row v-model="result[5]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="-1"></v-radio>
                <v-radio label="3~4일" value="-2"></v-radio>
                <v-radio label="5일 이상" value="-3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[6] ? 'complete' : ''">
                6. 상당히 우울했다.
              </div>
              <v-radio-group row v-model="result[6]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[7] ? 'complete' : ''">
                7. 모든 일들이 힘들게 느껴졌다.
              </div>
              <v-radio-group row v-model="result[7]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[8] ? 'complete' : ''">
                8. 앞일이 암담하게 느껴졌다.
              </div>
              <v-radio-group row v-model="result[8]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[9] ? 'complete' : ''">
                9. 지금까지의 내 인생은 실패작이라는 생각이 들었다.
              </div>
              <v-radio-group row v-model="result[9]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[10] ? 'complete' : ''">
                10. 적어도 보통 사람들만큼의 능력은 있었다고 생각한다.
              </div>
              <v-radio-group row v-model="result[10]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="-1"></v-radio>
                <v-radio label="3~4일" value="-2"></v-radio>
                <v-radio label="5일 이상" value="-3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[11] ? 'complete' : ''">
                11. 잠을 설쳤다(잠을 잘 이루지 못했다).
              </div>

              <v-radio-group row v-model="result[11]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[12] ? 'complete' : ''">
                12. 두려움을 느꼈다.
              </div>
              <v-radio-group row v-model="result[12]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[13] ? 'complete' : ''">
                13. 평소에 비해 말수가 적었다.
              </div>
              <v-radio-group row v-model="result[13]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[14] ? 'complete' : ''">
                14. 세상에 홀로 있는 듯한 외로움을 느꼈다.
              </div>

              <v-radio-group row v-model="result[14]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[15] ? 'complete' : ''">
                15. 큰 불만 없이 생활 했다.
              </div>
              <v-radio-group row v-model="result[15]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="-1"></v-radio>
                <v-radio label="3~4일" value="-2"></v-radio>
                <v-radio label="5일 이상" value="-3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[16] ? 'complete' : ''">
                16. 사람들이 나에게 차갑게 대하는 것 같았다.
              </div>
              <v-radio-group row v-model="result[16]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[17] ? 'complete' : ''">
                17. 갑자기 울음이 나왔다.
              </div>
              <v-radio-group row v-model="result[17]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[18] ? 'complete' : ''">
                18. 마음이 슬펐다.
              </div>
              <v-radio-group row v-model="result[18]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[19] ? 'complete' : ''">
                19. 사람들이 나를 싫어하는 것 같았다.
              </div>

              <v-radio-group row v-model="result[19]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12">
              <div class="body-2" :class="result[20] ? 'complete' : ''">
                20 도무지 뭘 해 나갈 엄두가 나지 않았다.
              </div>

              <v-radio-group row v-model="result[20]">
                <v-radio label="1일 이하" value="0"></v-radio>
                <v-radio label="1~2일" value="1"></v-radio>
                <v-radio label="3~4일" value="2"></v-radio>
                <v-radio label="5일 이상" value="3"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                width="100%"
                tile
                depressed
                :disabled="completeLength != 20"
                @click="onComplete"
                >{{ `${completeLength}/20 완료` }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-fade-transition>
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
export default {
  data: () => ({
    result: {},
    step: 0,
    score: 0,
  }),
  methods: {
    onComplete: function () {
      this.step++;
      console.log(this.result);
      this.score = Object.values(this.result).reduce((acc, c) => {
        return acc + c * 1;
      }, 0);
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
