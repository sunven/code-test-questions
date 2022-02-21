<template>
  <div class="page-index-index-main">
    <div class="header">code test questions</div>
    <div class="body">
      <div class="list">
        <div v-for="(item, index) in listData" :key="index" @click="goQuestion(item.subject)" class="item">
          <div class="subject">{{ item.subject }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="footer">footer</div>
  </div>
</template>

<script lang="ts" setup>
import { navigateToPages } from '@/utils/util'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const listData = [
  {
    subject: 'javascript-questions',
    description: 'https://github.com/lydiahallie/javascript-questions',
  },
]

const goQuestion = (subject: string) => {
  userStore.subject = subject
  navigateToPages('question')
}
</script>
<style lang="scss">
.page-index-index-main {
  & > div {
    margin: 20px;
    background-color: #fff;
  }
  .header {
    height: 100px;
    border: 1px solid solid;
  }
  .body {
    .list {
      .item {
        border: 1px gray solid;
        border-radius: 20px;
        padding: 20px;
        .subject {
          font-size: 40px;
        }
        .description {
          font-size: 28px;
        }
      }
    }
  }
}
</style>
