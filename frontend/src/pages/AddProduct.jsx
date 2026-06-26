import { useState } from "react";
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/features/products/productsThunk";

export default function AddProduct() {


  const dispatch = useDispatch();

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
  }

  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name"/>
        <input type="text" name="description" value={productData.description} onChange={handleChange} placeholder="Product description"/>
        <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Product price"/>

        <select name="category" value={productData.category} onChange={handleChange}>
         <option value="">Category</option>
          <option value="fashion">Fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="beauty">Beauty</option>
          <option value="home">Home</option>
          <option value="electronics">Electronics</option>
        </select>

        <input type="text" name="category" value={productData.category} onChange={handleChange} placeholder="category"/>
        <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="No of stock"/>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  )
}
