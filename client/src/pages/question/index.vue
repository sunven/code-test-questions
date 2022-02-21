<template>
  <div class="main">
    <div class="progress">
      <div>{{ currentIndex + 1 }} / {{ questions.length }}</div>
    </div>
    <div class="opreation">
      <div @click="navigateToPages('collection')">收藏</div>
      <div @click="navigateToPages('wrong')">错题</div>
    </div>
    <div class="next">
      <div>
        <button @click="navigateToPages(subject, { index: currentIndex })">继续做题</button>
      </div>
      <div>
        <button @click="navigateTo('/pages/question/list', { index: currentIndex })">List</button>
      </div>
      <div>
        <button @click="navigateToPages(subject, { index: 0 })">重新开始</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { callFunction } from '../../utils/cloudUtil'
import { navigateTo, navigateToPages } from '../../utils/util'
import questions from '../../assets/subjects.json'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const { subject } = useUserStore()

const currentIndex = ref(0)
callFunction('ctq', { cfntype: 'getLast', subject }).then(data => {
  const question = data[0]
  question && (currentIndex.value = question.index)
})
</script>

<style lang="scss">
.main {
  .progress {
    div {
      width: 40%;
      line-height: 100px;
      background-color: beige;
      margin: 20px auto;
      text-align: center;
    }
  }
  .opreation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    div {
      flex: 0 0 25%;
      line-height: 80px;
      height: 80px;
      background-color: aquamarine;
      margin: 0 20px;
      text-align: center;
    }
  }
  .next {
    div {
      margin: 20px;
    }
  }
}
</style>
