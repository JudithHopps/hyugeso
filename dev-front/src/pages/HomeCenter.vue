<template>
  <section id="home_middle">
    <div class="search">
      <form action="./search" method="get">
      <input type="text"      v-model="inputRest" class ="search_bar"  list="auto_List" name="query"       />
      <img src="https://img.icons8.com/ios-glyphs/2x/search.png" class="icon" />
      <datalist id="auto_List" v-if="inputRestList" class="auto_list">
        <option v-for="rest in 5" class="list-group-item" @click="clickevent(inputRestList[rest-1])" :value=inputRestList[rest-1]> </option>
      </datalist>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed} from "vue";
import axios from '../../../modules/api/axios';
const inputRest = ref('');
const modal = ref(false);

const result: any = await axios.methods.$callAPI(
  'GET',
  'http://localhost:5000/svarInfos'
);

let highwayDataArray: string[] = [];

//svarNm중에 휴게소명만 hiwayDataArray에 삽입
for (let i = 0; i < result.data.result.length; i++) {
  if (result.data.result[i].svarNm.match("휴게소")) {
    highwayDataArray.push(
      result.data.result[i].svarNm
    );
  }
}

const inputRestList = computed(() => {
  return highwayDataArray.filter((data) => data.includes(inputRest.value));  
});


function clickevent(rest:string) {
  inputRest.value = rest;
  modal.value = false;
}

</script>

<style scoped>
.search_bar{
  width: 500px;
  height: 50px;
  padding-left:40px;  
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.25);
  font-size: 17px;
}
.search{
  position: relative;
  display: inline-block;
}
option{
  padding-left:40px;
  position: absolute;
  left:50%;
  transform: translate(-50%);
  width: 500px;
  text-align: left;
  background-color: white;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 7px;
}

.auto_list {
  padding-left:40px;
  position: absolute;
  left:50%;
  transform: translate(-50%);
  width: 500px;
  text-align: left;
  background-color: white;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 7px;
}

.icon{
  position: absolute;
  top:20%;
  left:1%;
  width: 30px;
  padding:5px;
  opacity: 70%;

}
</style>
