var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'rootbook'
});

function query(sql, value, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, value, function (err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
}

exports.query = query;