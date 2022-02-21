const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const lastCol = db.collection('ctq-last')

// 创建集合云函数入口函数
const getLast = async (event, context) => {
  const { subject, _openid } = event
  if (!subject) {
    return Promise.reject('subject 不能为空.')
  }
  return await lastCol
    .where({
      subject,
      _openid,
    })
    .get()
}

const setLast = async (event, context) => {
  const { index, subject, _openid } = event
  // 创建集合
  const { data = [] } = await getLast(event, context)
  const question = data[0]
  if (question) {
    // 修改
    return await lastCol.doc(question._id).update({
      data: {
        index,
      },
    })
  } else {
    // 新增
    return await lastCol.add({ data: { _openid, subject, index } })
  }
}

exports.getLast = getLast
exports.setLast = setLast
