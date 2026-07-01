import { useState } from "react";
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/features/products/productsThunk";
import { useNavigate } from "react-router-dom"

export default function AddProduct() {


  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [productData,setProductData]=useState({
    name:"",
    description:"",
    price:"",
    category:"",
    stock:"",
    image:null
  });
  const [previewURL,setPreviewURL]=useState(null);
  const [errors,setErrors]=useState({});

  const validate = ()=>{
    const newErrors={}
    if(productData.name.trim() === '') newErrors.name='Please enter the product name'
    if(productData.description.trim()==='') newErrors.description="Please enter the description"
    if(productData.price==='' || productData.price < 0) newErrors.price="Enter a valid price"
    if(productData.category==='') newErrors.category="Select a category"
    if(productData.stock==='' || productData.stock<0) newErrors.stock="Please enter a valid no. of stocks"
    if(productData.image===null) newErrors.image="Please upload product image"
    setErrors(newErrors);
    return(Object.keys(newErrors).length===0)
  }

  const handleChange = (e)=>{
    setErrors((prev)=>({...prev,[e.target.name]:''}));
    if(e.target.files){
      setProductData({...productData,[e.target.name]:e.target.files[0]});
      setPreviewURL(URL.createObjectURL(e.target.files[0]));
    }else{
      setProductData({...productData,[e.target.name]:e.target.value});
    }
    
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!validate()) return;
    try{
      await dispatch(addProduct(productData)).unwrap();
      navigate("/");
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="p-4 flex justify-center">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-160">
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>
        {errors.name &&
          <p className="text-red-500 text-sm">{errors.name}</p>
        }

        <textarea name="description" rows={7} value={productData.description} onChange={handleChange} placeholder="Product description" className="p-2 w-full rounded-md resize-none border border-gray-300 focus:border-blue-500 focus:outline-none"/>
        {errors.description &&
          <p className="text-red-500 text-sm">{errors.description}</p>
        }

        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Product price" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>
        {errors.price &&
          <p className="text-red-500 text-sm">{errors.price}</p>
        }

        <select name="category" value={productData.category} onChange={handleChange}  className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" >
         <option value="">Category</option>
          <option value="fashion">Fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="beauty">Beauty</option>
          <option value="home">Home</option>
          <option value="electronics">Electronics</option>
        </select>
        {errors.category &&
          <p className="text-red-500 text-sm">{errors.category}</p>
        }

        <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="No of stock" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>
        {errors.stock &&
          <p className="text-red-500 text-sm">{errors.stock}</p>
        }

        <input type="file" name="image" accept="image/*" onChange={handleChange}  className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
        {previewURL && <div className="flex justify-center">
          <img src={ previewURL } alt="" className="w-48 h-48 rounded-lg border border-gray-300"/>
        </div>}
        {errors.image &&
          <p className="text-red-500 text-sm">{errors.image}</p>
        }
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  )
}
