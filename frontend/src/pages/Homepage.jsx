import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { fetchProducts } from "../redux/features/products/productsThunk";
import { useDispatch } from "react-redux";

export default function Homepage() {


  const [search,setSearch]=useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    const timer = setTimeout(()=>{
      dispatch(fetchProducts(search));
    },500);
    return()=> clearTimeout(timer);
  },[search,dispatch]);

  return (
    <div className="p-4">

      <div className="flex gap-4 items-center justify-between">
        <input type="text" placeholder="search here..." onChange={(e)=>setSearch(e.target.value)} className="border corder-gray-300 rounded-md px-4 py-2"/>
        <select name="category">
          <option value="">Category</option>
          <option value="electronics">Fashion</option>
          <option value="fashion">Electronics</option>
          <option value="books">Books</option>
        </select>
          <select name="sort">
            <option value="">Sort by:</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
      </div>
      
      <ProductList />
    </div>
  )
}
