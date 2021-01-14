const router = require('express').Router()
const {User} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// PUT /api/users/:userId
router.put('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/users/:userId
router.delete('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
