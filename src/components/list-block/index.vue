<template>
  <div>
    <div class="list-header">
      <div class="title">{{title}}</div>
      <div class="bread">
        <router-link class="link" v-for="(path, index) in paths" :key="index" :to="path.link">{{index !== 0?'/':''}} {{path.name}}</router-link>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

defineProps({
  title: {
    type: String,
    required: true
  }
})
// 路由列表
const paths = ref([])

// 获取各级路由
const setPath = ()=>{
  let path = [{name: '首页', link: '/main'}]
  router.currentRoute.value.matched.map((item)=>{
    path.push({name: item.name, link: item.path})
  })
  paths.value = path
}

setPath()

</script>

<style scoped>
.list-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #b4b4b4;
}

.title{
  color: #0f429b;
  font-size: 17px;
  padding: 10px;
  border-bottom: 2px solid #b4b4b4;
}
.link:hover{
  color: #0f429b;
}
</style>