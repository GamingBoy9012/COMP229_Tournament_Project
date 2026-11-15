import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/')
  .post(userCtrl.create)
  .get(userCtrl.list) // List all users (GET request)
  .delete(authCtrl.requireSignin, userCtrl.removeAll)

router.route('/:userId')
  .get(userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
 // Delete all users (DELETE request)
router.param('userId', userCtrl.userByID)

export default router