<template>
<div class="header">
  <div class="logo">
    <img src="./assets/imgs/fdulogo.png" alt="">
  </div>
  <div class="title">
    <h1>复旦大学数字媒体实验室</h1>
  </div>
</div>
<mainMenuVue></mainMenuVue>
<router-view />
<footer class="footer">
  <p>复旦大学数字媒体实验室</p> 
</footer>
</template>

<script setup>
import mainMenuVue from './components/main-menu/index.vue'
</script>



<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header{
  background-image: url('./assets/imgs/head_bg.jpeg');
  width: 100%;
  padding-left: 100px;
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
}
.logo img{
  height: 122px;
}
.title h1{
  height: 122px;
  line-height: 122px;
  margin: 0px;
  color: aliceblue;
}

.footer{
  width: 100%;
  background-color: #18267d;
  color: #fff;
  text-align: center;
  height: 60px;
}
.footer p{
  height: 60px;
  line-height: 60px;
}
</style>
