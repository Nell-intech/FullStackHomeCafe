// Drinks Model to save drinks data in database

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const drinksSchema = new Schema(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        coffee: { type: String, required: true, enum: ['Matcha','Blonde', 'Medium','Dark','caffeine free']},
        milk: { type: String, required: true, enum: ['Oat', 'Coconut','Hemp','no milk'] },
        toppings: { type: String, required: true, enum: ['Chocolate','Vanilla', 'Caramel','Strawberry','no toppings'] },
        favorite: [{type: Boolean, default: false}]
    },

);

const Drink = mongoose.model('Drink', drinksSchema);

module.exports = Drink;