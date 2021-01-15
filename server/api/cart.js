const router = require('express').Router()
module.exports = router

// TODO: ADD CART ROUTES HERE

// GET /api/users/:userId/cart
router.get('/', async (req, res, next) => {
  res.send('it worked')
})
