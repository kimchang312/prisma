
import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productsRepository = new ProductsRepository();

  findAllProducts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const products = await this.productsRepository.findAllProducts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return products.map((post) => {
      return {
        id: products.id,
        title: products.title,
        description: products.description,
        status : products.status,
        userId : products.userId,
        //
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      };
    });
  };

  findProductById = async (productId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const product = await this.productsRepository.findProductById(productId);

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      status: product.status,
      //
      userId: product.userId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  createProduct = async (title, description,userId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdProduct = await this.productsRepository.createProduct(
      title,
      description,
      userId,
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      title: createdProduct.title,
      description: createdProduct.description,
      userId: createdProduct.userId,
    };
  };

  updateProduct = async (productId,title, description, status) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const product = await this.productsRepository.findPostById(productId);
   
    await this.productsRepository.updateProduct(title, description, status);

    // 변경된 데이터를 조회합니다.
    const updatedProduct = await this.productsRepository.findProductById(productId);

    return {
      title: updatedProduct.title,
      description: updatedProduct.description,
      status: updatedProduct.status,
    };
  };

  deleteProduct = async (productId) => {
    const product = await this.productsRepository.findProductById(productId);
 
    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.productsRepository.deleteProduct(productId);

    return {
      id: product.id,
    };
  };
}