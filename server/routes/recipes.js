const router = require('express').Router();
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');
const checkIfUserIsAuthor = require('../config/auth.middleware');

//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ dest: DIR }).single('photo');

// GET all recipes
router.get('/', (req, res, next) => {
    Recipe
        .find()
        .sort('-createdAt')
        .exec()
        .then(recipes => {
            // console.log(recipes);
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;
    console.log(id);

    Recipe.findById(id)
        .exec()
        .then(recipe => {
            // console.log(recipe);
            res.status(200).json(recipe);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', (req, res, next) => {
    console.log('add recipe');
    console.log(`Add recipe: ${req.body}`);
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        category: req.body.category.value,
        duration: req.body.duration,
        steps: req.body.steps,
        level: req.body.level,
        // cost: req.body.cost,
        // image: req.body.image,
        // quantity: req.body.quantity,
        createdAt: new Date(),
        lastEditedAt: new Date(),
        ingredients: req.body.ingredients,
        author: req.body.author
    })
    recipe
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Edit a recipe
router.patch('/:id', checkIfUserIsAuthor, (req, res, next) => {
    console.log(req.body);
    const id = req.body._id;
    Recipe.update({ _id: id }, {
            $set: {
                name: req.body.name,
                category: req.body.category,
                ingredients: req.body.ingredients,
                steps: req.body.steps,
                lastEditedAt: new Date()
            }
        })
        .exec()
        .then(result => {
            res.status(200).json(result)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('delete ' + id);
    Recipe.remove({ _id: id })
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

router.post('/search', (req, res, next) => {
    console.log(req.body);
    const searchQuery = req.body.searchInput;
    console.log(searchQuery);
    Recipe
        .find({ $text: { $search: searchQuery } }, { score: { $meta: "textScore" } })
        .exec(function(err, recipes) {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }
            // console.log(recipes);
            res.status(200).json(recipes);
        });
})

// GET recipes for one user
router.get('/user/:authorId', (req, res, next) => {
    const id = req.params.authorId;
    console.log(id);
    Recipe
        .find({ author: id })
        .sort('-createdAt')
        .exec()
        .then(recipes => {
            // console.log(recipes);
            res.status(200).json(recipes);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;