const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    author: String,
    description: String,
    image: {
        type: String,
        default: ''
    },
    createdAt: Date,
    category: String,
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }],
    steps: [{
        description: String,
        duration: Number
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;