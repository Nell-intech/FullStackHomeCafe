const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// needs to get all of the fav. drinks for user
const favoritesSchema = new Schema({
    favorites:[{
      type: mongoose.Types.ObjectId,
      ref: 'Drinks'
    }]
})

const Favorites = mongoose.model('Favorites', favoritesSchema);

module.exports = Favorites 