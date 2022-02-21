<template>
  <div class="main">
    <QuestionIndexList :data="data" :get-cls="getCls" />
  </div>
</template>

<script setup lang="ts">
import questions from '@/assets/subjects.json'
import { useUserStore } from '@/stores/userStore'
import { wrongData, useWrong } from '@/use/useWrong'
import Taro from '@tarojs/taro'
import QuestionIndexList from '@/components/QuestionIndexList.vue'

const data = Array.from({ length: questions.length }, (_v, k) => k)

const instance = Taro.getCurrentInstance()
const params = instance?.router?.params
const currentIndex = +(params?.index || 0)

const { subject } = useUserStore()
useWrong(subject)

const getCls = (index: number) => {
  if (wrongData.value.indexOf(index) !== -1) {
    return 'wrongsel'
  }
  if (index <= currentIndex) {
    return 'donesel'
  }
  return ''
}
</script>

<style lang="scss">
.main {
}
</style>
