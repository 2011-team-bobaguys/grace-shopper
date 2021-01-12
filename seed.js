const {green, red} = require('chalk')
const {db, Product, User, Artist,Cart } = require('./server/db')



const seed = async () => {
  try {
    await db.sync({force: true})

    const cart1 = await Cart.create({userId:1})

    const Soup = await Product.create({
      {title: `Andy Warhol's Famous Soup`,
        genre: 'pop',
        price:50000,
        medium: 'painting',
      })

    for (let i = 0; i <= 50; i++) {
      await Product.create({
        {title: `Andy Warhol Monroe ${i}`,
          genre: 'pop',
          price:5000 - i,
          medium: 'painting',
        })
    }
    const Andy = await Artist.create({name:"Andy Warhol"})
    Soup.addArtist(Andy)


  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch((err) => {
      console.error(red('Oh no! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
