<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title primary-title> 회원가입 </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="registerModel.id"
                  label="ID"
                  prepend-inner-icon="mdi-account"
                  :rules="[
                    (v) => !!v || 'ID를 입력하세요.',
                    (v) => v.length < 5 || '5글자 이상 입력하세요.',
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
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="registerModel.id"
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  :rules="[
                    (v) => !!v || 'Password를 입력하세요.',
                    (v) => v.length < 5 || '5글자 이상 입력하세요.',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" tile depressed>회원가입</v-btn>
            <v-btn color="primary" tile outlined>취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    registerModel: { id: "", password: "" },
  }),
};
</script>

<style></style>
