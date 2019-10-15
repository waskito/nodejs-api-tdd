const router = require('express').Router()
const auth = require('../middleware/auth')
const UserController = require('../controllers/UserController')

router.get('/users', UserController.index)
router.post('/users', UserController.store)
router.patch('/users', auth, UserController.update)
router.delete('/users/:id', auth, UserController.delete)
router.post('/users/login', UserController.login)
router.get('/users/me', auth, UserController.me)
router.post('/users/me/logout', auth, UserController.logout)

module.exports = router