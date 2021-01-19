const router = require('express').Router()
const {User} = require('../db/models')
const {isAdminCheck} = require('./isAdmin')
module.exports = router

// TODO: when a non-admin tries to access admin routes, error message returns 'Cannot read property 'isAdmin' of undefined' instead of 'Must be admin to do this!'

// GET /api/users -- admin view of all users
router.get('/', isAdminCheck, async (req, res, next) => {
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

// GET /api/users/:userId -- admin view of one user
router.get('/:userId', isAdminCheck, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/users/:userId -- admin banhammer :-/
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
