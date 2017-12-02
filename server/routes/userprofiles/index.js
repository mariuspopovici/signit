var router = require('express').Router();
var connection = require('../../shared/mongoconn.js');
var db = connection.db;
var mongojs = connection.mongojs;

// get user profiles
router.get('/', function(req, res, next) {
    db.user_profiles.find(function(error, profiles) {
        if (error) {
            res.send(error);
        } else {
            res.json(profiles);
        }
    });
});

// update user profile
router.put('/:id', function(req, res, next) {
    var profile = req.body;
    var updObj = {};


    if (profile.name) {
        updObj.name = profile.name;
    }

    if (profile.email) {
        updObj.email = profile.email;
    }

    if (profile.picture) {
      updObj.picture = profile.picture;
    }

    if (profile.user_metadata) {
        if (profile.user_metadata.full_name) {
            updObj.full_name = profile.user_metadata.full_name;
        }
    }

    if (!updObj) {
        res.status(400);
        res.json({
            error: "Invalid data"
        });
    } else {
        db.user_profiles.update({
            name: req.params.id
        }, updObj, {upsert: true}, function(err, result) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            else {
                console.log(result);
                res.json(result);
            }
        });
    }
});

module.exports = router;
