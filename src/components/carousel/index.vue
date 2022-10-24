<template>
  <div class="carousel" ref="carousel">
    <div class="panel" ref="slider" >
      <div class="image" v-for="img in imgList" :key="img.src">
        <img :src="img.src" alt="" :width="width" :height="height">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const props = defineProps({
  // 轮播图列表
  imgList: {
    type: Array,
    required: true
  },
  // 自动切换间隙
  interval: {
    type: Number,
    default: 3000
  }
})
// 滑动窗口
const slider = ref(null)
// 当前图片下标
const activeIndex = ref(0)
// 滑动定时器
let timer = null
// 轮播图
const carousel = ref(null)
// 图片宽度
const width = ref(0)
// 高度
const height = ref(0)
/**
 * @description 滑动效果
 * @param {*} target 目标偏移量
 */
const slideEffect = (target) => {
  // 当前位置
  const offset = slider.value.offsetLeft
  // 过渡效果步长
  let step = (target - offset) / 10
  // 对每次移动的距离取整，ceil：向上取整，floor：向下取整
  step = step > 0 ? Math.ceil(step) : Math.floor(step) 
  // 每隔15ms执行一次
  setTimeout(() => {
        if (target !== offset) {
          slider.value.style.left = offset + step + 'px' // 移动
          slideEffect(target)
        }
      }, 15) 
}
/**
 * 图片滑动
 * @param {*} moveX 偏移量
 */
const useSlide = (moveX)=>{
  const offset = slider.value.offsetLeft
  const target = offset + moveX
  // console.log(slider.value);
  slideEffect(target)
}
/**
 * 切换图片
 */
const onMove = ()=>{
  // 最后一张图片时显示第一张
  if(activeIndex.value === props.imgList.length - 1){
    activeIndex.value = 0
    // slider.value.style.left = 0
    useSlide(carousel.value.offsetWidth * (props.imgList.length - 1))
  }else{
    activeIndex.value = activeIndex.value + 1
    // console.log(slider.value.offsetWidth);
    useSlide(-carousel.value.offsetWidth)
  }
}
/**
 * 停止滑动
 */
const stop = ()=>{
  clearInterval(timer)
  timer = null
}
/**
 * 开始滑动
 */
const start = ()=>{
  clearInterval(timer)
  timer = setInterval(()=>{
    onMove()
  }, props.interval)
}
onMounted(()=>{
  start()
  width.value = carousel.value.offsetWidth
  height.value = carousel.value.offsetHeight
  slider.value.style.width = width.value * props.imgList.length + 'px'
  slider.value.style.height = height.value
})

</script>

<style scoped>
.carousel{
  z-index: 1;
  position: relative;
  overflow: hidden;
}

.panel{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1
}
.image{
  display: inline-block;
  z-index: 1;
  /* width: 100%; */
}

</style>