
import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  findAllProducts = async () => {

    const products = await prisma.products.findMany();

    return products;
  };

  findProductById = async (productId) => {
 
    const product = await prisma.products.findUnique({
      where: { productId: +productId },
    });

    return product;
  };

  createProduct = async (title, description, userId) => {

    const createdProduct = await prisma.products.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return createdProduct;
  };

  updatePost = async (productId, title, description, status) => {
   
    const updatedProduct = await prisma.products.update({
      where: {
        id: +productId,
      },
      data: {
        title,
        description,
        status,
      },
    });

    return updatedProduct;
  };

  deletePost = async (postId) => {
   
    const deletedProduct = await prisma.products.delete({
      where: {
        id: +postId,
      },
    });

    return deletedProduct;
  };
}