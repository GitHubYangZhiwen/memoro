const Person = require('../models/person');
const crypto = require('crypto');
const async = require('async');

function getMD5Password(id) {
    var md5 = crypto.createHash('md5');
    var token_before = id + "sail";
    return md5.update(token_before).digest('hex');
}

// 用户注册
exports.person_signup = [
    // 检查用户名是否存在
    function (req, res, next) {
        Person.find({
            'username': req.query.username
        }).exec(function (err, person) {
            if (err) { return next(err) }
            // Successful
            if (person.length != 0) {
                res.jsonp({
                    status: 1,
                    message: "user name already exists"
                });
            } else {
                next();
            }
        });
    },
    // 检查电话是否存在
    function (req, res, next) {
        Person.find({
            'tel': req.query.tel
        }).exec(function (err, person) {
            if (err) { return next(err) }
            // Successful
            if (person.length != 0) {
                res.jsonp({
                    status: 1,
                    message: "phone number already exists"
                });
            } else {
                next();
            }
        });
    },
    // 检查邮箱是否存在
    function (req, res, next) {
        Person.find({
            'email': req.query.email
        }).exec(function (err, person) {
            if (err) { return next(err) }
            // Successful
            if (person.length != 0) {
                res.jsonp({
                    status: 1,
                    message: "mailbox already exists"
                });
            } else {
                next();
            }
        });
    },
    // 前面做一些验证工作
    function (req, res, next) {
        var person = new Person({
            username: req.query.username,
            password: req.query.password,
            tel: req.query.tel,
            email: req.query.email
        })
        person.save(function (err) {
            if (err) { return next(err) }
            // Successful
            res.jsonp({
                status: 0,
                message: 'success'
            });
        })
    }
]

// 用户登录
exports.person_login = function (req, res, next) {
    Person.find({
        'username': req.query.username,
        'password': req.query.password
    })
        .exec(function (err, person) {
            if (err) { return next(err) }
            // Successful
            if (person.length == 0) {
                res.jsonp({ status: 1, message: 'User name or password error' });
            } else {
                res.jsonp({
                    status: 0,
                    message: 'Successful sign-in',
                    data: {
                        token: getMD5Password(person[0]._id),
                        user: person
                    }
                });
            }
        })
}

// 修改和重置密码
exports.person_reset = [
    function (req, res, next) {
        // 修改
        // {username: '',oldpassword: '',newpassword: ''}
        if (req.query.username && req.query.oldpassword && req.query.newpassword) {
            Person.find(
                {
                    'username': req.query.username,
                    'password': req.query.oldpassword
                }).exec(function (err, person) {
                    if (err) { return next(err) }
                    if (person.length == 0) {
                        res.jsonp({
                            status: 1,
                            message: 'User name or password error'
                        })
                    } else {
                        person[0].password = req.query.newpassword;
                        person[0].save(function (err) {
                            if (err) { return next(err) }
                            // Successful
                            res.jsonp({
                                status: 0,
                                message: 'success'
                            });
                        });
                    }
                })
        } else {
            next();
        }
    }, function (req, res, next) {
        // 重置
        // {username: '',tel: '', email: '', newpassword: ''}
        Person.find(
            {
                'username': req.query.username,
                'tel': req.query.tel,
                'email': req.query.email
            }
        ).exec(function (err, person) {
            if (err) { return next(err) }
            if (person.length == 0) {
                res.jsonp({
                    status: 1,
                    message: 'The original information was incorrect.'
                })
            } else {
                // Successful
                person[0].password = req.query.newpassword;
                person[0].save(function (err) {
                    if (err) { return next(err) }
                    // Successful
                    res.jsonp({
                        status: 0,
                        message: 'success'
                    });
                })
            }

        })
    }]

// 用户列表
exports.person_list = function (req, res, next) {
    Person.find()
        .sort([['username', 'ascending']])
        .exec(function (err, list_person) {
            if (err) { return next(err) }
            // Successful
            if (list_person.length == 0) {
                res.jsonp({
                    status: 0,
                    message: "",
                    data: []
                });
            } else {
                res.jsonp({
                    status: 0,
                    message: 'success',
                    data: list_person
                });
            }
        });
}