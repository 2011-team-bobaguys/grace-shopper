const router = require('express').Router()

const isAdminCheck = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Must be admin to do this!')
    err.status = 401
    return next(err)
  }
  next()
}
module.exports = {router, isAdminCheck}
