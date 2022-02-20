import Taro from '@tarojs/taro'
export function navigateTo(name: string, params?: any) {
  Taro.navigateTo({ url: `/pages/${name}/index` })
}
