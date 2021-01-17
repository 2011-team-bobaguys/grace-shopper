'use strict'
const db = require('../server/db')
const {
  User,
  Artist,
  Cart,
  Product,
  CartProduct
} = require('../server/db/models')

// MODELS

const allModels = [Product, Artist, User, Cart, CartProduct]

// DUMMY DATA

const dummyData = [
  {
    products: [
      {
        title: 'Self-Portrait with Thorn Necklace and Hummingbird',
        movement: 'Surrealism',
        medium: 'Paint on canvas',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/1/1e/Frida_Kahlo_%28self_portrait%29.jpg',
        year: 1940,
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
        name: 'Frida Kahlo',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/0/09/Frida_Kahlo%2C_by_Guillermo_Kahlo_%28cropped%29.jpg'
      },
      {
        name: 'Salvador Dali',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/bd/Man_Ray_Salvador_Dali-cropped.jpg'
      },
      {
        name: 'Andy Warhol',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/42/Andy_Warhol_1975.jpg'
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
  },
  {
    cartProducts: [
      {quantity: 5, CartId: 1, ProductId: 1},
      {quantity: 50, CartId: 1, ProductId: 3},
      {quantity: 25, CartId: 1, ProductId: 5},
      {quantity: 30, CartId: 2, ProductId: 2},
      {quantity: 45, CartId: 2, ProductId: 4}
    ]
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
