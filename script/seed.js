'use strict'

const db = require('../server/db')
const {User, Artist, Cart, Product} = require('../server/db/models')

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    //DEFINITIONS

    //NEW CARTS
    const cart1 = await Cart.create()

    //NEW USERS
    const User1 = await User.create({
      email: 'email@email.com',
      password: '12345',
      fullName: 'User One',
      username: 'firstuser123',
    })

    //NEW ARTISTS
    const Andy = await Artist.create({name: 'Andy Warhol'})

    //NEW PRODUCTS
    const Soup = await Product.create({
      title: `Andy Warhol's Famous Soup`,
      genre: 'pop',
      price: 50000,
      medium: 'painting',
    })

    for (let i = 0; i <= 50; i++) {
      let newProduct = await Product.create({
        title: `Andy Warhol Monroe ${i}`,
        genre: 'pop',
        price: 5000 - i,
        medium: 'painting',
      })

      //NEW ASSOCIATIONS IN FOR LOOP
      await Andy.addProduct(newProduct)
    }

    //NEW ASSOCIATIONS
    await User1.addCart(cart1)
    await Andy.addProduct(Soup)
    await cart1.addProduct(Soup)

    console.log(`seeded users`)
    console.log(`seeded successfully`)
  } catch (err) {
    console.log(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
