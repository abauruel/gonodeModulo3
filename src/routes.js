const express = require('express')
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controller/UserControllers')
const SessionController = require('./app/controller/SessionController')

routes.post('/users', UserController.store)

routes.post('/session', SessionController.store)

routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
