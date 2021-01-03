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
    <v-dialog v-model="testResultDialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          검사 결과 조회 <v-spacer></v-spacer>
          <v-btn icon @click="testResultDialog = false">
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="py-0" align="end">
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!testData[selectedTestIndex].answers.length"
                color="primary"
                tile
                depressed
                @click="onCsvDownload"
              >
                <v-icon left>mdi-download</v-icon>전체 CSV
              </v-btn>
            </v-col>
          </v-row>
          <v-data-table
            :headers="testResultHeaders"
            :items="testData[selectedTestIndex].answers"
          >
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-slot:[`item.pdf`]="{ item }">
              <v-btn icon tile depressed @click="onPdfDownload(item)"
                ><v-icon>mdi-download</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="passResetDialog" max-width="550px">
      <v-card>
        <v-card-title> 비밀번호 초기화 </v-card-title>
        <v-card-text>
          사용자 {{ selectedUser.id }}의 비밀번호를 123456789로 초기화합니다.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" tile depressed @click="onPassReset"
            >확인</v-btn
          >
          <v-btn color="primary" tile outlined @click="passResetDialog = false"
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
          <div><v-icon left>mdi-format-list-text</v-icon>회원 관리</div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-spacer></v-spacer>
            <v-col class="pa-0 pr-3" md="3" sm="4" cols="12">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="ID 검색"
                v-model="idSearch"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-data-table
            :headers="usersHeaders"
            :items="userData"
            :search="idSearch"
          >
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-slot:[`item.password`]="{ item }">
              <v-btn
                color="primary"
                tile
                depressed
                @click="onPassResetClick(item)"
                >초기화</v-btn
              >
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div>
            <v-icon left>mdi-format-list-text</v-icon>심리검사 결과 조회
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table disable-sort :headers="testHeaders" :items="testData">
            <template v-slot:[`item.answers`]="{ item }">
              {{ Object.keys(item.answers).length }}
            </template>
            <template v-slot:[`item.show`]="{ item }">
              <v-btn
                color="primary"
                tile
                depressed
                @click="onTestSelect(item.index)"
              >
                보기</v-btn
              >
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import axios from "axios";
import * as SurveyPDF from "survey-pdf";
import font from "../../assets/survey/pdfFont.txt";

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default {
  data: () => ({
    idSearch: "",
    panel: 0,
    passwordDialog: false, // 비밀번호 변경
    passResetDialog: false, // 비밀번호 초기화
    dialog: false,
    dialogTitle: "",
    dialogContent: "",
    testData: {},
    userData: {},
    selectedTestIndex: 0,
    selectedUser: {},
    testResultDialog: false,
    password: { password: "", confirm: "" },
  }),
  async beforeRouteEnter(to, from, next) {
    try {
      const tests = await axios.get(`${apiPrefix}/tests`);
      const users = await axios.get(`${apiPrefix}/users`);
      next((vm) => {
        // index붙여주기
        vm.testData = tests.data;
        vm.testData.forEach((e, i) => {
          e.index = i;
        });
        vm.userData = users.data;
        vm.userData.forEach((e, i) => {
          e.index = i;
        });
      });
    } catch (error) {
      next((vm) => {
        vm.$router.replace("/error");
      });
    }
  },
  computed: {
    testHeaders() {
      return [
        { text: "검사 이름", value: "title" },
        { text: "답변 수", value: "answers" },
        { text: "답변 보기", value: "show" },
      ];
    },
    testResultHeaders() {
      return [
        { text: "답변 시간", value: "createdAt" },
        { text: "점수", value: "score" },
        { text: "PDF", value: "pdf", sortable: false },
      ];
    },
    usersHeaders() {
      return [
        { text: "가입일", value: "createdAt" },
        { text: "ID", value: "id" },
        { text: "이름", value: "name" },
        { text: "권한", value: "rule" },
        { text: "비밀번호", value: "password", sortable: false },
      ];
    },
    userId() {
      return this.$store.state.userId;
    },
  },
  methods: {
    onPassResetClick(user) {
      this.passResetDialog = true;
      this.selectedUser = user;
    },
    onPassReset() {
      this.$axios
        .patch(`${apiPrefix}/users/password`, {
          userId: this.selectedUser.id,
          password: "123456789",
        })
        .then(() => {
          this.dialog = true;
          this.dialogTitle = "알림";
          this.dialogContent = "비밀번호 초기화가 완료되었습니다.";
        })
        .catch(() => {
          this.dialog = true;
          this.dialogTitle = "오류";
          this.dialogContent = "비밀번호 초기화에 실패했습니다.";
        })
        .finally(() => {
          this.passResetDialog = false;
          this.selectedUser = {};
        });
    },
    onCsvDownload() {
      this.$axios
        .get(
          `${apiPrefix}/tests/${this.testData[this.selectedTestIndex]._id}/csv`,
          {
            responseType: "blob",
          }
        )
        .then((file) => {
          const fileURL = window.URL.createObjectURL(
            new Blob(["\ufeff", file.data])
          );
          const fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            `${this.testData[this.selectedTestIndex].title}.csv`
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(() => {
          this.$router.replace("/error");
        });
    },
    onPdfDownload(answer) {
      let options = {
        fontSize: 12,
        margins: {
          left: 10,
          right: 10,
          top: 10,
          bot: 10,
        },
        format: [210, 297],
        fontName: "NanumBarunGothicSubset",
        base64Normal: font,
      };
      this.$axios
        .get(
          `${apiPrefix}/tests/${this.testData[this.selectedTestIndex]._id}/data`
        )
        .then((result) => {
          const surveyPDF = new SurveyPDF.SurveyPDF(result.data, options);
          surveyPDF.data = answer.answer;
          surveyPDF.save(
            this.$moment(answer.createdAt).format("YYMMDD-HHmmss")
          );
        })
        .catch(() => {
          this.$router.replace("/error");
        });
    },
    onTestSelect(index) {
      this.testResultDialog = true;
      this.selectedTestIndex = index;
    },
    onPassChange() {
      if (this.$refs.loginForm.validate()) {
        this.$axios
          .patch(`${apiPrefix}/users/password`, {
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
