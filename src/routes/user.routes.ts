import express from 'express';
import usersController from '../controllers/users.controller';

const router = express.Router();

router.route('/api/users')
    .get(usersController.list)
    .post(usersController.create);

router.route('/api/users/:userId')
    .get(usersController.read)
    .put(usersController.update)
    .delete(usersController.remove)

router.param('userId', usersController.userById)

export default router;