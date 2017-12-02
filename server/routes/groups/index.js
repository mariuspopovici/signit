var router = require('express').Router();
var connection = require('../../shared/mongoconn.js');
var db = connection.db;
var mongojs = connection.mongojs;

// get all groups
router.get('/', function(req, res, next) {
    db.groups.find(function(error, groups) {
        if (error) {
            res.send(error);
        } else {
            res.json(groups);
        }
    });
});


// get single group by id
router.get('/:id', function(req, res, next) {
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
router.post('/', function(req, res, next) {
    var group = req.body;
    if (!group.groupName) {
        res.status(400);
        res.json({
            error: "Invalid data"
        });
    } else {
        db.groups.save(group, function(err, result) {
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
router.put('/:id', function(req, res, next) {
    var group = req.body;
    var updObj = {};

    if (group.groupName) {
        updObj.groupName = group.groupName;
    }

    if (group.groupMembers) {
        updObj.groupMembers = group.groupMembers;
    }

    if (group.groupOwner) {
      updObj.groupOwner = group.groupOwner;
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
router.delete('/:id', function(req, res, next) {

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
