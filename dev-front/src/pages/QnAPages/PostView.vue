<template>
  <div>
    <Suspense>
      <!-- <template #default> -->
      <CategoryComponent />

      <!-- 로딩 -->
      <template #fallback>
        <div>
          카테고리 :
          <select id="selectRoute">
            <option>-</option>
          </select>
          <select id="selectRest">
            <option>공통</option>
          </select>
        </div>
      </template>
    </Suspense>

    <br/>

    <div class="container col-6">
      <textarea
      class="form-control"
        placeholder="제목"
        style="height: 25px"
        id="title"
        v-model="title"
      >
      </textarea>
      <br />
      <textarea
        class="form-control"
        placeholder="본문"
        style="height: 150px"
        v-model="content"
      ></textarea>
      <br />
      <FileComponent />
      <br />
      <button
        type="button"
        class="btn btn-secondary"
        @click="add"
        :disabled="title === ''|| selectedRestarea==='공통'"
      >
        임시저장
      </button>
      <button type="button" class="btn btn-secondary" @click="read">
        불러오기
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="submit"
        :disabled="title === '' || content === ''"
        data-bs-dismiss="modal"
      >
        완료
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';

import axios from '../../../../modules/api/axios';
import type {  BoardData } from '../../../../modules/api/types/index';
import CategoryComponent from '../../components/utilities/CategoryComponent.vue';



const title = ref('');
const content = ref('');

let selectedHighway = localStorage.getItem('selectedHighway') as string;
let selectedRestarea = localStorage.getItem('selectedRestarea') as string;
  
function add() {
  localStorage.setItem('selectedHighway', selectedHighway);
  localStorage.setItem('selectedRestarea', selectedRestarea);
  localStorage.setItem('title', title.value);
  localStorage.setItem('content', content.value);
  title.value = '';
  content.value = '';
}

function read() {
  selectedHighway = localStorage.getItem('selectedHighway') as string;
  selectedRestarea = localStorage.getItem('selectedRestarea') as string;
  title.value = localStorage.getItem('title') as string;
  content.value = localStorage.getItem('content') as string;
}



async function submit() {
  let token = localStorage.getItem('token') as string;
  let date = new Date();
  let year = String(date.getFullYear()) + '년';
  let month = String(date.getMonth()) + '월';
  let day = String(date.getDate()) + '월';
  let hour = String(date.getHours()) + '시';
  let minutes = String(date.getMinutes()) + '분';
  let seconds = String(date.getSeconds()) + '초';
  let time = year + month + day + hour + minutes + seconds;

  const board: BoardData = {
    id : '0',
    title: title.value,
    author: token,
    content: content.value,
    date: time,
    routeNm: selectedHighway,
    svarNm: selectedRestarea,
  };

  const boardSubmit =await axios.methods.$callAPI(
    'POST',
    'http://localhost:5000/createBoard',
    board
  );

  // [TEST] console.log(boardSubmit);
}
</script>

<style scoped>
button {
  margin: 2px;
}
#selectRoute {
  width: 225px;
  height: 35px;
  margin: 5px;
  padding: 5px 30px 5px 10px;
  border-radius: 10px;
  outline: 0 none;
}

#selectRest {
  width: 250px;
  height: 35px;
  margin: 5px;
  padding: 5px 30px 5px 10px;
  border-radius: 10px;
  outline: 0 none;
}
</style>
