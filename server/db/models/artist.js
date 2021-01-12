const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  artistImageUrl: {
    type: Sequelize.STRING,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/4/42/Andy_Warhol_1975.jpg'
  }
})

module.exports = Artist
