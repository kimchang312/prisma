import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
//import { needSignin } from '../middlewares/need-signin.middleware.js';
//needSignin추가

const router = express.Router();

const usersController= new UsersController();

router.get("/me",usersController.getUser);

export default router;