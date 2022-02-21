// 云函数入口文件
const cloud = require('wx-server-sdk')
const { getLast, setLast } = require('./last')
const { getCollection, addCollection, delCollection } = require('./collection')
const { getWrong, addWrong, delWrong } = require('./wrong')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  event._openid = wxContext.OPENID
  switch (event.cfntype) {
    // last
    case 'getLast':
      return getLast(event, context)
    case 'setLast':
      return setLast(event, context)
    // collection
    case 'getCollection':
      return getCollection(event, context)
    case 'addCollection':
      return addCollection(event, context)
    case 'delCollection':
      return delCollection(event, context)
    // wrong
    case 'getWrong':
      return getWrong(event, context)
    case 'addWrong':
      return addWrong(event, context)
    case 'delWrong':
      return delWrong(event, context)
    default:
      return
  }
}
