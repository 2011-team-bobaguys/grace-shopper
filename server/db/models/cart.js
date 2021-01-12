const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: null
  }
})

module.exports = Cart
