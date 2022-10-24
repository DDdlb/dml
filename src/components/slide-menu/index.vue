<template>
  <div class="title">
    <span>{{title}}</span>
  </div>
  <div v-for="menu in menuList" :key="menu.id" class="slide-menu">
    {{menu.name}}
  </div>
</template>

<script setup>
defineProps({
  // 菜单列表
  menuList: {
    type: Array,
    required: true
  },
  // 菜单标题
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.title{
  width: 150px;
  color: aliceblue;
  background-color: #0f429b;
  height: 50px;
  padding-left: 50px;
}
.title span{
  line-height: 50px;
  height: 50px;
}
.slide-menu{
  width: 148px;
  height: 50px;
  padding-left: 50px;
  border: 1px solid rgb(200, 200, 200);
  line-height: 50px;
  cursor: pointer;
}
.slide-menu:hover{
  background-color: rgb(234, 234, 234);
}
</style>