const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/',(req, res, next) => {
    const newUser = new User({
        _id : new mongoose.Types.ObjectId(),
        userId : req.body.userId,
        password : req.body.password,
        badgeId : req.body.badgeId,
        nick : req.body.nick,
        fullName : req.body.fullName
    });

    newUser.save()
        .then(doc => {
            console.log(doc);
            res.status(201).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error :err
            });
        })
});

// Get by Id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).jason({
            error : err
        })
    })
});

//Update 
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;

    User.update({_id : id}, {$set: req.body})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message : err
        })
    })
});


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    User.remove({ _id : id})
    .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: err
        })
    })
});

module.exports = router;