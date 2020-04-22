const express = require('express');
const router = express.Router();

const person_controller = require('../controllers/personController');
// 用户注册
router.get('/signup', person_controller.person_signup);
// 用户登录
router.get('/login', person_controller.person_login);
// 重置密码
router.get('/reset', person_controller.person_reset);
// 用户列表
router.get('/allperson', person_controller.person_list);

module.exports = router;