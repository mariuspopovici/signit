const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://signit:signit@ds155841.mlab.com:55841/signit', ['groups']);

// get all groups
router.get('/groups', function(req, res, next) {
    db.groups.find(function(error, groups) {
        if (error) {
            res.send(error);
        } else {
            res.json(groups);
        }
    });
});


// get single group by id
router.get('/groups/:id', function(req, res, next) {
    db.groups.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, group) {
        if (err) {
            res.send(err);
        } else
        {
            res.json(group);
        }
    });
});

// save group
router.post('/groups', function(req, res, next) {
    var group = req.body;
    if (!group.groupName) {
        res.status(400);
        res.json({
            error: "Invalid data"
        });
    } else {
        db.save(group, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        });
    }
});

// update group
router.put('/groups/:id', function(req, res, next) {
    var group = req.body;
    var updObj = {};

    if (group.groupName) {
        updObj.groupName = group.groupName;
    }

    if (group.groupMembers) {
        updObj.groupMembers = group.groupMembers;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            error: "Invalid data"
        });
    } else {
        db.groups.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }
});

// delete group
router.delete('/groups/:id', function(req, res, next) {
    
    db.groups.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    });
    
});


module.exports = router;