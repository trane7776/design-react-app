import express from 'express';

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';
import { getUserById } from 'db/users';
export default (router: express.Router) => {
  router.get('/users', getAllUsers);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
  router.get('/users/:id', getUser);
};
