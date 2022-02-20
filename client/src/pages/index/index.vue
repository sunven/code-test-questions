<template>
  <div class="main">
    <div class="header">header</div>
    <div class="body">
      <div class="list">
        <div v-for="(item, index) in listData" @click="goQuestion(item.title)" class="item">
          <div class="title">{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
// import './index.scss'

const listData = [
  {
    title: 'javascript-questions',
    description: 'https://github.com/lydiahallie/javascript-questions',
  },
]
const goQuestion = title => {
  Taro.navigateTo({ url: `/pages/question/index` })
}
</script>
<style lang="scss">
.taro_page {
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.1);
}
</style>
