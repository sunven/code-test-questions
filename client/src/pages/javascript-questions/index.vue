<template>
  <div class="wrap">
    <div class="head">
      <div class="progress">{{ currentIndex + 1 }} / {{ subjects.length }}</div>
      <div class="operation">
        <div>
          <button size="mini" @click="onCollection(currentIndex)">{{ currentIsCollection ? '已收藏' : '收藏' }}</button>
        </div>
        <div><button size="mini" @click="navigateTo('/pages/question/list')">List</button></div>
      </div>
    </div>
    <div class="main">
      <p class="title" v-html="decodeHTML(md.render(current.title))"></p>
      <div class="code">
        <rich-text :nodes="md.render(current.codeMarkdown || '')"></rich-text>
      </div>
      <div class="options">
        <div
          class="option"
          :class="{ wrongsel: selIndex === index, truesel: trueIndex === index }"
          @click="selectAnswer(index)"
          v-for="(item, index) in current.options"
          :key="index"
          v-html="decodeHTML(md.render(item))"
        ></div>
      </div>

      <div class="answers-wrap" v-show="answersVisible">
        <p class="answers">答案：{{ current.answers.join() }}</p>
        <div class="explain" v-html="decodeHTML(md.render(current.explain))"></div>
      </div>
    </div>
    <div class="footer">
      <button @click="answersVisible = !answersVisible">answer</button>
      <button @click="restartHandle">restart</button>
      <button @click="preHandle">pre</button>
      <button @click="nextHandle">next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import subjects from '../../assets/subjects.json'
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { decodeHTML } from 'entities'
import 'highlight.js/styles/default.css'
import Taro from '@tarojs/taro'
import { callFunction } from '@/utils/cloudUtil'
import { navigateTo } from '@/utils/util'
import { useCollection, currentIsCollection, onCollection } from '@/use/useCollection'
import { useWrong, onWrong } from '@/use/useWrong'
import { useUserStore } from '@/stores/userStore'

const { subject } = useUserStore()

const instance = Taro.getCurrentInstance()
const params = instance?.router?.params
const index = +(params?.index || 0)

const currentIndex = ref(index)

// 错题
useWrong(subject)
// 收藏
useCollection(subject, currentIndex)

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

const changeQuestionBefore = (value = false) => {
  answersVisible.value = value
  selIndex.value = -1
  trueIndex.value = -1
}

const nextHandle = () => {
  changeQuestionBefore()
  if (currentIndex.value < subjects.length - 1) {
    currentIndex.value++
    setLast(currentIndex.value)
  }
}

const restartHandle = () => {
  changeQuestionBefore()
  currentIndex.value = 0
  setLast(currentIndex.value)
}

const preHandle = () => {
  changeQuestionBefore()
  if (currentIndex.value > 0) {
    currentIndex.value--
    setLast(currentIndex.value)
  }
}

const setLast = (index: number) => {
  callFunction('ctq', {
    cfntype: 'setLast',
    subject,
    index,
  })
}

// 选项选择
const selIndex = ref(-1)
const trueIndex = ref(-1)

const selectAnswer = (index: number) => {
  selIndex.value = index
  const answer = current.value.answers[0]
  trueIndex.value = answer.charCodeAt(0) - 65
  answersVisible.value = true
  if (index !== trueIndex.value) {
    //错题收集
    onWrong(currentIndex.value)
  }
}
</script>

<style lang="scss">
.wrap {
  height: 100vh;
  display: flex;
  flex-flow: column;
  .head {
    background-color: white;
    margin: 10px 20px;
    display: flex;
    .progress {
      line-height: 80px;
      flex: 0 0 25%;
    }
    .operation {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      & > div {
        margin: 10px;
      }
    }
  }
  .main {
    // background-color: white;
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
    .options {
      .option {
        line-height: 70px;
        margin: 20px 0;
        background-color: white;
      }
      .wrongsel {
        background-color: orangered;
      }
      .truesel {
        background-color: green;
      }
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
