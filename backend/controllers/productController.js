import Product from '../models/productModel.js'

export const createProduct = async (req,res)=>{
    try {
        const {name,description,price,category,stock}=req.body;
        const image = req.file.filename;
        const product = await Product.create({
            name,description,price,category,stock,image
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            "message":error.message
        })
    }
}

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}