const router = require('express').Router()
const {Cart, Product} = require('../db/models')
module.exports = router

// GET /api/carts
router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      include: Product
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})
