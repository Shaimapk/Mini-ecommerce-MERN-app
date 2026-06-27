import { useState } from "react";
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/features/products/productsThunk";
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

  const handleChange = (e)=>{
    if(e.target.files){
      setProductData({...productData,[e.target.name]:e.target.files[0]});
    }else{
      setProductData({...productData,[e.target.name]:e.target.value});
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(addProduct(productData));
    navigate("/");
  }

  return (
    <div className="p-4 flex justify-center">
      <form  onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 w-160">
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>
        <textarea name="description" rows={7} value={productData.description} onChange={handleChange} placeholder="Product description" className="p-2 w-full rounded-md resize-none border border-gray-300 focus:border-blue-500 focus:outline-none"/>
        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Product price" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>

        <select name="category" value={productData.category} onChange={handleChange}  className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" >
         <option value="">Category</option>
          <option value="fashion">Fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="beauty">Beauty</option>
          <option value="home">Home</option>
          <option value="electronics">Electronics</option>
        </select>

        <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="No of stock" className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"/>
        <input type="file" name="image" accept="image/*" onChange={handleChange}  className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  )
}
