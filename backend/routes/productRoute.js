import express from 'express'
import { createProduct, getProducts,deleteProduct,updateProduct } from '../controllers/productController.js';
import fileUpload from '../config/fileUpload.js'

const router = express.Router();

router.post('/',fileUpload.single("image"),createProduct); //image from form <input type="file" name="image" /> 
router.get('/',getProducts);
router.delete('/:id',deleteProduct);
router.put('/:id',fileUpload.single("image"), updateProduct);

export default router;