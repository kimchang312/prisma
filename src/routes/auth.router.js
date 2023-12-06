import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';


const router = express.Router();

const authController= new AuthController();

router.post("/signup",authController.signupUser);

router.post("/signin",authController.singninUser)


export default router;
