<template>
  <div>
    <header-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script setup lang="ts">
// setup : https://vuejs.org/api/sfc-script-setup.html#script-setup
import HeaderComponent from './components/frames/HeaderComponent.vue';
import FooterComponent from './components/frames/FooterComponent.vue';


</script>


<style scoped>

</style>