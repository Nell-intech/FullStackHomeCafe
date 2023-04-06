// controlls routes for the app

const Drinks = require('../models/drinksModel');
const Favorites = require('../models/favoritesModel');

// module.exports.index = async (req, res) => {
//     try{
//         const drinks = await Drinks.find();
//         console.log(drinks);
//         res.render('drinksViews/Index', { drinks });
//     }catch(err){
//         console.log(err)
//         res.send(err.message);
//     }
// };

module.exports.index = async (req, res) => {
  try {
      const posts = await Drinks.find().sort({ createdAt: 1 })
      res.status(200).json(posts)
  } catch(err) {
      res.status(400).json({ error: err.message })
  }
}

module.exports.show = async (req,res) => {
    try {
      const drinks = await Drinks.findById(req.params.id);
        res.render("drinksViews/Show", { drinks });
      } catch (err) {
        console.log(err);
        res.send(err.message);
      }
    
}

module.exports.new = (req, res) => {
    res.render("drinksViews/New");
  };

// POST
module.exports.create = async (req, res) => {
    console.log("POST /homeCafe");
  
    try {
      // use the model to interact with db and create a new document in the capLog collection
      const result = await Drinks.create(req.body);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  
    res.redirect("/homeCafe");
  };

  module.exports.clear = async (req, res) => {
    console.log("DELETE /homeCafe/clear");
    try {
      await Drinks.deleteMany({});
      res.redirect("/homeCafe");
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  };

// Favorties //

  module.exports.delete = async (req,res) => {
    await Favorites.findByIdAndDelete(req.params.id)
    await Drinks.findByIdAndUpdate(req.params.id, {
      $pull:{
        favorites: req.params.did
      }
    })
    res.redirect(`/homeCafe/${req.params.id}`)
}

  module.exports.updateFavorite = async (req,res) => {
    await Drinks.findByIdAndUpdate(req.params.did, req.body)
    res.redirect(`/drinks/${req.params.id}`)
  }