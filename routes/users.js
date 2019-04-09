var express = require('express');
var router = express.Router();
var db = require('../config/db');

/* GET users listing. */
// get请求user
router.get('/', function(req, res, next) {
  db.query('select * from `user`', function(err, rows) {
    if (err) {
      var data = { code: -1, data: null, isSuccess: false, msg: err };
    } else {
      var data = {
        code: 0,
        data: rows,
        isSuccess: true,
        msg: '请求成功'
      };
    }
    res.json(data);
  });
});

module.exports = router;
