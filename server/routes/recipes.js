const router = require('express').Router();
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Recipe.find()
        .exec()
        .then(recipes => {
            console.log(recipes);
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST recipes'
    })
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.remove({ _id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;