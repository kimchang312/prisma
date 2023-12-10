
import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  findAllProducts = async () => {

    const products = await prisma.products.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  };

  findProductById = async (productId) => {
 
    const product = await prisma.products.findUnique({
      where: { id: +productId },
    });

    return product;
  };

  createProduct = async (title, description, userId) => {

    const createdProduct = await prisma.products.create({
      data: {
        title,
        description,
        UserId: userId,
      },
    });
    
    return createdProduct;
  };

  updateProduct = async (productId, title, description, status) => {
   
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

  deleteProduct = async (postId) => {
   
    const deletedProduct = await prisma.products.delete({
      where: {
        id: +postId,
      },
    });

    return deletedProduct;
  };
}