<template>
  <div>
    <v-parallax height="300" fluid dark src="@/assets/banner_flower.jpg">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="quad-text-shadow display-1 font-weight-thin mb-4">
            Infertility App
          </h1>
          <h4 class="subheading double-text-shadow">
            오늘도 수고한 당신을 응원합니다
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
  components: {},
};
</script>
<style>
.double-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black;
}
.quad-text-shadow {
  text-shadow: 0px 0px 4px black, 0px 0px 4px black, 0px 0px 4px black,
    0px 0px 4px black;
}
</style>
