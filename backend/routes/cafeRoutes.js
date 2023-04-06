// creating routes for the app

const express = require('express')

const router = express.Router()

const drinksController = require('../controllers/drinksController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// router.post('/seed', drinksController.seed)

router.get('/', drinksController.index)

// Setup a "new" route for creating new cafe item data

// router.get('/new', drinksController.new)

router.delete('/clear', authorize, confirmUserAccess, drinksController.clear)

router.delete('/:id', authorize, confirmUserAccess, drinksController.delete)

//router.put('/:id', drinksController.update)


// router.post('/', authorize, drinksController.create)   


//router.get('/:id/edit', drinksController.edit)

router.get('/:id', drinksController.show)


module.exports = router;