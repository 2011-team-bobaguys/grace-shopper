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

//array findOrCreate?
router.post('/', isAdminCheck, async (req, res, next) => {
  try {
    req.body.price = req.body.price * 100
    const product = await Product.create(req.body)

    let artistResult = await Artist.findOne({
      where: {name: req.body.artist}
    })

    if (!artistResult) {
      artistResult = await Artist.create({name: req.body.artist})
    }

    artistResult.addProduct(product)

    res.json(product)
  } catch (err) {
    next(err)
  }
})

// PUT /api/products/:productId
router.put('/:productId', isAdminCheck, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', isAdminCheck, async (req, res, next) => {
  try {
    await Artist.destroy({
      where: {id: req.params.productId}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
