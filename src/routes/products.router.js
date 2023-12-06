import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
//import { needSignin } from '../middlewares/need-signin.middleware.js';
//needSignin추가

const router = express.Router();

const productsController= new ProductsController();

router.get("/",productsController.getProducts);

router.get("/:productId",productsController.getProductById);

router.post("/",productsController.createProduct)

router.put("/:productId",productsController.updateProduct);

router.delete("/:productId",productsController.deleteProduct);

export default router;