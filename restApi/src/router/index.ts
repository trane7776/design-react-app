import express from 'express';
import authentication from './authentication';
import users from './users';
import designs from './designs';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  designs(router);
  return router;
};
