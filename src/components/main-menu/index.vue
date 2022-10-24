<template>
  <div>
    <ul class="menu">
      <li 
        v-for="(menu, index) in menus" 
        :key="menu.id" 
        @mouseenter="mouseEnterHandler(index)" 
        @mouseleave="mouseLeaveHandler(index)"
        @click.stop="clickHandler(menu.path)"
      >
        {{menu.name}}
        <transition name="slide">
          <template v-if="menu.children && visible[index]">
            <ul class="submenu">
              <li v-for="item in menu.children" :key="item.id" @click.stop="clickHandler(menu.path + item.path)">{{item.name}}</li>
            </ul>
          </template>
        </transition>
        
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getMainMenu } from '@/api/main-page.js'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const menus = ref([])
const visible = ref([])

const getMenuData = async ()=>{
  const res = await getMainMenu()
  // console.log(res);
  menus.value = res.menus
}

const mouseEnterHandler = (index)=>{
  visible.value[index] = true
  // console.log(visible.value);
}

const mouseLeaveHandler = (index)=>{
  visible.value[index] = false
  // console.log(visible.value);
}

onMounted(async ()=>{
  const res = await getMainMenu()
  menus.value = res.menus
  let v = []
  for(let i=0;i<menus.value.length;i++){
    v.push(false)
  }
  visible.value = v
})

const clickHandler = (path) => {
  router.push(path)
}
</script>

<style scoped>
.menu{
  width: 100%;
  background-color: #004ea1;
  margin: 0px;
  padding: 0px;
  color: aliceblue;
  display: flex;
  justify-content: flex-start;
  padding-left: 110px;
  list-style: none;
  height: 40px;
}
.menu li{
  width: 15%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  z-index: 10;
}
.menu li:hover{
  background-color: #2e71b8;
}

.submenu{
  padding: 0px;
  z-index: 10;
  color: #000;
  transition: all 0.3s;
}
.submenu li{
  width: 100%;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 100;
}
.submenu li:hover{
  background-color: rgb(209, 209, 209);
}

.slide-enter-active,
.slide-leave-active{
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
</style>