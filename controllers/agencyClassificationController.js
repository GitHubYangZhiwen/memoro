const AgencyClassification = require('../models/agencyClassification');
const async = require('async');

// 增加分类
exports.addAgencyClass = [
    function (req, res, next) {
        AgencyClassification
            .find({
                "label": req.query.label,
                "belong": req.query.belong
            })
            .exec(function (err, AgencyClass) {
                if (err) { return next(err); }
                // Successful
                if (AgencyClass.length == 0) {
                    next();
                } else {
                    res.jsonp({
                        status: 1,
                        message: 'AgencyClass already exists',
                        data: AgencyClass
                    });
                }
            })
    },
    function (req, res, next) {
        var agencyClassification = new AgencyClassification({
            belong: req.query.belong,
            label: req.query.label,
            color: req.query.color
        })
        agencyClassification
            .save(function (err, AgencyClass) {
                if (err) { return next(err); }
                // Successful
                res.jsonp({
                    status: 0,
                    message: 'success',
                    data: AgencyClass
                });
            });
    }
]

// 删除分类
exports.deleteAgencyClass = function (req, res, next) {
    AgencyClassification
        .findByIdAndRemove(req.query.id)
        .exec(function (err, AgencyClass) {
            if (err) { return next(err); }
            // Successful
            res.jsonp({
                status: 0,
                message: 'success',
                data: AgencyClass
            });
        });
}

// 查找所有分类
exports.findAllAgencyClass = function (req, res, next) {
    AgencyClassification
        .find({ 'belong': req.query.belong })
        .exec(function (err, list_AgencyClass) {
            if (err) { return next(err); }
            // Successful
            res.jsonp({
                status: 0,
                message: 'success',
                data: list_AgencyClass
            });
        });
}

// 通过名字和属于查找
exports.findBylabelandbelong = function (req, res, next) {
    AgencyClassification
        .find({
            "label": req.query.label,
            "belong": req.query.belong
        })
        .exec(function (err, AgencyClass) {
            if (err) { return next(err); }
            // Successful
            {
                res.jsonp({
                    status: 0,
                    message: 'success',
                    data: AgencyClass
                });
            }
        })
}