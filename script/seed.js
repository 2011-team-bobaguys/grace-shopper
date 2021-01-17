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
        title: 'The Persistence of Memory',
        movement: 'Surrealism',
        medium: 'Paint on canvas',
        imageUrl:
          'https://cdn.britannica.com/10/182610-050-77811599/The-Persistence-of-Memory-canvas-collection-Salvador-1931.jpg',
        year: 1931,
        price: 5000000
      },
      {
        title: `Campbell's Soup Can`,
        movement: 'Pop art',
        medium: 'Paint on canvas',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/7a/Campbell%27Soup_%281965%29_Andy_Warhol_%281928-1967%29_%2849982308446%29.jpg',
        year: 1965,
        price: 5000000
      },
      {
        title: 'Card Player',
        movement: 'Surrealism',
        medium: 'Paint on canvas',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/3/39/Pablo_Picasso%2C_1913-14%2C_L%27Homme_aux_cartes_%28Card_Player%29%2C_oil_on_canvas%2C_108_x_89.5_cm%2C_Museum_of_Modern_Art%2C_New_York.jpg',
        year: 1914,
        price: 5000000
      },
      {
        title: 'Sky Above Clouds',
        movement: 'Pop art',
        medium: 'Paint on canvas',
        imageUrl:
          'https://miro.medium.com/max/1400/1*NW-kQ_YjhNqLG8tl6XdbmQ.jpeg',
        year: 1965,
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
        title: "Campbell's Soup Cans 5",
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
      },
      {
        name: 'Pablo Picasso',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/98/Pablo_picasso_1.jpg'
      },
      {
        name: `Georgia O'Keeffe`,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/b/b4/O%27Keeffe-%28hands%29.jpg'
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

    const [kahlo, dali, warhol, picasso, okeeffe] = existingArtists
    const [
      kahloProduct1,
      daliProduct1,
      warholProduct1,
      picassoProduct1,
      okeeffeProduct1,
      warholProduct2,
      warholProduct3,
      warholProduct4,
      warholProduct5
    ] = existingProducts

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

    await kahlo.addProduct(kahloProduct1)
    await dali.addProduct(daliProduct1)
    await warhol.addProduct(warholProduct1)
    await picasso.addProduct(picassoProduct1)
    await okeeffe.addProduct(okeeffeProduct1)
    await warhol.addProduct(warholProduct2)
    await warhol.addProduct(warholProduct3)
    await warhol.addProduct(warholProduct4)
    await warhol.addProduct(warholProduct5)

    // for (let i = 0; i < existingProducts.length; i++) {
    //   let j = i % existingArtists.length // idx for artist
    //   await existingArtists[j].addProduct(existingProducts[i])
    // }
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
