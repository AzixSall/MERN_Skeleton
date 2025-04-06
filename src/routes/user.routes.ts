import express from 'express';
import usersController from '../controllers/users.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users')
    .get(usersController.list)
    .post(usersController.create);

router.route('/api/users/:userId')
    .get(authController.requireSignin, usersController.read)
    .put(authController.requireSignin, authController.hasAuthorization, usersController.update)
    .delete(authController.requireSignin, authController.hasAuthorization, usersController.remove)

router.param('userId', usersController.userById)

export default router;