const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('CartProduct', {
  quantity: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.INTEGER // in cents
  }
})

// TODO: ADD INSTANCE METHODS FOR CHECKOUT

module.exports = CartProduct
