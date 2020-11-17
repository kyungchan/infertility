<template>
  <div>
    <v-parallax height="300" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1
            class="quad-text-shadow text-center display-1 font-weight-thin mb-4"
          >
            <transition name="fade" mode="out-in">
              <span :key="mainTitle">{{ mainTitle }}</span>
            </transition>
          </h1>
          <h4 class="subheading double-text-shadow">
            <div></div>
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row justify="center">
        <v-col cols="11" md="12" lg="9">
          <v-row>
            <v-col cols="12" sm="12" md="6">
              <v-card tile outlined>
                <v-card-title
                  primary-title
                  class="font-weight-medium indigo--text"
                >
                  생활습관
                  <v-spacer></v-spacer
                  ><v-btn color="black" icon><v-icon>mdi-plus</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <v-alert
                    tile
                    colored-border
                    color="indigo"
                    border="left"
                    elevation="0"
                  >
                    남성 난임 치료에서 효과적인 식품보조제</v-alert
                  >
                  <v-alert
                    tile
                    colored-border
                    color="indigo"
                    border="left"
                    elevation="0"
                  >
                    남성 난임 치료에서 효과적인 식품보조제</v-alert
                  >
                </v-card-text>
              </v-card> </v-col
            ><v-col cols="12" sm="12" md="6">
              <v-card tile outlined>
                <v-card-title
                  primary-title
                  class="font-weight-medium amber--text"
                >
                  정서건강
                  <v-spacer></v-spacer
                  ><v-btn color="black" icon><v-icon>mdi-plus</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <v-alert
                    tile
                    colored-border
                    color="amber "
                    border="left"
                    elevation="0"
                  >
                    스트레스 삶의 질과 여성 난임의 연관성</v-alert
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-card tile outlined>
                <v-card-title
                  tile
                  primary-title
                  class="font-weight-medium orange--text"
                >
                  성건강<v-spacer></v-spacer
                  ><v-btn color="black" icon><v-icon>mdi-plus</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <v-alert
                    tile
                    colored-border
                    color="orange"
                    border="left"
                    elevation="0"
                  >
                    스트레스 삶의 질과 여성 난임의 연관성</v-alert
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-card tile outlined>
                <v-card-title primary-title class="font-weight- purple--text">
                  신체건강<v-spacer></v-spacer
                  ><v-btn color="black" icon><v-icon>mdi-plus</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <v-alert
                    tile
                    colored-border
                    color="purple"
                    border="left"
                    elevation="0"
                  >
                    스트레스 삶의 질과 여성 난임의 연관성</v-alert
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    mainTitle: "당신은 세상에서 가장 소중한 사람입니다",
    mainTitleList: [
      "당신은 세상에서 가장 소중한 사람입니다",
      "당신의 존재에 늘 감사합니다.",
      "오늘 하루도 고생 많았어요.",
      "당신의 앞날을 늘 응원합니다.",
      "오늘도 좋은 하루 보내세요.",
      "오늘 하루도 애쓰셨어요.",
    ],
  }),
  components: {},
  created() {
    this.loopText();
  },
  methods: {
    loopText() {
      let i = 1;
      setInterval(() => {
        this.mainTitle = this.mainTitleList[i++];
        i = i % 6;
      }, 5000);
    },
  },
};
</script>
<style>
.double-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black;
}
.quad-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black, 0px 0px 4px black,
    0px 0px 4px black;
  word-break: keep-all;
}

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
