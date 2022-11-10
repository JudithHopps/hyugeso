<template>
  <section id="signup">
    <div class="signup__form">
      <div class="signup__title">
        <img
          class="mb-4"
          src="../../assets/icons8-fire-60.png"
          alt=""
          width="60"
          height="60"
        />
        <h1 class="mb-3">SignUp</h1>
      </div>
      <!-- <label for="inputEmail" class="sr-only">이메일</label> -->
      <div class="signup__info">
        <input
          type="text"
          id="inputName"
          class="form-control"
          placeholder="이름"
          required
          autofocus
          v-model="userName"
        />
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="이메일"
          required
          autofocus
          v-model="userEmail"
        />
        <div>
          <button class="signup__info-btn" @click="emailAuthentication">
            전송
          </button>
        </div>
        <input
          type="text"
          placeholder="인증번호"
          style="width: 80%"
          v-model="emailCertificationNumber"
          v-if="emailSendBtn"
        />
        <div v-if="emailSendBtn">
          <button class="email-btn" @click="emailAuthentication">인증</button>
        </div>
        <input
          type="text"
          id="inputNickname"
          class="form-control"
          placeholder="닉네임"
          required
          autofocus
          v-model="userNickname"
        />
        <!-- <label for="inputPassword" class="sr-only">비밀번호</label> -->
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="비밀번호"
          required
          v-model="userPassword"
          @input="passwordVerify()"
        />
        <!-- <label for="inputPasswordCheck" class="sr-only">비밀번호 확인</label> -->
        <input
          type="password"
          id="inputPasswordCheck"
          class="form-control"
          placeholder="비밀번호 확인"
          required
          v-model="passwordVerification"
          @input="passwordVerify()"
        />
        <div
          v-if="!passwordAuthen && passwordVerification"
          class="signup__form-warning"
        >
          <span>비밀번호가 일치하지 않습니다</span>
        </div>
        <div
          v-if="passwordAuthen && passwordVerification"
          class="signup__form-concide"
        >
          <span>비밀번호가 일치합니다</span>
        </div>

        <!-- <label for="inputPhonenumber" class="sr-only">휴대폰 번호</label> -->
        <input
          type="text"
          id="inputPhonenumber"
          class="form-control"
          placeholder="휴대폰 번호"
          required
          v-model="userPhoneNumber"
          maxlength="13"
          @input="phoneNumberVerify()"
        />
        <div v-if="userAlready" class="signup__info-state">
          이미 아이디가 존재합니다.
        </div>

        <label class="signup__info-privacy"
          ><input type="checkbox" v-model="privacyAgree" />개인정보 수집 및 이용
          동의(필수)</label
        >

        <label class="signup__info-advertise"
          ><input type="checkbox" v-model="advertiseAgree" />광고 수신
          동의(선택)</label
        >
      </div>

      <div class="sign__btn">
        <button class="btn btn-lg btn-block" type="submit" @click="sign">
          회원가입
        </button>
      </div>
      <br />
    </div>
  </section>
</template>

<script lang="ts" setup>
import axi from '../../../../modules/api/axios';
import type { SignupData } from '../../../../modules/api/types';
import { ref } from 'vue';
import type { Ref } from 'vue';

let userName: Ref<string> = ref('');
let userEmail: Ref<string> = ref('');
let userNickname: Ref<string> = ref('');
let userPassword: Ref<string> = ref(''); // 비밀번호
let passwordVerification: Ref<string> = ref(''); // 비밀번호 확인
let passwordAuthen: Ref<boolean> = ref(false); // 비밀번호 일치 여부
let userPhoneNumber: Ref<string> = ref('');
let privacyAgree: Ref<boolean> = ref(false);
let advertiseAgree: Ref<boolean> = ref(false);
let emailSendBtn: Ref<boolean> = ref(false); // 이메일 전송 버튼 클릭 여부
let emailCertificationNumber: Ref<string> | Ref<number> = ref(''); // 이메일 인증번호
let emailAuthen: Ref<boolean> = ref(false); // 이메일 인증 여부
let userAlready: Ref<boolean> = ref(false); // 사용자 가입 여부

async function sign() {
  if (!emailverify()) {
    alert('이메일형식에 맞지 않습니다!');
    return;
  } else if (!emailAuthen.value) {
    alert('이메일 인증해주세요!');
  } else if (!userName.value) {
    alert('사용자 이름을 입력해주세요!');
    return;
  } else if (!userNickname.value) {
    alert('사용자 닉네임을 입력해주세요!');
    return;
  } else if (
    !userPassword.value ||
    !passwordVerification.value ||
    !passwordAuthen.value
  ) {
    alert('비밀번호가 맞지 않습니다!');
    return;
  } else if (!userPhoneNumber.value) {
    alert('휴대폰 번호를 입력해주세요!');
    return;
  } else if (!privacyAgree.value) {
    alert('개인정보 수집에 동의해주세요!');
    return;
  }
  const userInfo: SignupData = {
    email: userEmail.value,
    password: userPassword.value,
    name: userName.value,
    mobile: userPhoneNumber.value,
    nickname: userNickname.value,
    privacyPolicy: privacyAgree.value,
    advertisePolicy: advertiseAgree.value,
  };
  const pass = await axi.methods.$callAPI(
    'POST',
    'http://localhost:5000/signup',
    userInfo
  );
  if (pass.status == 409) {
    pass.data.errors.forEach((element: any) => {
      alert(element.msg);
    });
  } else {
    alert('가입해주셔서 감사합니다!');
    // this.$router.push('/');
  }
}
function emailverify() {
  let regExp = new RegExp('[a-z0-9]+@[a-z]+\.com');
  if (regExp.test(userEmail.value)) {
    return true;
  } else {
    return false;
  }
}
function passwordVerify() {
  if (userPassword.value === passwordVerification.value) {
    passwordAuthen.value = true;
  } else {
    passwordAuthen.value = false;
  }
}
function phoneNumberVerify() {
  if (userPhoneNumber.value.length == 3 || userPhoneNumber.value.length == 8) {
    userPhoneNumber.value += '-';
  }
}
async function emailAuthentication() {
  emailSendBtn.value = true;
  await axi.methods
    .$callAPI('GET', 'http://localhost:5000/emailAuthentication')
    .then((res) => {
      emailAuthen.value = res.data.email;
    });
}
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
#signup {
  width: 80%;
  max-width: 560px;
  margin: 0 auto;
}
.signup__form {
  width: 100%;
  max-width: 560px;
  padding: 15px;
  border: 1px solid black;
  height: 768px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 32px;
}
.signup__form h1 {
  color: blue;
  font-weight: 1000;
}
.signup__form input[type='email'] {
  width: 90%;
  height: 50px;
  border-radius: 16px;
}
.signup__form input[type='password'] {
  width: 90%;
  height: 50px;
  border-radius: 16px;
}
.signup__form input[type='text'] {
  width: 90%;
  height: 50px;
  border-radius: 16px;
}
.signup__form-warning {
  color: red;
}
.signup__form-concide {
  color: green;
}
.signup__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.signup__info input {
  margin: 4px;
}
.signup__info-btn {
  display: block;
  position: absolute;
  top: 45%;
  right: 21%;
  background-color: white;
  border-radius: 8px;
  display: block;
  font-size: 16px;
}
.email-btn {
  display: block;
  position: absolute;
  top: 49%;
  right: 21%;
  background-color: white;
  border-radius: 8px;
  display: block;
  font-size: 16px;
}
.btn {
  width: 50%;
  height: 60px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  font-size: 24px;
  border: 2px solid black;
  margin-top: 32px;
}
</style>
