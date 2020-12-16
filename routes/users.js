const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

//User model
const User = require('../models/User');

//Profile
router.get('/profile', ensureAuthenticated, (req, res) =>
    res.render('profile', {
        title: 'Profile',
        name: req.user.fName + " " + req.user.lName,
        type: req.user.type,
        fName: req.user.fName,
        lName: req.user.lName,
        email: req.user.email,
        address: req.user.address,
        phone: req.user.phone
    }));

//Login Page
router.get('/login', (req, res) => res.render('login', { title: 'Login' }));

//Register Page
router.get('/register', (req, res) => res.render('register', { title: 'Register' }));

//Register Handle
router.post('/register', (req, res) => {
    const { fName, lName, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!fName || !lName || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    //Check password match
    if (password != password2) {
        errors.push({ msg: 'Password do not Match' });
    }
    //Check password length
    if (password.length < 4) {
        errors.push({ msg: 'Password must be atlest 4 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            fName,
            lName,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //User exixts
                    errors.push({ msg: 'Email is already registerd' });
                    res.render('register', {
                        errors,
                        fName,
                        lName,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        fName,
                        lName,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hashed
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered, please log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
});

//Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;