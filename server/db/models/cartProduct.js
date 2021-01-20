const Sequelize = require('sequelize')
const db = require('../db')
const {Product} = require('./product')

const CartProduct = db.define('CartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER // in cents
  }
})

// TODO: ADD INSTANCE METHODS FOR CHECKOUT

CartProduct.prototype.setTotalPrice = async function() {
  let currentProduct = await Product.findByPk(this.ProductId)
  this.totalPrice = this.quantity * currentProduct.price
  await this.save()
}

// CartProduct.afterCreate(async (cartProduct) => {
//   let currentProduct = await Product.findByPk(cartProduct.ProductId)
//   cartProduct.totalPrice = cartProduct.quantity * currentProduct.price
// })

CartProduct.addHook('beforeUpdate', async cartProduct => {
  let currentProduct = await Product.findByPk(cartProduct.ProductId)
  cartProduct.totalPrice = cartProduct.quantity * currentProduct.price
})

CartProduct.addHook('beforeSave', async cartProduct => {
  let currentProduct = await Product.findByPk(cartProduct.ProductId)
  cartProduct.totalPrice = cartProduct.quantity * currentProduct.price
})

module.exports = CartProduct
