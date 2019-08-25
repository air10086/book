const codes = {
  '200': '请求成功',
  '12000': '服务器错误',

  '10001': '邮箱错误，没有此邮箱',
  '10002': '密码错误',
  '10003': '邮箱已被使用',
  '10004': '没有此邮箱',
  '10005': '用户名或密码不能超过12位',
  '10006': '参数错误',
  '10007': '姓名不能超过6位',
  '10008': '性别参数错误',
  '10009': '年龄必须为数字',
  '10010': '请求参数超出规定长度',
  /**
   * token相关
   */
  '20000': '没有token',
  '20001': 'token信息错误'
}

/**
 * 自定义错误返回函数
 */
const resFun = function (res, code) {
  res.json({
    code,
    data: codes[`${code}`]
  })
}

/**
 * 请求成功
 */
const resSuc = function (res, data) {
  res.json({
    code: 0,
    data: data
  })
}

/**
 * 内部错误
 */
const resErr = function (res) {
  res.json({
    code: 12000,
    data: codes[`${code}`]
  })
}

/**
 * 参数为空
 */
const resEmp = function (res) {
  res.json({
    code: 10001,
    data: codes[code]
  })
}
module.exports = {
  resFun,
  resErr,
  resEmp,
  resSuc
};