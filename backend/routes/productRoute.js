import express from 'express'
import { createProduct, getProducts } from '../controllers/productController.js';
import fileUpload from '../config/fileUpload.js'

const router = express.Router();

router.post('/',fileUpload.single("image"),createProduct); //image from form <input type="file" name="image" /> 
router.get('/',getProducts);

export default router;