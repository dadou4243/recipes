const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    image: {
        type: String,
        default: ''
    },
    createdAt: Date,
    category: {
        type: String
    },
    ingredients: [{
        name: String,
        quantity: Number,
        unit: String
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;