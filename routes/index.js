const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Bazar model
const Bazar = require('../models/Bazar');
const bazardata = Bazar.find({});

//Money model
const Money = require('../models/Money');
const moneydata = Money.find({});

//Welcome
router.get('/', (req, res) => res.render('welcome', { title: 'Welcome' }));



//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //Bazar spendings
    var totalMoney=0,totalSpend=0;
    bazardata.exec((err, data) => {
        if (err) throw err;
        data.forEach(element => {
        totalSpend = totalSpend + element.amount;
    });
    moneydata.exec((err, data) => {
        if (err) throw err;
        data.forEach(element => {
            totalMoney = totalMoney + element.amount;
        });
        res.render('dashboard', {
            title: 'Dashboard',
            name: req.user.fName + " " + req.user.lName,
            type: req.user.type,
            bazar: totalSpend,
            money: totalMoney
        })
    })
})});

module.exports = router;