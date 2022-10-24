<template>
  <div>
    <div class="list-header">
      <div class="title">{{title}}</div>
      <button class="more-btn">More</button>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  // 顶部标题
  title: {
    type: String,
    required: true
  },
  moreLink: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.list-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #146cc1;
}
.title{
  border: 1px solid rgb(160, 160, 160);
  border-radius: 2px;
  font-size: 17px;
  padding: 10px;
}
.more-btn{
  background-color: #fff;
  border: 0px;
  color: #146cc1;
  cursor: pointer;
}
</style>