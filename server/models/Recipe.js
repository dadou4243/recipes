const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    id: Number,
    description: String,
    image: {
        type: String,
        default: ''
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;