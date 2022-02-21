import { callFunction } from '@/utils/cloudUtil'
import { ref, Ref } from 'vue'

const _data: Ref<number[]> = ref([])

let _subject = ''

export function useWrong(subject: string) {
  _subject = subject
  return callFunction('ctq', { cfntype: 'getWrong', subject: _subject }).then(data => {
    _data.value = data.map(c => c.index)
  })
}

function isWrong(index?: number) {
  return !index ? false : _data.value.indexOf(index) !== -1
}

export function onWrong(index: number) {
  // if (isWrong(index)) {
  //   // 删除
  //   _data.value = _data.value.filter(c => c !== index)
  //   return callFunction('ctq', { cfntype: 'delWrong', subject: _subject, index })
  // }
  // 添加
  _data.value.push(index)
  return callFunction('ctq', { cfntype: 'addWrong', subject: _subject, index })
}

export { _data as wrongData }
