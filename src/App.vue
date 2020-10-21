<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Infertility</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-group no-action prepend-icon="mdi-information-outline">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>난임 정보 마당</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>난임 현황</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>난임 경험</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>난임 지원</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action prepend-icon="mdi-medical-bag">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>난임 건강관리</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>신체 건강</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item link>
              <v-list-item-title> 난임과 신체 건강 </v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-title>신체 건강 중재</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>정서 건강</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link>
              <v-list-item-title> 난임과 정서적 건강 </v-list-item-title>
            </v-list-item>

            <v-list-item link>
              <v-list-item-title> 정서 건강 중재 </v-list-item-title>
            </v-list-item>

            <v-list-item link>
              <v-list-item-title> 나의 심리 상태 검사 </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item link>
            <v-list-item-title>성 건강</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>생활습관</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer padless>
      <v-card flat tile class="text-left" width="100%">
        <v-card-text class="pt-0">
          <v-row justify="center">
            <v-col cols="11" md="12" lg="9">
              <v-divider class="pb-5"></v-divider>
              <div>
                (17058) 경기도 용인시 처인구 명지로 116 ( TEL : 1577-0020)
              </div>
              <div>TEL : 000-000-0000 FAX : 000-000-0000</div>
              <div>COPYRIGHTⓒ(C) MYONGJI UNIV. ALL RIGHTS RESERVED.</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
  }),
};
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
* {
  font-family: "Noto Sans KR", sans-serif !important;
}
</style>
