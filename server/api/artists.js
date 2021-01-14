const router = require('express').Router()
const {Product, Artist} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
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

// POST /api/artists
router.post('/', isAdminCheck, async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body)
    res.json(artist)
  } catch (err) {
    next(err)
  }
})

// PUT /api/artists/:artistId
router.put('/:artistId', isAdminCheck, async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.artistId)
    await artist.update(req.body)
    res.json(artist)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/artists/:artistId
router.delete('/:artistId', isAdminCheck, async (req, res, next) => {
  try {
    await Artist.destroy({
      where: {
        id: req.params.artistId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
