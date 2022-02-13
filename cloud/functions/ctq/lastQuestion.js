const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const lastquestionCol = db.collection('ctq-lastquestion')

// 创建集合云函数入口函数
const getLastQuestion = async (event, context) => {
  return await lastquestionCol
    .where({
      subject: event.subject,
      _openid: event._openid,
    })
    .get()
}

const setLastQuestion = async (event, context) => {
  // 创建集合
  const { data = [] } = await getLastQuestion(event, context)
  const question = data[0]
  if (question) {
    // 修改
    return await lastquestionCol.doc(question._id).update({
      data: {
        lastindex: event.lastindex,
      },
    })
  } else {
    // 新增
    return await lastquestionCol.add({ data: { _openid: event._openid, subject: event.subject, lastindex: event.lastindex } })
  }
}

exports.getLastQuestion = getLastQuestion
exports.setLastQuestion = setLastQuestion
