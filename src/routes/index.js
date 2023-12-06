import express from 'express';
import productsRouter from './products.router.js';
import usersRouter from "./users.router.js"
import authRouter from "./auth.router.js"

const router = express.Router();

router.use('/products', productsRouter);
router.use("/users",usersRouter);
router.use("/auth",authRouter);

export default router;
