'use strict'
const {create} = require('react-test-renderer')
const db = require('../server/db')
const {User, Artist, Cart, Product} = require('../server/db/models')

// MODELS

const allModels = [Product, Artist, User, Cart]

// DUMMY DATA

const dummyData = [
  {
    products: [
      {
        title: "Campbell's Soup Cans 1",
        movement: 'Pop art',
        medium: 'Paint on canvas',
        year: 1962,
        price: 5000000
      },
      {
        title: "Campbell's Soup Cans 2",
        movement: 'Pop art',
        medium: 'Paint on canvas',
        year: 1962,
        price: 5000000
      },
      {
        title: "Campbell's Soup Cans 3",
        movement: 'Pop art',
        medium: 'Paint on canvas',
        year: 1962,
        price: 5000000
      },
      {
        title: "Campbell's Soup Cans 4",
        movement: 'Pop art',
        medium: 'Paint on canvas',
        year: 1962,
        price: 5000000
      },
      {
        title: "Campbell's Soup Cans 4",
        movement: 'Pop art',
        medium: 'Paint on canvas',
        year: 1962,
        price: 5000000
      }
    ]
  },
  {
    artists: [
      {
        name: 'Andy Warhol'
      },
      {
        name: 'Salvador Dali'
      },
      {
        name: 'Frida Kahlo'
      }
    ]
  },
  {
    users: [
      {
        email: 'email@email.com',
        password: '12345',
        firstName: 'User',
        lastName: 'One'
      },
      {
        email: 'ginger@pup.com',
        password: 'password',
        firstName: 'Ginger',
        lastName: 'Dogglet',
        isAdmin: true
      }
    ]
  },
  {
    carts: [{}, {active: false, purchaseDate: new Date()}]
  }
]

// CREATE DUMMY INSTANCES

const createInstances = async (modelList, modelName) => {
  try {
    await Promise.all(
      modelList.map(model => {
        return modelName.create(model)
      })
    )
  } catch (err) {
    console.error(err.message)
  }
}

// MAKE ASSOCIATIONS

const addAssociations = async () => {
  try {
    const existingUsers = await User.findAll()
    const existingCarts = await Cart.findAll()
    const existingProducts = await Product.findAll()
    const existingArtists = await Artist.findAll()

    // associate users with carts
    for (let i = 0; i < existingUsers.length; i++) {
      await existingUsers[i].addCart(existingCarts[i])
    }

    // associate products with carts
    for (let i = 0; i < existingProducts.length; i++) {
      let j = i % existingCarts.length // idx for cart
      await existingProducts[i].addCart(existingCarts[j])
    }

    // associate artists with products
    for (let i = 0; i < existingProducts.length; i++) {
      let j = i % existingArtists.length // idx for artist
      await existingArtists[j].addProduct(existingProducts[i])
    }
  } catch (err) {
    console.error(err.message)
  }
}

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    for (let i = 0; i < dummyData.length; i++) {
      let modelList = Object.values(dummyData[i])[0]
      let modelName = allModels[i]
      await createInstances(modelList, modelName)
    }

    await addAssociations()

    console.log('seeded successfully')
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
