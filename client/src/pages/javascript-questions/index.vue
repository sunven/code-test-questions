<template>
  <div class="wrap">
    <div class="head">{{ currentIndex + 1 }} / {{ subjects.length }}</div>
    <div class="main">
      <p class="title" v-html="decodeHTML(md.render(current.title))"></p>
      <div class="code">
        <rich-text :nodes="md.render(current.codeMarkdown || '')"></rich-text>
      </div>
      <div class="options">
        <div v-for="(item, index) in current.options" :key="index" v-html="decodeHTML(md.render(item))"></div>
      </div>

      <div class="answers-wrap" v-show="answersVisible">
        <p class="answers">答案：{{ current.answers.join() }}</p>
        <div class="explain" v-html="decodeHTML(md.render(current.explain))"></div>
      </div>
    </div>
    <div class="footer">
      <button @click="closeAnswers(!answersVisible)">answer</button>
      <button @click="restartHandle">restart</button>
      <button @click="preHandle">pre</button>
      <button @click="nextHandle">next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import questions from "../../../server/javascript-questions/markdownArr.json";
import subjects from '../../assets/subjects.json'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { decodeHTML } from 'entities'
import 'highlight.js/styles/default.css'
import Taro from '@tarojs/taro'
const currentIndex = ref(0)
Taro.cloud.init({
  env: 'hj1-7842c9',
})

Taro.cloud
  .callFunction({
    // 要调用的云函数名称
    name: 'ctq',
    // 传递给云函数的event参数
    data: {
      cfntype: 'getLastQuestion',
      subject: 'javascript-questions',
    },
  })
  .then(({ result: { data } }: any) => {
    const question = data[0]
    question && (currentIndex.value = question.lastindex)
  })

const answersVisible = ref(false)
// Actual default values
var md = markdownIt({
  breaks: true,
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre style="font-size:16px;overflow-x: scroll;" class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})
const current = computed(() => subjects[currentIndex.value])

const closeAnswers = (value = false) => {
  answersVisible.value = value
}

const nextHandle = () => {
  closeAnswers()
  if (currentIndex.value < subjects.length - 1) {
    currentIndex.value++
    setLastQuestion(currentIndex.value)
  }
}

const restartHandle = () => {
  closeAnswers()
  currentIndex.value = 0
  setLastQuestion(currentIndex.value)
}

const preHandle = () => {
  closeAnswers()
  if (currentIndex.value > 0) {
    currentIndex.value--
    setLastQuestion(currentIndex.value)
  }
}

const setLastQuestion = (lastindex: number) => {
  Taro.cloud.callFunction({
    // 要调用的云函数名称
    name: 'ctq',
    // 传递给云函数的event参数
    data: {
      cfntype: 'setLastQuestion',
      subject: 'javascript-questions',
      lastindex,
    },
  })
}
</script>

<style lang="scss">
.wrap {
  height: 100vh;
  display: flex;
  flex-flow: column;
  .head {
    margin: 10px 20px;
  }
  .main {
    overflow-y: scroll;
    flex-grow: 1;
    margin: 40px 20px;
    .title,
    .answers {
      font-size: 1.5em;
    }
    .code,
    .options,
    .answers-wrap,
    .explain {
      margin: 20px 0;
    }
  }
  .footer {
    flex: 0 0 80px;
    button {
      // width: 80%;
      margin: 10px 10px;
      display: inline-block;
    }
  }
}
</style>
