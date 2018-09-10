const router = require('express').Router();
const User = require('../models/User');

// Get Token From the Headers of the HTTP Request
const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

// GET users listing.
router.get('/', function(req, res, next) {
    User
        .find()
        .exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

// GET user profile.
router.get('/current', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;