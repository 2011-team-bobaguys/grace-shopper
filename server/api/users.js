const express = require('express')
const app = express()
const router = express.Router()
const {User, Cart, Product, CartProduct} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
module.exports = router

// cart route -- not working
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
        UserId: req.params.userId
      }
    })
    if (cart.dataValues.active === false) {
      const err = new Error('Cart has been checked out')
      return next(err)
    }
    const product = await Product.findByPk(req.params.productId)
    await cart.addProduct(product)
    res.json(cart)
  } catch (err) {
    next(err)
  }

  // localhost:8080/api/users/2/cart/add/1

  /*
		http://localhost:8080/api/users/1/cart/add/2

	req.params = {
		userId: 1,
		productId: 1 } 
	*/
})

/* 

cart possibilities

add to cart: 
PUT /api/users/:userId/cart/add/:productId
	- lets us access user's cart and the product they want to add

delete from cart: 
PUT /api/users/:userId/cart/delete/:productId

edit cart item quantity:
PUT /api/users/:userId/cart/


*/
