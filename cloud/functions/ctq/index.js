// 云函数入口文件
const cloud = require('wx-server-sdk')
const { getLastQuestion, setLastQuestion } = require('./lastQuestion')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  event._openid = wxContext.OPENID
  switch (event.cfntype) {
    case 'getLastQuestion':
      return getLastQuestion(event, context)
    case 'setLastQuestion':
      return setLastQuestion(event, context)
    default:
      return
  }
}
