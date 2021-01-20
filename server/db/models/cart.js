const Sequelize = require('sequelize')
const db = require('../db')
const CartProduct = require('./cartProduct')

const Cart = db.define('Cart', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  purchaseDate: {
    type: Sequelize.DATE
  },
  cartTotalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Cart.prototype.setCartTotalPrice = async function() {
  const allProductsInCart = await CartProduct.findAll({
    where: {CartId: this.id}
  })
  const totalPrice = allProductsInCart.reduce((accum, currentCartProduct) => {
    return accum + currentCartProduct.totalPrice
  }, 0)
  this.cartTotalPrice = totalPrice
  await this.save()
}

// Cart.afterUpdate(async (cart) => {
//   const allProductsInCart = await CartProduct.findAll({
//     where: {CartId: cart.id},
//   })
//   const totalPrice = allProductsInCart.reduce((accum, currentCartProduct) => {
//     return accum + currentCartProduct.totalPrice
//   }, 0)
//   cart.cartTotalPrice = totalPrice
//   await cart.save()
// })

Cart.addHook('beforeSave', async cart => {
  const allProductsInCart = await CartProduct.findAll({
    where: {CartId: cart.id}
  })
  const totalPrice = allProductsInCart.reduce((accum, currentCartProduct) => {
    return accum + currentCartProduct.totalPrice
  }, 0)
  cart.cartTotalPrice = totalPrice
})

module.exports = Cart
