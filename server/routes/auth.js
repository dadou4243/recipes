const router = require('express').Router();

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

// GET users listing. //
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// GET user profile. //
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;