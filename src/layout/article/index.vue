<template>
  <div class="content">
    <h2 class="title">{{article.title}}</h2>
    <p class="subinfo">发布者: {{article.publisher}}   发布时间: {{article.date}}   浏览次数: {{article.views}}</p>
    <div v-html="article.content"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { getArticle } from '@/api/article.js'
const router = useRouter()

const id = ref(0)
const article = ref({})

onMounted(async ()=>{
  id.value = router.currentRoute.value.params.id
  const res = await getArticle(id.value)
  article.value = res
})

watch(()=>router.currentRoute.value.params.id,
async (val)=>{
  id.value = val
  const res = await getArticle(id.value)
  article.value = res
}
)
</script>

<style scoped>
.content{
  width: calc(100% - 400px);
  margin: auto;
  margin-top: 20px;
}

.content .title{
  text-align: center;
  color: #182880;
}
.content .subinfo{
  text-align: center;
  font-size: 12px;
  color: #787878;
}
</style>