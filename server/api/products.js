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

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Artist
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
