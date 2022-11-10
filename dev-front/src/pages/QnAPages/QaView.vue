<template>
  <div class="container">
    <div class="float-start">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        style="width: 100px; margin-left: 50px"
      >
        <option selected>최신순</option>
        <option value="1">공감순</option>
        <option value="2">조회순</option>
        <option value="3">댓글순</option>
      </select>
    </div>
    <div class="float-end">
      <form class="d-flex" role="search" style="width: 300px">
        <input
          class="form-control me-2"
          type="search"
          placeholder="검색어를 입력해주세요"
          aria-label="검색어를 입력해주세요"
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          style="width: 80px"
        >
          검색
        </button>
      </form>
    </div>

    <br />
    <TableComponent />
    <div v-show="loginTrue()">
      <a href="/post">
        <button type="button" class="btn btn-outline-primary">글쓰기</button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TableComponent from '../../components/utilities/TableComponent.vue';
function loginTrue() {
  if (localStorage.getItem('token') as string !== "") {
    return true
  }
  else return false

}
</script>
<style scoped>
a {
  margin-left: 90%;
}
</style>
