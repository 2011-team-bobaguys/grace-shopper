const User = require('./user')
const Cart = require('./cart')
const Artist = require('./artist')
const Product = require('./product')
const CartProduct = require('./cartProduct')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//ONE TO MANY : USER TO CART
User.hasMany(Cart)
Cart.belongsTo(User)

//MANY TO MANY : PRODUCT TO CART
Cart.belongsToMany(Product, {through: CartProduct})
Product.belongsToMany(Cart, {through: CartProduct})

//ONE TO MANY : ARTIST TO PRODUCT
Artist.hasMany(Product)
Product.belongsTo(Artist)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Artist,
  Cart,
  Product,
  CartProduct
}
