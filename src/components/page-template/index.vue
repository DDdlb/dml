<template>
  <div>
    <h1>{{currentRouter}}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const currentRouter = computed(()=>router.currentRoute.value.fullPath)
</script>