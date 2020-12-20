<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">Infertility</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-fade-transition>
        <v-text-field
          outlined
          dense
          hide-details=""
          placeholder="검색"
          append-icon="mdi-magnify"
          @click:append="onSearch('top')"
          @keydown.enter="onSearch('top')"
          v-model="topSearch"
          filled
          v-show="this.$vuetify.breakpoint.smAndUp"
          style="max-width: 220px"
        ></v-text-field>
      </v-fade-transition>
      <v-btn v-if="!userRule" to="/login" color="primary" elevation="0">
        <v-icon left>mdi-login</v-icon>Login
      </v-btn>
      <v-menu offset-y v-if="userRule == 'admin'">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" elevation="0" v-bind="attrs" v-on="on">
            <v-icon left>mdi-account-circle</v-icon>Admin
          </v-btn>
        </template>
        <v-list>
          <v-list-item dense to="/admin">
            <v-list-item-title
              ><v-icon left>mdi-card-account-details</v-icon>Admin
              Page</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="onSignOut" dense>
            <v-list-item-title
              ><v-icon left>mdi-logout</v-icon>로그아웃</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y v-else-if="userRule">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" elevation="0" v-bind="attrs" v-on="on">
            <v-icon left>mdi-account-circle</v-icon>{{ userName }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item dense to="/mypage">
            <v-list-item-title>
              <v-icon left>mdi-card-account-details</v-icon>
              내 계정
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="onSignOut" dense>
            <v-list-item-title
              ><v-icon left>mdi-logout</v-icon>로그아웃</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="280">
      <v-list nav dense>
        <v-list-item>
          <v-text-field
            outlined
            dense
            rounded
            hide-details=""
            placeholder="검색"
            append-icon="mdi-magnify"
            @click:append="onSearch('appbar')"
            @keydown.enter="onSearch('appbar')"
            v-model="appBarSearch"
          ></v-text-field>
        </v-list-item>
        <v-list-item v-if="this.userRule">
          <v-row class="caption">
            <v-col cols="4" class="pa-0 text-center">
              <v-list-item link to="/history" class="pt-3 d-block">
                <v-icon size="30" color="">mdi-history</v-icon>
                <div>최근 게시글</div>
              </v-list-item>
            </v-col>
            <v-col cols="4" class="pa-0 text-center">
              <v-list-item link class="pt-3 d-block">
                <!--slot can be any component-->
                <v-icon size="30" color=""
                  >mdi-book-open-page-variant-outline
                </v-icon>
                <div>읽은 게시글</div>
              </v-list-item>
            </v-col>
            <v-col cols="4" class="pa-0 text-center">
              <v-list-item link to="/likes" class="pt-3 d-block">
                <v-badge bordered right overlap color="secondary">
                  <span slot="badge">{{ this.likes.length }}</span>
                  <!--slot can be any component-->
                  <v-icon size="30" color="">mdi-heart</v-icon>
                </v-badge>
                <div>저장한 게시글</div>
              </v-list-item>
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider class="my-2"></v-divider>
        <v-list-item link to="/" color="primary">
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

            <v-list-item link to="/test" v-if="userRule">
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
    appBarSearch: "",
    topSearch: "",
  }),
  methods: {
    onSearch(position) {
      // 상태바인지 앱바안 검색창인지
      let query = position == "top" ? this.topSearch : this.appBarSearch;
      this.appBarSearch = "";
      this.topSearch = "";
      this.$router.replace(`./search?query=${query}`);
    },
    onSignOut() {
      this.$store.commit("signOut");
      this.$router.replace("/");
    },
  },
  computed: {
    userRule() {
      return this.$store.state.rule;
    },
    userName() {
      return this.$store.state.name;
    },
    likes() {
      return this.$store.state.likes;
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
