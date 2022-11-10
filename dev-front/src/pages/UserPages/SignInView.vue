<template>
  <section id="login">
    <div class="login__form">
      <div class="login__title">
        <img
          class="mb-4"
          src="../../assets/icons8-fire-60.png"
          alt=""
          width="60"
          height="60"
        />
        <h1 class="mb-3">Login</h1>
      </div>
      <!-- <label for="inputEmail" class="sr-only">이메일</label> -->
      <div class="login__info">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="이메일"
          required
          autofocus
          v-model="userEmail"
        />
        <!-- <label for="inputPassword" class="sr-only">비밀번호</label> -->
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="비밀번호"
          required
          v-model="userPassword"
        />

        <!-- <input type="checkbox" value="remember-me" id="loginCheck" />-->

        <label class="login__info-checkbox"
          ><input type="checkbox" v-model="loginStateCheck" />로그인 상태
          유지</label
        >
      </div>
      <div v-if="userCorrect" class="login__info-state">
        아이디 또는 비밀번호를 잘못 입력했습니다.
      </div>
      <div class="login__btn">
        <button class="btn btn-lg btn-block" type="submit" @click="login()">
          로그인
        </button>
      </div>
      <br />
      <div class="login__help">
        <div>
          <router-link to="/findId"> 아이디 찾기 </router-link>
        </div>
        <div>
          <router-link to="/signup"> 회원가입 </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import axios from '../../../../modules/api/axios';
import type { SigninData,tokenData, HighwayData } from '../../../../modules/api/types/';
import { ref } from 'vue';
import type { Ref } from 'vue';
import router from '../../router';
let userEmail: Ref<string> = ref('');
let userPassword: Ref<string> = ref('');
let loginStateCheck: Ref<boolean> = ref(false);
let password: any = '';
let userCorrect: boolean = false;
let nameData: any = '';
let highwayAPIData: any = '';

async function login() {
  const userInformation: SigninData = {
    email: userEmail.value,
    password: userPassword.value,
    loginState: loginStateCheck.value,
  };

  password = await axios.methods
    .$callAPI('POST', 'http://localhost:5000/signin', userInformation)
    .catch((e) => {
      console.log(e);
    });
  // [TEST] console.dir(password);

  if (password.status == 409) {
    alert('이메일을 확인해주세요!');
  } else if (password.status == 408) {
    alert('비밀번호를 확인해주세요');
  } else if (password.status === 200) {
    //console.log(password);
    
    const token :string = password.data.token;
    // token을 브라우저 쿠키에 저장하는 코드
    localStorage.setItem('token', token);
    
    const tokenrInformation: tokenData = {
      token: token,
    }
    nameData = await axios.methods
      .$callAPI('POST', 'http://localhost:5000/checktoken',tokenrInformation)
      .catch((e) => {
        console.log(e);
      });

      highwayAPIData = await axios.methods.$callAPI(
      'GET',
      'http://localhost:5000/svarInfos'
      );

    let highwayDataArray: HighwayData[] = [
      { svarCd: '-', routeNm: '-', svarNm: '공통' }
    ];

    for (let i = 0; i < highwayAPIData.data.result.length; i++) {
      if (highwayAPIData.data.result[i].svarNm.match("휴게소")) {
        highwayDataArray.push({
          svarCd: highwayAPIData.data.result[i].svarCd,
          routeNm: highwayAPIData.data.result[i].routeNm,
          svarNm: highwayAPIData.data.result[i].svarNm,
        });
      }
    }

    
    localStorage.setItem("highwayDataArray",  JSON.stringify(highwayDataArray));


    //추후 닉네임으로 수정 필요!
    const name: string = nameData.data.result.name;
    localStorage.setItem('name', name);

    window.location.href = "/";
   

  } else {
    // alert('성공적으로 로그인되었습니다');
    //
  }
  // if (password) {
  //   alert('다시 확인해주세요!');
  // } else {
  //   // 서버로부터 일치 여부를 coincide로 return
  //   if (password.data.coincide == 'true') {
  //     this.$router.push('/');
  //   } else {
  //     userCorrect = true;
  //     return;
  //   }
  // }
}


</script>

<style scoped>
:root {
  --color-main: blue;
}
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.login__form {
  width: 100%;
  max-width: 560px;
  padding: 15px;
  margin: auto;
  border: 1px solid black;
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 32px;
}
.login__form .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.login__form .form-control:focus {
  z-index: 2;
}
.login__form input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  width: 90%;
  height: 50px;
  margin: 0 auto;
  border-radius: 16px;
  margin-bottom: 8px;
}
.login__form input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  width: 90%;
  height: 50px;
  margin: 0 auto;
  border-radius: 16px;
}
.login__form h1 {
  color: blue;
  font-weight: 1000;
}
.login__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login__info-checkbox {
  font-weight: 400;
  margin-top: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
}
.login__info-state {
  color: red;
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
}
.login__help {
  font-size: 16px;
  display: flex;
  justify-content: space-around;
}
.login__help div:hover {
  border: 2px solid black;
  border-radius: 8px;
}
</style>
