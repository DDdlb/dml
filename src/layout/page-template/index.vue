<template>
    <div class="content">
      <div class="banner" :style="{backgroundImage: `url('${content.banner}')`}"></div>
      <div class="row">
        <div class="slide">
          <slide-menu :menuList="content.list" :title="content.title" />
        </div>
        <div class="list" v-if="content.type === 'list'">
            <list-block :title="'新闻公告'">
              <ul class="news-list">
                <li v-for="news in newsList" :key="news.id">
                  <a :href="news.link">{{news.title}}</a>
                  <p>{{news.date}}</p>
                </li>
              </ul>
            </list-block>
            <pagination 
              :currentPage="currentPage" 
              :totalPage="totalPage" 
              @prePageClick="prePageClickHandler()"
              @nextPageClick="nextPageClickHandler()"
              @pageChange="pageChangeHandler"
            />
        </div>
        <div class="list" v-else-if="content.type === 'group'">
          <list-block :title="'教师'">
            <a v-for="teacher in content.groups.teachers" :key="teacher.id" :href="teacher.link">
              <div class="teacher">
                <img :src="teacher.image" alt="">
                <h3>{{teacher.name}}</h3>
                <h3>{{teacher.professor}}</h3>
              </div>
            </a>
          </list-block>
          <list-block :title="'学生'">
            <div class="block" v-for="(block, index) in content.groups.students" :key="index">
              <h3>{{block.title}}</h3>
              <div class="table">
                <p v-for="(item, index) in block.members" :key="index">{{item}}</p>
              </div>
              
            </div>
          </list-block>
        </div>
      </div>
      
      <h1>{{currentRouter}}</h1>
    </div>
</template>
  
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getTemplatePage, getNewsList } from '@/api/template.js'
import slideMenu from '@/components/slide-menu/index.vue'
import listBlock from '@/components/list-block/index.vue'
import pagination from '@/components/pagination/index.vue'
const router = useRouter()
  
let currentRouter = router.currentRoute.value.fullPath
// 页面内容
const content = ref({})
// 新闻列表
const newsList = ref([])
// 当前页
const currentPage = ref(1)
// 总页数
const totalPage = ref(1)
// 上一页点击事件
const prePageClickHandler = async()=>{
  currentPage.value = currentPage.value - 1
  const res = await getNewsList(currentPage.value)
  newsList.value = res.news.newsList
}
// 下一页点击事件
const nextPageClickHandler = async()=>{
  currentPage.value = currentPage.value + 1
  const res = await getNewsList(currentPage.value)
  newsList.value = res.news.newsList
}
// 页面切换事件
const pageChangeHandler = async(page)=>{
  // console.log('news:', page);
  currentPage.value = page
  const res = await getNewsList(currentPage.value)
  newsList.value = res.news.newsList
}

onMounted(async ()=>{
  const res = await getTemplatePage(currentRouter)
  console.log("res",res);
  content.value = res
  if('news' in res){
      newsList.value = res.news.newsList
      currentPage.value = res.news.page
      totalPage.value = res.news.total
    }
})

watch(
  ()=>router.currentRoute.value.fullPath,
  async (val)=>{
    currentRouter = val
    const res = await getTemplatePage(currentRouter)
    console.log("watch res",res);
    content.value = res
    console.log(content.value);
    if('news' in res){
      newsList.value = res.news.newsList
      currentPage.value = res.news.page
      totalPage.value = res.news.total
    }
    
  },{
    immediate: false,
    deep: true
  }
)
</script>

<style scoped>
.content{
  width: 1145px;
  margin: auto;
}
.banner{
  width: 100%;
  height: 235px;
}

.list{
  width: calc(100% - 240px);
  margin-left: 40px;
}
.news-list li{
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 5px;
}
.news-list li:hover{
  background-color: rgb(231, 231, 231);
}
.news-list a{
  height: 50px;
  line-height: 50px;
}
.news-list p{
  color: rgb(167, 167, 167);
  font-size: smaller;
}

.teacher{
  width: 200px;
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
}
.teacher img{
  width: 70%;
  display: block;
  margin: auto;
  height: 180px;
}
.teacher h3{
  text-align: center;
  color: rgb(51, 51, 51);
}

.table{
  width: 100%;
  display: flex;
}
.table p{
  flex: 1;
}
</style>