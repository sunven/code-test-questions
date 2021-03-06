const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const wrongCol = db.collection('ctq-wrong')

// 创建集合云函数入口函数
const getWrong = async (event, context) => {
  return await wrongCol.where({ subject: event.event, _openid: event._openid, index: event.index }).get()
}

const addWrong = async (event, context) => {
  const { data = [] } = await getWrong(event, context)
  if (data.length > 0) {
    return
  }
  return await wrongCol.add({ data: { _openid: event._openid, subject: event.subject, index: event.index } })
}

const delWrong = async (event, context) => {
  return await wrongCol
    .where({
      _openid: event._openid,
      subject: event.subject,
      index: event.index,
    })
    .remove()
}

exports.getWrong = getWrong
exports.addWrong = addWrong
exports.delWrong = delWrong
