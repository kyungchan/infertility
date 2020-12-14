<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">Infertility</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y v-if="userRule == 'admin'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" elevation="0" v-bind="attrs" v-on="on">
            Admin
          </v-btn>
        </template>
        <v-list>
          <v-list-item dense>
            <v-list-item-title
              ><v-icon left>mdi-account-circle</v-icon>Admin
              Page</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="onSignOut" dense>
            <v-list-item-title
              ><v-icon left>mdi-logout</v-icon>Sign Out</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item link to="/" active-class="teal--text">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group no-action prepend-icon="mdi-information-outline">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>난임 정보 마당</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link to="/boards/0/5fd642887d8cd6c30ed4cf83">
            <v-list-item-content>
              <v-list-item-title>난임 현황</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/boards/0/5fd642887d8cd6c30ed4cf84">
            <v-list-item-content>
              <v-list-item-title>난임 경험</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/boards/0/5fd642887d8cd6c30ed4cf85">
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
            <v-list-item link to="/boards/1">
              <v-list-item-title> 난임과 신체 건강 </v-list-item-title>
            </v-list-item>
            <v-list-item link to="/boards/2">
              <v-list-item-title>신체 건강 중재</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>정서 건강</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link to="/boards/3">
              <v-list-item-title> 난임과 정서적 건강 </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/boards/4">
              <v-list-item-title> 정서 건강 중재 </v-list-item-title>
            </v-list-item>

            <v-list-item link to="/survey">
              <v-list-item-title> 나의 심리 상태 검사 </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item link to="/boards/5">
            <v-list-item-title>성 건강</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/boards/6">
            <v-list-item-title>생활습관</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <transition :key="$route.fullPath" name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer padless>
      <v-card flat width="100%" tile class="grey darken-3 mt-4">
        <v-divider></v-divider>
        <v-card-text class="max-width mx-auto py-5 grey--text text--lighten-3">
          <v-row>
            <v-col cols="12" md="1"
              ><img src="@/assets/mju_logo.png" style="width: 64px"
            /></v-col>
            <v-col
              cols="12"
              md="11"
              style="line-height: 1.8; font-size: 0.72rem"
            >
              <span
                >(17058) 경기도 용인시 처인구 명지로 116 ( TEL : 1577-0020)<br
              /></span>
              <span>TEL : 000-000-0000 FAX : 000-000-0000 <br /></span>
              <span
                ><br />COPYRIGHTⓒ(C) MYONGJI UNIV. ALL RIGHTS RESERVED.</span
              ></v-col
            >
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
  methods: {
    onSignOut() {
      this.$store.commit("signOut");
    },
  },
  computed: {
    userRule() {
      return this.$store.state.rule;
    },
  },
};
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
* {
  font-family: "Noto Sans KR", sans-serif !important;
}

div.container {
  max-width: 1164px;
}
.v-main {
  background-color: rgba(0, 0, 0, 0.03);
}

.max-width {
  max-width: 1164px;
}
</style>
