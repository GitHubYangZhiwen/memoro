const Agency = require('../models/Agency');
const async = require('async');

// 增加TODO
exports.addAgency = [function (req, res, next) {
    var agency = new Agency({
        belong: req.query.belong,
        type: req.query.type,
        content: req.query.content,
        createtime: req.query.createtime,
        isimportant: req.query.isimportant,
        isfinish: req.query.isfinish,
        note: req.query.note,
        isdelete: req.query.isdelete,
        deletetime: req.query.deletetime
    })
    agency.save(function (err, agency) {
        if (err) { return next(err); }
        // Successful
        Agency
            .findById(agency._id)
            .populate('type')
            .exec(function (err, result) {
                res.jsonp({
                    status: 0,
                    message: 'success',
                    data: result
                });
            });
        // res.jsonp(agency);
    });
}]

// 假删除TODO,撤销删除
exports.changedeleteAgency = function (req, res, next) {
    var deletetime = req.query.isdelete == "true" ? new Date() : '';
    Agency
        .findByIdAndUpdate(
            req.query.id,
            { "isdelete": req.query.isdelete, "deletetime": deletetime },
            {},
            function (err) {
                if (err) { return next(err); }
                // Successful
                res.jsonp({
                    status: 0,
                    message: 'success'
                });
            })
}

// 修改TODO
exports.updateAgency = function (req, res, next) {
    if (req.query.createtime) {
        delete req.query.createtime;
    }
    if (req.query.deletetime) {
        delete req.query.deletetime;
    }
    if (req.query.belong) {
        delete req.query.belong;
    }
    var _id = req.query.id;
    delete req.query.id;
    req.query.deletetime = req.query.isdelete == "true" ? new Date() : '';
    Agency.findByIdAndUpdate(_id, req.query, {}, function (err, theagency) {
        if (err) { return next(err); }
        // Successful
        res.jsonp({
            status: 0,
            message: 'success',
            data: theagency
        });
    });
}

// 查询TODO
exports.searchAgency = function (req, res, next) {
    if (req.query.type) {
        Agency.find({ "belong": req.query.belong, "type": req.query.type }, function (err, agencies) {
            if (err) { return next(err); }
            // Successful
            res.jsonp({
                status: 0,
                message: 'success',
                data: agencies
            });
        })
    } else {
        Agency.find({ "belong": req.query.belong }, function (err, agencies) {
            if (err) { return next(err); }
            // Successful
            res.jsonp({
                status: 0,
                message: 'success',
                data: agencies
            });
        })
    }
}

