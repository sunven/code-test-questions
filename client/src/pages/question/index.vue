<template>
  <div class="main">
    <div class="progress">
      <div>1 / 150</div>
    </div>
    <div class="opreation">
      <div @click="navigateTo('collection')">收藏</div>
      <div @click="navigateTo('wrong')">错题</div>
    </div>
    <div class="next">
      <div>
        <button @click="navigateTo('javascript-questions')">继续做题</button>
      </div>
      <div>
        <button @click="navigateTo('javascript-questions', { index: 0 })">重新开始</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { callFunction } from '../../utils/cloudUtil'
import { navigateTo } from '../../utils/util'
import questions from '../../assets/subjects.json'
async function abc() {
  const a = await callFunction('ctq', { cfntype: 'getLastQuestion', subject: 'javascript-questions' })
  console.log(a)
}
abc()
// callFunction('ctq', { cfntype: 'getLastQuestion', subject: 'javascript-questions' }).then(data => {
//   console.log(data)
// })

function go() {
  Taro.navigateTo({ url: `/pages/question/index` })
}
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
    }
  }
}
</style>
