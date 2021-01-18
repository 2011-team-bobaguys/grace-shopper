const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const CartProduct = db.define('CartProduct', {
  quantity: {
    type: Sequelize.INTEGER
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

module.exports = CartProduct
