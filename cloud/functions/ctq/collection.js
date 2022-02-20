const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const collectionCol = db.collection('ctq-collection')

// 创建集合云函数入口函数
const getCollection = async (event, context) => {
  return await collectionCol
    .where({
      subject: event.subject,
      _openid: event._openid,
    })
    .get()
}

const addCollection = async (event, context) => {
  return await collectionCol.add({ data: { _openid: event._openid, subject: event.subject, index: event.index } })
}

const delCollection = async (event, context) => {
  return await collectionCol
    .where({
      _openid: event._openid,
      subject: event.subject,
      index: event.index,
    })
    .remove()
}

exports.getCollection = getCollection
exports.addCollection = addCollection
exports.delCollection = delCollection
