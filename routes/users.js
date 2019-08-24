var express = require('express');
var router = express.Router();
var db = require('../config/db');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
/* GET users listing. */
// get请求user
router.get('/', function (req, res, next) {
  db.query('select * from `user`', null, function (err, rows) {
    if (err) {
      var data = {
        code: -1,
        data: null,
        isSuccess: false,
        msg: err
      };
    } else {
      var data = {
        code: 200,
        data: rows,
        isSuccess: true,
        msg: '请求成功'
      };
    }
    res.json(data);
  });
});

// 登录 重置密码 注册, type分别为defualt 1 2
router.post('/', jsonParser, function (req, res, next) {
  var param = req.body;
  console.info(param);
  var username = param.username;
  var email = param.email;
  var password = param.password;
  var type = param.type;
  switch (type) {
    case 1:
      db.query('select * from `user` where `email` = ?', email, function (err, result) {
        if (err) throw err;
        if (result.length >= 1) {
          db.query('update `user` set `password` = ? where id = ?', [password, result[0].id], function (err, result) {
            if (err) throw err;
            if (result.affectedRows === 1) {
              var data = {
                code: 200,
                data: result,
                isSuccess: true,
                msg: '重置成功'
              };
              res.json(data);
            }
          })

        } else {
          var data = {
            code: -1,
            data: null,
            isSuccess: false,
            msg: '邮箱错误，没有此邮箱'
          };
          res.json(data);
        }
      });
      break;
    case 2:
      db.query('select * from `user` where `email` = ?', email, function (err, result) {
        if (err) throw err;
        if (result.length >= 1) {
          var data = {
            code: -1,
            data: null,
            isSuccess: false,
            msg: '注册失败，邮箱已被使用'
          };
          res.json(data);

        } else {
          db.query('insert into user(username,email,password) values(?,?,?)', [username, email, password], function (err, result) {
            if (err) throw err;
            if (result.affectedRows === 1) {
              var data = {
                code: 200,
                data: null,
                isSuccess: true,
                msg: '注册成功'
              };
              res.json(data);
            }
          })
        }
      });
      break;
    default:
      db.query('select * from `user` where `email` = ?', email, function (err, result) {
        if (err) throw err;
        if (result.length >= 1) {
          if (result[0].password === password) {
            var data = {
              code: 200,
              data: result,
              isSuccess: true,
              msg: `登录成功,你好,${result[0].username}`
            };
            res.json(data);
          } else {
            var data = {
              code: -1,
              data: null,
              isSuccess: false,
              msg: '密码错误，请重试'
            };
            res.json(data);
          }

        } else {
          var data = {
            code: -1,
            data: null,
            isSuccess: false,
            msg: '邮箱错误，没有此邮箱'
          };
          res.json(data);
        }
      });
      break;

  }




});

module.exports = router;