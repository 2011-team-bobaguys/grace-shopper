const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/userId/cart

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      where: {
        UserId: req.params.userId
      },
      include: Product
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})
