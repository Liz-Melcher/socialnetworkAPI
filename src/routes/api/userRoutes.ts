import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
  .get(getAllUsers)     // GET all users
  .post(createUser);     // POST create a new user

// /api/users/:userId
router.route('/:userId')
  .get(getUserById)      // GET single user (with thoughts and friends)
  .put(updateUser)       // PUT update user
  .delete(deleteUser);   // DELETE user and their thoughts

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)       // POST add friend
  .delete(removeFriend); // DELETE remove friend

export default router;
