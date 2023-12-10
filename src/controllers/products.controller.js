import { ProductsService } from '../services/products.service.js';

export class ProductsController{
  productsService=new ProductsService();

    getProducts=async (req,res,next)=>{
        try{
            const product =await this.productsService.findAllProducts();
            return res.status(200).json({
              success: true,
              message: '상품 목록 조회에 성공했습니다.',
              data: product,
            });
        } catch (err) {
      next(err);
    }
    };

    getProductById =async(req,res,next)=>{
      try{
        const {productId}=req.params;
        const product = await this.productsService.findProductById(productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: '상품 조회에 실패했습니다.',
          });
        }
    
        return res.status(200).json({
          success: true,
          message: '상품 목록 조회에 성공했습니다.',
          data: product,
        });
      }catch(err){
        next(err);
      }
    };

    createProduct =async(req,res,next)=>{
      try{
        const { id: userId, name: userName } = req.user;
        const { title, description } = req.body;
       
        if (!title) {
          return res.status(400).json({
            success: false,
            message: '제목 입력이 필요합니다.',
          });
        }
    
        if (!description) {
          return res.status(400).json({
            success: false,
            message: '설명 입력이 필요합니다.',
          });
        }
  
        const createdProduct = await this.productsService.createProduct(
          title,
          description,
          userId,
        );
        return res.status(201).json({ 
          success: true,
          message: '상품 생성에 성공했습니다.',
          data: { ...createdProduct, userName },
        });
      }catch(err){
        next(err);
      }
    };

    updateProduct = async(req,res,next)=>{
      try{
      
        const {productId}=req.params;
        const { title, description, status } = req.body;
        const { id: userId, name: userName } = req.user;
   
        if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
      });
    }
    
    const isValidStatus = status
      ? status === 'FOR_SALE' || status === 'SOLD_OUT'
      : true;

    if (!isValidStatus) {
      return res.status(400).json({
        success: false,
        message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
      });
    }

    const product = await this.productsService.findProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: '상품 조회에 실패했습니다.',
      });
    }

    const isProductOwner = product.userId === userId;
    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 수정 권한이 없습니다.',
      });
    }

        const updatedProduct=await this.productsService.updateProduct(
          productId,
          title,
          description,
          status,
        );
        
          return res.status(200).json({
          success: true,
          message: '상품 수정에 성공했습니다.',
          data: updatedProduct,
    });
      }catch(err){
        next(err);
      }
    };

    deleteProduct=async(req,res,next)=>{
      try {
        const {productId}=req.params;
        const { id: userId, name: userName } = req.user;

        const product = await this.productsService.findProductById(productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: '상품 조회에 실패했습니다.',
          });
        }

        const isProductOwner = product.userId === userId;

    if (!isProductOwner) {
      return res.status(403).json({
        success: false,
        message: '상품 삭제 권한이 없습니다.',
      });
    }

        const deletedProduct=await this.productsService.deleteProduct(productId)
        return res.status(200).json({
      success: true,
      message: '상품 삭제에 성공했습니다.',
      data: deletedProduct,
    });
      }catch(err){
        next(err)
      }
    };

}