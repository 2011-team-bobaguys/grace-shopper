const router = require('express').Router()
const {Product, Artist} = require('../db/models')
module.exports = router

// GET /api/artists
router.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.findAll({
      include: Product
    })
    res.json(artists)
  } catch (err) {
    next(err)
  }
})
