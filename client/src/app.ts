import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './app.scss'

const app = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
// 引用pinia
app.use(createPinia())
export default app
