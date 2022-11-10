<template>
  <nav v-if="(siteUrl === '/') || (siteUrl === '/signIn') || (siteUrl === '/signUp')" class="navbar navbar-expand-lg headerDesign">
    <div class="container col5 mb-0 ms-5 text-muted d-flex justify-content-start">
      <router-link to="/aboutus" class="d-flex justify-content-start">
        About Us
      </router-link>
    </div>
    <div class="container col-md-7 col-lg-7   text-muted justify-content-end">
      <!-- Contents Aligned Right -->
      <div class="collapse navbar-collapse d-flex justify-content-end me-3" id="navbarCollapse">
        <!-- Dummy block -->
        <div class="navbar-nav mx-lg-auto"></div>

        <!-- Right navigation - Category -->
        <div class="navbar-nav">
          <router-link to="#" class="nav-item nav-link" @click="getSiteUrl">고속도로별</router-link>
        </div>

        <!-- Right navigation - Category -->
        <div class="navbar-nav">
          <router-link to="#" class="nav-item nav-link" @click="getSiteUrl">지역별</router-link>
        </div>

        <div v-if="loginStatus" class=" d-flex justify-content-center me-4">
          <div class="dropdown dropstart ">
            
              <img src="https://img.icons8.com/material-sharp/2x/user.png" data-bs-toggle="dropdown" class="profile" aria-expanded="false">
            
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">My page</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">닉네임 수정</a></li>
                <li><a class="dropdown-item" href="#">프로필 사진 수정</a></li>
                <li><hr class="dropdown-divider"></li>
                <li class="dropdown-item" @click="logout()">로그아웃</li>
              </ul>
            
          </div>
        </div>
        <div v-else class="d-flex align-items-lg-center me-4" >
          <!-- Action in Button `Sign up` -->
          <router-link to="/signUp">
            <div class="btn btn-outline-primary w-full w-lg-auto">
              Sign up
            </div>
          </router-link>
          <!-- Action in Button `Sign up` -->
          <router-link to="/signIn">
            <div class="btn btn-primary w-full w-lg-auto ms-2">
              Sign in
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>











  <nav v-else class="navbar navbar-expand-lg " id="headerDesign">
    <div class="container col5 mb-0 ms-5 text-muted d-flex justify-content-start">
      <router-link  to="/" class="navbar-brand col-4" @click="getSiteUrl">
        <div class="image-wrapper">
          <img src="../../assets/wayhome_logo.png" class="logo" alt="WAY HOME LOGO">
        </div>
      </router-link>
    </div>
      <div class="container col-md-7 col-lg-7   text-muted justify-content-end">
        <div v-if="loginStatus" class="d-flex align-items-lg-center me-4">
          <div class="dropdown dropstart">
              
              <img src="https://img.icons8.com/material-sharp/2x/user.png" data-bs-toggle="dropdown" class="profile" aria-expanded="false">
            
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">My page</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">닉네임 수정</a></li>
                <li><a class="dropdown-item" href="#">프로필 사진 수정</a></li>
                <li><hr class="dropdown-divider"></li>
                <li class="dropdown-item" @click="logout()">로그아웃</li>
              </ul>
            
          </div>
        </div>
        <div v-else class="d-flex align-items-lg-center me-5" >
            <!-- Action in Button `Sign up` -->
            <router-link to="/signUp">
              <div class="btn btn-outline-primary w-full w-lg-auto">
                Sign up
              </div>
            </router-link>
            <!-- Action in Button `Sign up` -->
            <router-link to="/signIn">
              <div class="btn btn-primary w-full w-lg-auto ms-2">
                Sign in
              </div>
            </router-link>
        </div>
    </div>
  
  </nav>
</template>

<style scoped>
.headerDesign {
  max-width: 100%;
  margin: 0 auto;
  max-height:100%;
}

.image-wrapper{
  width:50%;
}
.logo {
  max-width: 100%;
  height: auto;
}

.dropdown{
  width:70%;
}
.profile{
  max-width: 100%;
  height: auto;
}
.btn-wrapper{
  width:91.5%;
}
.btn{
  width:100%;
}

</style>

<script lang="ts" setup>
import { ref } from 'vue';

const loginStatus = ref<Boolean>(false);

let siteUrl = ref<string>(window.location.pathname);

const getSiteUrl = () => {
  siteUrl.value = window.location.pathname;
}

const loginTrue = () => {
  if (localStorage.getItem('token') as string !== '') {
    loginStatus.value = true;
  }
  else {
    loginStatus.value = false;
  }
};

const logout = () => {
  localStorage.setItem('token', '');
  localStorage.setItem('name', '');
  window.location.reload();
};

// 이름 나타내는 태그 없이 프로필 이미지 선택 시 dropdown 방식 채택
// const name = localStorage.getItem('name');

loginTrue();

</script>