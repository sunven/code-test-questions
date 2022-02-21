<template>
  <div class="question-index-list">
    <div class="item" :class="props.getCls(index)" @click="navigateToPages(subject, { index: item })" :key="index" v-for="(item, index) in props.data">
      {{ item as number + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateToPages } from '@/utils/util'
import { useUserStore } from '@/stores/userStore'

// import '../../assets/common.scss'

const props = defineProps({
  data: { type: Array, required: true },
  getCls: { type: Function, required: true },
})

const { subject } = useUserStore()
</script>

<style lang="scss">
.question-index-list {
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
  .donesel {
    background-color: dodgerblue;
  }
  .truesel {
    background-color: green;
  }

  .item:nth-child(5n) {
    margin-right: 20px;
  }
}
</style>
