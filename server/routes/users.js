const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('./auth');
const User = mongoose.model('User');

//POST new user route - SIGN UP
router.post('/', (req, res, next) => {
    const { body: { user } } = req;

    // Check if email is empty
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    // Check if password is empty
    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    // Create a user
    const finalUser = new User(user);

    // Crypt/Hash password
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
    const { body: { user } } = req;
    // Check if email is empty
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    // Check if password is empty
    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        // Generate JSON  Web Token
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
    })(req, res, next);
});

module.exports = router;