const express = require('express')
const app = express()
const router = express.Router()
const {User, Cart, Product, CartProduct} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
module.exports = router

// TODO: cart route -- not working
// app.use('/:userId/cart', require('./cart'))

/**
 * 	USER ROUTES
 *  */

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

// PUT /api/users/:userId
router.put('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/users/:userId
router.delete('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

/**
 * 	CART ROUTES
 *  */

// GET /api/users/:userId/cart -- GET CART
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

// PUT /api/users/:userId/cart/add/:productId -- ADD ITEM TO CART
router.put('/:userId/cart/add/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: req.params.userId,
        active: true
      }
    })
    const product = await Product.findByPk(req.params.productId)
    await cart.addProduct(product)
    // TODO: INCREASE QUANTITY IF ITEM IS ALREADY IN CART
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//PUT/ api/users/:userId/cart/delete/:productId -- REMOVE ITEM FROM CART
router.put('/:userId/cart/delete/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: req.params.userId,
        active: true
      }
    })
    const product = await Product.findByPk(req.params.productId)
    await cart.removeProduct(product)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// PUT api/users/:userId/cart/increase/:productId -- INCREASE QUANTITY OF ITEM
router.put('/:userId/cart/increase/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: req.params.userId,
        active: true
      }
    })
    const cartId = cart.dataValues.id
    const cartProduct = await CartProduct.findOne({
      where: {
        CartId: cartId,
        ProductId: req.params.productId
      }
    })
    await cartProduct.update({
      quantity: ++cartProduct.quantity
    })
    res.send(cartProduct)
  } catch (err) {
    next(err)
  }
})

// PUT api/users/:userId/cart/decrease/:productId -- DECREASE QUANTITY OF ITEM
router.put('/:userId/cart/decrease/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        UserId: req.params.userId,
        active: true
      }
    })
    const cartId = cart.dataValues.id
    const cartProduct = await CartProduct.findOne({
      where: {
        CartId: cartId,
        ProductId: req.params.productId
      }
    })
    await cartProduct.update({
      quantity: --cartProduct.quantity
    })
    res.send(cartProduct)
  } catch (err) {
    next(err)
  }
})
