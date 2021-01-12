const router = require('express').Router()
const {Product, Artist} = require('../db/models')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Artist
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
