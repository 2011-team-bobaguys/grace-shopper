const Sequelize = require('sequelize')
const db = require('../db')

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



module.exports = Cart
