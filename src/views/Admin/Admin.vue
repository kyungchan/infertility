<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text>
          {{ dialogContent }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn tile depressed color="primary" @click="dialog = false"
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="passwordDialog" persistent max-width="500px">
      <v-card>
        <v-card-title> 비밀번호 변경 </v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
            <v-row>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="password.password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  label="비밀번호"
                  :rules="[
                    (v) => !!v || '비밀번호를 입력해주세요.',
                    (v) => v.length > 5 || '6자리 이상 입력해주세요.',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="password.confirm"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  label="비밀번호 확인"
                  :rules="[
                    (v) => !!v || '비밀번호를 입력해주세요.',
                    (v) => v.length > 5 || '6자리 이상 입력해주세요.',
                    (v) =>
                      v == password.password || '비밀번호가 일치하지 않습니다.',
                  ]"
                ></v-text-field>
              </v-col> </v-row
          ></v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile depressed @click="onPassChange"
            >변경</v-btn
          >
          <v-btn color="primary" tile outlined @click="onPassCancel"
            >취소</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div><v-icon left>mdi-account</v-icon>Admin 계정 설정</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" class="py-0">
              <v-row class="px-3">
                비밀번호 변경 <v-spacer></v-spacer
                ><v-btn
                  tile
                  depressed
                  @click="passwordDialog = true"
                  color="primary"
                  >변경</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <div>
            <v-icon left>mdi-format-list-text</v-icon>심리검사 결과 조회
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default {
  data: () => ({
    panel: 0,
    passwordDialog: false,
    dialog: false,
    dialogTitle: "",
    dialogContent: "",
    password: { password: "", confirm: "" },
  }),
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  methods: {
    onPassChange() {
      if (this.$refs.loginForm.validate()) {
        this.$axios
          .patch(`${apiPrefix}/users`, {
            userId: this.userId,
            password: this.password.confirm,
          })
          .then(() => {
            this.dialog = true;
            this.dialogTitle = "알림";
            this.dialogContent = "비밀번호 변경이 완료되었습니다.";
          })
          .catch(() => {
            this.dialog = true;
            this.dialogTitle = "오류";
            this.dialogContent = "비밀번호 변경에 실패했습니다.";
          })
          .finally(() => {
            this.$refs.loginForm.reset();
            this.password = { password: "", confirm: "" };
            this.passwordDialog = false;
          });
      }
    },
    onPassCancel() {
      this.$refs.loginForm.reset();
      this.password = { password: "", confirm: "" };
      this.passwordDialog = false;
    },
  },
};
</script>

<style></style>
