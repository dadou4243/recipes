const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
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
    }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

recipeSchema.index({
    name: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;