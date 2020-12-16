<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title primary-title> 회원가입 </v-card-title>
          <v-card-text>
            <v-form ref="signup">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="registerModel.id"
                    label="ID"
                    prepend-inner-icon="mdi-account"
                    :rules="[
                      (v) => !!v || 'ID를 입력하세요.',
                      (v) => v.length > 4 || '5글자 이상 입력하세요.',
                      (v) => this.idExist != true || 'ID가 이미 존재합니다.',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="registerModel.name"
                    label="이름"
                    prepend-inner-icon="mdi-account"
                    :rules="[
                      (v) => !!v || '이름를 입력하세요.',
                      (v) => v.length > 1 || '2글자 이상 입력하세요.',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="registerModel.password"
                    label="비밀번호"
                    prepend-inner-icon="mdi-lock"
                    type="password"
                    :rules="[
                      (v) => !!v || '비밀번호를 입력해주세요.',
                      (v) => v.length > 5 || '6자리 이상 입력해주세요.',
                    ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    label="비밀번호 확인"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    :rules="[
                      (v) => !!v || '비밀번호를 입력해주세요.',
                      (v) => v.length > 5 || '6자리 이상 입력해주세요.',
                      (v) =>
                        v == registerModel.password ||
                        '비밀번호가 일치하지 않습니다.',
                    ]"
                  ></v-text-field>
                </v-col> </v-row
            ></v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onRegister" tile depressed
              >회원가입</v-btn
            >
            <v-btn color="primary" tile outlined>취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분

export default {
  data: () => ({
    idExist: false,
    registerModel: { id: "", password: "", name: "" },
  }),
  methods: {
    onRegister() {
      if (this.$refs.signup.validate())
        this.$axios
          .post(`${apiPrefix}/users`, this.registerModel)
          .then(() => {
            this.$router.push({
              name: "login",
              params: { register: true },
            });
          })
          .catch((err) => {
            if (err.response.status === 409) {
              this.idExist = true;
              this.$refs.signup.validate();
              this.idExist = false;
            }
          });
    },
  },
};
</script>

<style></style>
