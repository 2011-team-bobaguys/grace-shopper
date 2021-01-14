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

// GET /api/artists/:artistId
router.get('/:artistId', async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId, {
      include: Product
    })
    res.json(artist)
  } catch (err) {
    next(err)
  }
})
