import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = express.Router();

const productsController= new ProductsController();

router.get("/",productsController.getProducts);

router.get("/:productId",productsController.getProductById);

router.post("/",needSignin,productsController.createProduct)

router.put("/:productId",needSignin,productsController.updateProduct);

router.delete("/:productId",needSignin,productsController.deleteProduct);

export default router;