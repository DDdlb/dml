<template>
  <div class="pagination">
    <div 
      class="page-item" 
      :class="currentPage === 1?'disabled':''"
      @click="prePageClick()"
    >
      上一页
    </div>
    <div 
      class="page-item" 
      v-for="item in totalPage" 
      :key="item" 
      :class="item === currentPage?'current':''"
      @click="pageClickHandler(item)"
    >
      {{item}}
    </div>
    <div 
      class="page-item" 
      :class="currentPage === totalPage?'disabled':''"
      @click="nextPageClick()"
    >下一页</div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPage: {
    type: Number,
    required: true
  }
})
// pageChange: 页面变化事件，  prePageClick上一页点击事件，   nextPageClick： 下一页点击事件
const emits = defineEmits(['pageChange', 'prePageClick', 'nextPageClick'])
// 点击页面
const pageClickHandler = (page)=>{
  // console.log(page);
  if(page === props.currentPage) return 
  emits('pageChange', page)
}

// 上一页点击事件
const prePageClick = ()=>{
  if(props.currentPage === 1) return 
  emits('prePageClick')
}

// 下一页点击事件
const nextPageClick = ()=>{
  if(props.currentPage === props.totalPage) return
  emits('nextPageClick')
}
</script>
<style scoped>
.pagination{
  display: flex;
  justify-content: flex-end;
}
.page-item{
  /* width: 30px; */
  height: 30px;
  border: 1px solid rgb(94, 94, 94);
  display: inline-block;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 10px;
}
.page-item:hover{
  background-color: rgb(87, 168, 255);
  color: aliceblue;
  border: 1px solid rgb(87, 168, 255);
}

.current{
  background-color: rgb(87, 168, 255);
  color: #fff;
  border: 1px solid rgb(87, 168, 255);
}
.disabled{
  background-color: rgb(198, 198, 198);
  color: #fff;
  border: rgb(198, 198, 198);
  cursor: default;
}
.disabled:hover{
  background-color: rgb(198, 198, 198);
  color: #fff;
  border: rgb(198, 198, 198);
  cursor: default;
}
</style>