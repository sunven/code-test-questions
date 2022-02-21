<template>
  <div class="main">
    <div class="list">
      <div
        class="item"
        :class="{ truesel: index <= currentIndex, wrongsel: wrongData.indexOf(index) !== -1 }"
        @click="navigateToPages(subject, { index })"
        :key="index"
        v-for="(item, index) in questions.length"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import questions from '@/assets/subjects.json'
import { navigateToPages } from '@/utils/util'
import { useUserStore } from '@/stores/userStore'
import { wrongData, useWrong } from '@/use/useWrong'
import Taro from '@tarojs/taro'
import { nextTick } from 'vue'
// import '@/assets/common.scss'

const instance = Taro.getCurrentInstance()
const params = instance?.router?.params
const currentIndex = +(params?.index || 0)

const { subject } = useUserStore()
useWrong(subject).then(c => {
  nextTick()
})
</script>

<style lang="scss">
.main {
  .list {
    display: flex;
    flex-flow: row wrap;
    .item {
      width: calc(20% - 24px);
      margin-top: 20px;
      margin-left: 20px;
      background-color: #fff;
      line-height: 80px;
      text-align: center;
    }
    .wrongsel {
      background-color: orangered;
    }
    .truesel {
      background-color: green;
    }

    .item:nth-child(5n) {
      margin-right: 20px;
    }
  }
}
</style>
