'use strict';

const query = require('../config/db');

const getUserImg = async function (username) {
  try {
    const r = await query(
      'select `avatar from `user` where username = ?', [username]
    );
    return r;

  } catch (e) {
    console.log(`错误为${e}`);
    return 1;
  }
}

// 查找email
const selectUserEmail = async function (email) {
  try {
    const r = await query(
      'select * from `user` where `email` = ?', [email]
    );
    return r;

  } catch (e) {
    console.log(`错误为${e}`);
    return 1;

  }
}

//更新密码
const updatePassword = async function (params) {
  try {
    const r = await query('update `user` set `password` = ? where id = ?', [params.password, params.id]);
    return r;

  } catch (e) {
    console.log(`错误为${e}`);
    return 1;
  }
}

//注册
const registe = async function (params) {
  try {
    const r = await query('insert into user(username,email,password) values(?,?,?)', [params.username, params.email, params.password]);
    return r;

  } catch (e) {
    console.log(`错误为${e}`);
    return 1;
  }
}