import Taro from '@tarojs/taro'
export function navigateToPages(name?: string, params?: any) {
  const path = `/pages/${name}/index`
  navigateTo(path, params)
}

export function navigateTo(path?: string, params?: any) {
  if (!path) {
    return
  }
  let search = ''
  if (params) {
    search = Object.entries(params)
      .reduce((acc, [key, value]) => {
        return (acc += '&' + key + '=' + value)
      }, '')
      .replace('&', '?')
  }
  Taro.navigateTo({ url: path + search })
}
