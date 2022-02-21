import { callFunction } from '@/utils/cloudUtil'
import { computed, ref, Ref } from 'vue'

const _data: Ref<number[]> = ref([])

let _subject = ''
let _currentIndex: Ref<number> | undefined = undefined

export function useCollection(subject: string, currentIndex?: Ref<number>) {
  _subject = subject
  _currentIndex = currentIndex
  return callFunction('ctq', { cfntype: 'getCollection', subject: _subject }).then(data => {
    _data.value = data.map(c => c.index)
  })
}

export const currentIsCollection = !_currentIndex
  ? false
  : computed(() => {
      return isCollection(_currentIndex?.value)
    })

function isCollection(index?: number) {
  return !index ? false : _data.value.indexOf(index) !== -1
}

export function onCollection(index: number) {
  if (isCollection(index)) {
    // 删除
    _data.value = _data.value.filter(c => c !== index)
    return callFunction('ctq', { cfntype: 'delCollection', subject: _subject, index })
  }
  // 添加
  _data.value.push(index)
  return callFunction('ctq', { cfntype: 'addCollection', subject: _subject, index })
}

export { _data as collectionData }
