const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

//User model
const User = require('../models/User');
const userdata = User.find({});

//Bazar model
const Bazar = require('../models/Bazar');
const bazardata = Bazar.find({});

//Notice model
const Notice = require('../models/Notice');
const noticedata = Notice.find({});

//Money model
const Money = require('../models/Money');
const moneydata = Money.find({});

//Meal model
const Meal = require('../models/Meal');
const mealdata = Meal.find({});

//Notice
router.get('/notices', ensureAuthenticated, (req, res) => {
    noticedata.exec((err, data) => {
        if (err) throw err;
        res.render('notices', {
            title: 'Notices',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            records: data
        })
    });
});

//Add Meal
router.get('/addmeal', ensureAuthenticated, (req, res) => {
    userdata.exec((err, data) => {
        if (err) throw err;
         res.render('addmeal', {
            title: 'Add Meal',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            records: data
        })
    });
});

//Meal Chart
router.get('/mealchart', ensureAuthenticated, (req, res) => {
    mealdata.exec((err, data) => {
        if (err) throw err;
        res.render('mealchart', {
            title: 'Meal Chart',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            records: data
        })
    });
});

//Add Money
router.get('/addmoney', ensureAuthenticated, (req, res) => {
    userdata.exec((err, data) => {
        if (err) throw err;
        res.render('addmoney', {
            title: 'Add Money',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            records: data
        })
    });
});

//Add Money Handle
router.post('/addmoney', (req, res) => {
    const { mType, date, memName, amount } = req.body;
    let errors = [];

    //Check required fields
    if (!mType || !memName || !amount || !date) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('addmoney', {
            title: 'Add Money',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            errors,
            memName,
            mType,
            amount,
            date
        });
    } else {
            //Money Prepare
            const newMoney = new Money({
                memName,
                mType,
                amount,
                date
            });
            //Money Saved
            newMoney.save()
                .then(money => {
                    req.flash('success_msg', 'Your Money is added');
                    res.redirect('/mess/addmoney');
                })
                .catch(err => console.log(err));
    }
});

//Money Chart
router.get('/moneychart', ensureAuthenticated, (req, res) => {
    moneydata.exec((err, data) => {
        if (err) throw err;
        res.render('moneychart', {
            title: 'Money Chart',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            record: data
        })
    });
});

//AddBazar
router.get('/addbazar', ensureAuthenticated, (req, res) =>
    res.render('addbazar', {
        title: 'Add Bazar',
        name: req.user.fName + " " + req.user.lName,
        type: req.user.type
    }));

//Bazar Chart
router.get('/bazarchart', ensureAuthenticated, (req, res) => {
    bazardata.exec((err, data) => {
        if (err) throw err;
        res.render('bazarchart', {
            title: 'Bazar List',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            records: data
        })
    });
});

//Add Bazar Handle
router.post('/addbazar', (req, res) => {
    const { date, desc, amount, receipt } = req.body;
    let errors = [];

    //Check required fields
    if (!date || !desc || !amount || !receipt) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('addbazar', {
            title: 'Add Bazar',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            errors,
            date,
            desc,
            amount,
            receipt
        });
    } else {//////////
        Bazar.findOne({ receipt: receipt })
            .then(bazar => {
                if (bazar) {
                    //Bazar exists
                    errors.push({ msg: 'Bazar already exist' });
                    res.render('addbazar', {
                        title: 'Add Bazar',
                        name: req.user.fName + " " + req.user.lName,
                        type: req.user.type,
                        errors,
                        date,
                        desc,
                        amount,
                        receipt
                    });
                } else {//--//
                    //Bazar Prepare
                    const newBazar = new Bazar({
                        desc,
                        amount,
                        receipt,
                        date
                    });
                    //Bazar Saved
                    newBazar.save()
                        .then(bazar => {
                            req.flash('success_msg', 'Your Bazar is added');
                            res.redirect('/mess/addbazar');
                        })
                        .catch(err => console.log(err));
                }//--//
            });
    }/////////
});

module.exports = router;