
import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  findAllProducts = async () => {
   
    const products = await this.productsRepository.findAllProducts();

    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return products.map((post) => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        status : post.status,
        userId : post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findProductById = async (productId) => {
   
    const product = await this.productsRepository.findProductById(productId);

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      status: product.status,
      userId: product.UserId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  createProduct = async (title, description,userId) => {
  
    const createdProduct = await this.productsRepository.createProduct(
      title,
      description,
      userId,
    );
  
    return {
      title: createdProduct.title,
      description: createdProduct.description,
      userId: createdProduct.userId,
    };
  };

  updateProduct = async (productId,title, description, status) => {
    
    const updatedProduct=await this.productsRepository.updateProduct(productId,title, description, status);
    
    //const updatedProduct = await this.productsRepository.findProductById(productId);
    
    return {
      title: updatedProduct.title,
      description: updatedProduct.description,
      status: updatedProduct.status,
    };
  };

  deleteProduct = async (productId) => {
    const product = await this.productsRepository.findProductById(productId);
 
  
    await this.productsRepository.deleteProduct(productId);

    return {
      id: product.id,
    };
  };
}