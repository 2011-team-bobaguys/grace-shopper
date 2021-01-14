const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('Artist', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/artist.jpg'
  }
})

module.exports = Artist
