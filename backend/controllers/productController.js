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
        const {keyword='',category='',sort='',page=''}=req.query;

        const query={}

        if(keyword){
            query.name={
                $regex:keyword,
                $options:"i"
            }
        }
        if(category){
            query.category = category
        }

        let sortOption={};

        if(sort==='priceLowToHigh'){
            sortOption.price=1; //ascending order
        }
        else if(sort==='priceHighToLow') {
            sortOption.price=-1; //descending order
        }

        const limit = 6; //products per page
        const skip = (page-1)*limit;

        const totalProducts = await Product.countDocuments(query);
        const totalPages= Math.ceil(totalProducts/limit);

        const products = await Product.find(query).sort(sortOption).skip(skip).limit(limit);
        res.status(200).json({ products, totalPages });

        
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

export const deleteProduct = async (req,res) =>{
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: 'product deleted succeesfully'});
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;

    const updateData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};