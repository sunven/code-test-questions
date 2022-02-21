<template>
  <div class="main">
    <QuestionIndexList :data="wrongData" :get-cls="getCls" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { wrongData, useWrong } from '@/use/useWrong'

import QuestionIndexList from '@/components/QuestionIndexList.vue'

const { subject } = useUserStore()
useWrong(subject)

const getCls = (index: number) => {
  return 'wrongsel'
}
</script>

<style lang="scss">
.main {
}
</style>
