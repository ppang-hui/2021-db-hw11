// var express = require('express');
import express from "express";
import sql from "../database/sql";
const router = express.Router();

/* GET home page. */

router.get('/', async function(req, res, next){
  const users = await sql.getUsers()
  console.log(users);
  res.render('users',{
    title: '사용자 목록',
    users
  });
});
module.exports = router;
