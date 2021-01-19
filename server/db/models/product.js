const Sequelize = require('sequelize')
const db = require('../db')

// MOVEMENTS

const DADA = 'Dada'
const ABSTRACT_EXPRESSIONISM = 'Abstract Expressionism'
const EXPRESSIONISM = 'Expressionism'
const SURREALISM = 'Surrealism'
const POP_ART = 'Pop art'
const FUTURISM = 'Futurism'
const CONTEMPORARY = 'Contemporary'
const MODERNISM = 'Modernism'

// MEDIUMS

const OIL_ON_CANVAS = 'Oil on canvas'
const PHOTOGRAPH = 'Photograph'
const GRAPHITE_ON_PAPER = 'Graphite on paper'
const FOUND_OBJECT = 'Found object'
const PAINT_ON_CANVAS = 'Paint on canvas'
const INSTALLATION = 'Installation'

const Product = db.define('Product', {
  title: {
    type: Sequelize.STRING
  },
  movement: {
    type: Sequelize.ENUM(
      DADA,
      ABSTRACT_EXPRESSIONISM,
      EXPRESSIONISM,
      SURREALISM,
      POP_ART,
      FUTURISM,
      CONTEMPORARY,
      MODERNISM
    )
  },
  medium: {
    type: Sequelize.ENUM(
      OIL_ON_CANVAS,
      PHOTOGRAPH,
      GRAPHITE_ON_PAPER,
      FOUND_OBJECT,
      PAINT_ON_CANVAS,
      INSTALLATION
    )
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/soup.jpg'
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      max: new Date().getFullYear(),
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER, // in cents
    validate: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 100,
    validate: {
      min: 0
    }
  }
})

// methods for money conversions

Product.prototype.checkout = function(product, purchaseAmt) {
  this.inventory -= purchaseAmt
}

Product.prototype.toDollars = () => {
  return this.price / 100
}

module.exports = {
  Product: Product
}
