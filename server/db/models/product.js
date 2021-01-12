const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.ENUM('modern', 'contemporary', 'impressionist', 'pop')
  },
  medium: {
    type: Sequelize.ENUM('photograph', 'sculpture', 'painting', 'drawing')
  },
  artImageUrl: {
    type: Sequelize.STRING,
    default:
      'https://www.christies.com/img/LotImages/2010/NYR/2010_NYR_02355_0012_000(andy_warhol_campbells_soup_can103047).jpg'
  },
  yearCreated: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
