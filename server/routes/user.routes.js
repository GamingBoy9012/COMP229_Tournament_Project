import express from 'express'
import userCtrl from '../controller/User.controller.js'
import authCtrl from '../controller/auth.controller.js'

const router = express.Router()

// ADD THIS LINE to handle POST requests for user creation (Sign Up)
router.route('/api/users')
  .post(userCtrl.create)
  .get(userCtrl.list) // List all users (GET request)
  .delete(authCtrl.requireSignin, userCtrl.removeAll)

router.route('/api/users/:userId')
  .get(userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
 // Delete all users (DELETE request)
router.param('userId', userCtrl.userByID)

export default router