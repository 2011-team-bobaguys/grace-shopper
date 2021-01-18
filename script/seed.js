'use strict'
const db = require('../server/db')
const {
  User,
  Artist,
  Cart,
  Product,
  CartProduct
} = require('../server/db/models')

// MAKE INSTANCES AND ASSOCIATIONS

const addInstancesAssociations = async () => {
  try {
    const existingUsers = await User.bulkCreate([
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
      },
      {
        email: 'gingersfriend@pup.com',
        password: 'password',
        firstName: 'Ginger',
        lastName: 'Friend'
      }
    ]).then(() => {
      return User.findAll()
    })

    const existingCarts = await Cart.bulkCreate([
      {},
      {},
      {},
      {active: false, purchaseDate: new Date()},
      {active: false, purchaseDate: new Date()},
      {active: false, purchaseDate: new Date()},
      {active: false, purchaseDate: new Date()}
    ]).then(() => {
      return Cart.findAll()
    })

    const existingProducts = await Product.bulkCreate([
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
    ]).then(() => {
      return Product.findAll()
    })

    const existingArtists = await Artist.bulkCreate([
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
    ]).then(() => {
      return Artist.findAll()
    })

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

    const [kahlo, dali, warhol, picasso, okeeffe] = existingArtists

    // associate users with carts
    for (let i = 0; i < existingCarts.length; i++) {
      let j = i % existingUsers.length // idx for user
      await existingUsers[j].addCart(existingCarts[i])
    }

    // associate products with carts
    for (let i = 0; i < existingProducts.length; i++) {
      let j = i % existingCarts.length // idx for cart
      await existingProducts[i].addCart(existingCarts[j])
    }

    // add quanity and total price to CartProduct through table

    const existingCartProducts = await CartProduct.findAll()

    for (let i = 0; i < existingCartProducts.length; i++) {
      existingCartProducts[i].quantity = Math.floor(Math.random() * 100) + 1
      await existingCartProducts[i].save()
      existingCartProducts[i].setTotalPrice()
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
  } catch (err) {
    console.error(err.message)
  }
}

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    await addInstancesAssociations()

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
