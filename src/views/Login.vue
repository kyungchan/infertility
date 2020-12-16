<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-alert type="success" v-if="register" dense>
          회원이 되신걸 축하드립니다.
        </v-alert>
        <v-card>
          <v-card-title>로그인</v-card-title>
          <v-card-text>
            <v-form ref="signInForm">
              <v-row>
                <v-col cols="12" class="py-0 px-5">
                  <v-text-field
                    label="ID"
                    prepend-inner-icon="mdi-account"
                    v-model="loginModel.id"
                    :rules="[
                      (v) => !!v || 'ID를 입력하세요.',
                      (v) =>
                        (!!v && !loginError) || 'ID/Password가 틀렸습니다.',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0 px-5">
                  <v-text-field
                    label="Password"
                    prepend-inner-icon="mdi-lock"
                    v-model="loginModel.password"
                    type="password"
                    :rules="[
                      (v) => !!v || 'Password를 입력하세요.',
                      (v) =>
                        (!!v && !loginError) || 'ID/Password가 틀렸습니다.',
                    ]"
                    @keydown.enter="onLogin"
                  ></v-text-field>
                </v-col> </v-row
            ></v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" tile depressed to="/register">
              회원가입
            </v-btn>
            <v-btn color="primary" @click="onLogin" tile depressed>
              로그인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default {
  props: ["register"],
  data: () => ({
    loginError: false,
    loginModel: {
      id: "",
      password: "",
    },
  }),
  methods: {
    onLogin() {
      if (!this.$refs.signInForm.validate()) return;
      this.$axios
        .post(`${apiPrefix}/auth/signin`, this.loginModel, {
          withCredentials: true,
        })
        .then((result) => {
          if (result.status == 200) {
            this.$store.commit("signIn", result.data.user);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          this.loginError = true;
          this.$refs.signInForm.validate();
          this.loginError = false;
        });
    },
  },
};
</script>

<style></style>
