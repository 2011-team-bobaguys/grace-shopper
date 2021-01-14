const router = require('express').Router()
const {Product, Artist} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
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

// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/:productId
router.delete('./:productId', isAdminCheck, async (req, res, next) => {
  try {
    await Artist.destroy({
      where: {id: req.params.productId}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
