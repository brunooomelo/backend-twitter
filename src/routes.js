const express = require('express')
const handle = require('express-async-handler')
const routes = express.Router()

const authMiddle = require('./app/middlewares/auth')
const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')
const TweetController = require('./app/controllers/TweetController');
const LikeController = require('./app/controllers/LikeController');


routes.post('/user', handle(userController.store))
routes.post('/session', handle(sessionController.store))

routes.use(authMiddle)

routes.get('/tweets', TweetController.index)
routes.post('/tweets', TweetController.store)
routes.post('/likes/:id', LikeController.store)

module.exports = routes
