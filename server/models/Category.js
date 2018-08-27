const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

categorySchema.virtual('recipes', {
    ref: 'Recipe',
    localField: '_id',
    foreignField: 'categories'
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;