const router = require('express').Router()
const {Cart, Product, CartProduct, User} = require('../db/models')
module.exports = router

// get active cart
const getCart = async userId => {
  return Cart.findOne({
    where: {
      UserId: userId,
      active: true
    },
    include: Product
  })
}

// get a product in a user's cart
const getCartProduct = async (ProductId, CartId) => {
  return CartProduct.findOne({
    where: {
      ProductId,
      CartId
    }
  })
}

// GET /api/cart -- get single cart
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const cart = await getCart(req.user.id)
      res.json(cart)
    }
    // TODO: SEND GUEST CART
  } catch (err) {
    next(err)
  }
})

// GET /api/cart/all -- get all carts
router.get('/all', async (req, res, next) => {
  try {
    if (req.user.id) {
      const carts = await Cart.findAll({
        where: {
          UserId: req.user.id
        },
        include: Product
      })
      res.json(carts)
    }
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/add/:productId -- add item to cart
router.put('/add/:productId', async (req, res, next) => {
  try {
    const user = req.user.id
    let product
    if (user) {
      const cart = await getCart(user)
      let cartProduct = await getCartProduct(
        req.params.productId,
        cart.dataValues.id
      )
      if (cartProduct) {
        // item already in cart, increase quantity
        await cartProduct.update({
          quantity: ++cartProduct.quantity
        })
      } else {
        // item not in cart, make new association
        product = await Product.findByPk(req.params.productId)
        await cart.addProduct(product)
        cartProduct = await getCartProduct(
          req.params.productId,
          cart.dataValues.id
        )
        await cartProduct.save()
      }
      await cart.save()
      res.json(await getCart(user)) // send updated list of products
    }
    // TODO: GUEST CART
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/delete/:productId -- remove item from cart
router.put('/delete/:productId', async (req, res, next) => {
  try {
    const user = req.user.id
    if (user) {
      const cart = await getCart(user)
      const product = await Product.findByPk(req.params.productId)
      await cart.removeProduct(product)
      res.json(await getCart(user)) // send updated list of products
    }
    // TODO: GUEST CART
  } catch (err) {
    next(err)
  }
})

// PUT /api/cart/edit/:productId/:qty -- edit item quantity
router.put('/edit/:productId/:qty', async (req, res, next) => {
  try {
    const user = req.user.id
    if (user) {
      const cart = await getCart(user)
      const cartProduct = await getCartProduct(
        req.params.productId,
        cart.dataValues.id
      )
      await cartProduct.update({quantity: req.params.qty})
      res.json(await getCart(user)) // send updated list of products
    }
    // TODO: GUEST CART
  } catch (err) {
    next(err)
  }
})

//PUT /api/cart/checkout
router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.user.id
    if (userId) {
      const user = await User.findByPk(userId)
      const purchaseCart = await getCart(userId)
      await purchaseCart.update({
        purchaseDate: new Date(),
        active: false
      })
      const newCart = await Cart.create()
      await user.addCart(newCart)
      res.json(purchaseCart)
    }
    // TODO: GUEST CART
  } catch (err) {
    next(err)
  }
})
