'use strict'
const {
  selectUserEmail,
  updatePassword,
  registe,
  getUserImg
} = require('../server/login');
const {
  resEmp,
  resFun,
  resErr,
  resSuc
} = require('../common/response');

//登录 重置密码 注册, type分别为defualt 1 2
const login_registe_reset = async function (req, res) {
  const param = req.body;
  console.info(req);
  const username = param.username;
  const email = param.email;
  const password = param.password;
  const type = param.type;
  switch (type) {
    case 1:
      const selectedRes = await selectUserEmail(email);
      if (selectedRes.length >= 1) {
        const result = await updatePassword(param);
        if (result.affectedRows === 1) {
          return resSuc(res, 'ok');
        }

      } else {
        return resFun(res, 10004);
      }
      break;
    case 2:
      const selectedRes1 = await selectUserEmail(email);
      if (selectedRes1.length >= 1) {
        return resFun(res, 10003);

      } else {
        const result1 = await registe(param);
        if (result1.affectedRows === 1) {
          return resSuc(res, 'ok');
        }
      }
      default:
        const selectedRes2 = await selectUserEmail(email);
        if (selectedRes2.length >= 1) {
          if (selectedRes2[0].password === password) {
            return resSuc(res, `登录成功，你好${username}`);
          } else {
            return resFun(res, 10002);
          }

        } else {
          return resFun(res, 10001);
        }
  }

}

module.exports = login_registe_reset;