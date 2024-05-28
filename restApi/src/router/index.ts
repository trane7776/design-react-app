import express from 'express';
import authentication from './authentication';
import users from './users';
import designs from './designs';
import comments from './comments';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  designs(router);
  comments(router);
  return router;
};
