<template>
  <div class="page-content">
    <!-- <div class="row">
      <carousel :imgList="[]" class="carousel"/>
      <main-block title="asdasd" moreLink="#" class="news-block">
        asdasd
      </main-block>
    </div> -->
    <div class="row" v-for="item in pageContent" :key="item.id" style="justify-content: space-between;">
      <template v-for="block in item.content" :key="block._id">
        <carousel 
          v-if="block.item === 'carousel'" 
          :style="{width: block.width, height: block.height}" 
          :imgList="block.imgList"
        />
        <main-block 
          v-else-if="block.item === 'block'" 
          :title="block.title" 
          :moreLink="block.moreLink" 
          :style="{width: block.width, height: block.height}"
        >
          <div v-if="block.blockType === 'news'">
            <ul class="news-list">
              <li v-for="news in block.newsList" :key="news.id">
                <a :href="news.link">{{news.title}}</a>
                <p>{{news.date}}</p>
              </li>
            </ul>
          </div>
          <div v-else-if="block.blockType === 'list'">
            <ul class="list">
              <li v-for="listItem in block.list" :key="listItem">{{listItem}}</li>
            </ul>
          </div>
          <div v-else-if="block.blockType === 'teacher'">
            <a v-for="teacher in block.content" :key="teacher.id" :href="teacher.link">
              <div class="teacher">
                <img :src="teacher.image" alt="">
                <h3>{{teacher.name}}</h3>
                <h3>{{teacher.professor}}</h3>
              </div>
            </a>
          </div>
          <div v-else-if="block.blockType === 'text'">
            <div class="text">
              <h4>{{block.content.title}}</h4>
              <p>{{block.content.text}}</p>
            </div>
            
          </div>
        </main-block>
      </template>
    </div>
  </div>
</template>

<script setup>
import carousel from '@/components/carousel/index.vue'
import mainBlock from '@/components/main-block/index.vue'
import { getMainPage } from '@/api/main-page.js'
import { onMounted, ref } from 'vue'

const pageContent = ref([])

onMounted(async ()=>{
  const res = await getMainPage()
  pageContent.value = res.rows
})

</script>

<style scoped>
.page-content{
  margin-left: 100px;
  margin-top: 30px;
  width: calc(100vw - 200px);
}
.carousel{
  width: 45%;
  height: 400px;
}
.news-block{
  width: 45%;
  height: 400px;
  margin-left: 20px;
}

.teacher{
  width: 45%;
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

.text h4{
  text-align: center;
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
.list li{
  overflow: hidden;           
	text-overflow: ellipsis;     
  white-space: nowrap;
  color: rgb(56, 56, 56);   
  padding-top: 20px;   
}
</style>