import Taro from '@tarojs/taro'

Taro.cloud.init({
  env: 'hj1-7842c9',
})

export const callFunction = (name: string, data: any) => {
  return Taro.cloud
    .callFunction({
      // 要调用的云函数名称
      name,
      // 传递给云函数的event参数
      data,
    })
    .then(({ result: { data } }: any) => {
      return data
    })
}
