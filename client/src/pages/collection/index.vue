<template>
  <div class="main">
    <QuestionIndexList :data="collectionData" :get-cls="getCls" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { collectionData, useCollection } from '@/use/useCollection'

import QuestionIndexList from '@/components/QuestionIndexList.vue'

const { subject } = useUserStore()
useCollection(subject)

const getCls = (index: number) => {
  return 'truesel'
}
</script>

<style lang="scss">
.main {
}
</style>
