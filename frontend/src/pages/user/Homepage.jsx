import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import { fetchProducts } from "../../redux/features/products/productsThunk";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {


  const [search,setSearch]=useState('');
  const [category,setCategory]=useState('');
  const [sort,setSort]=useState('');

  const dispatch = useDispatch();
  const totalPages = useSelector((state)=>state.products.totalPages);

  const [page,setPage]=useState(1);
    
    const pageButtons = [];
    for(let i=1; i<=totalPages;i++){
        pageButtons.push(
            <button 
              onClick={()=>{
                setPage(i);
                window.scroll({
                  top:0,
                  behavior:"smooth"
                })
              }} 
              className={`${page===i? "text-purple-500": "text-blue-500 cursor-pointer border rounded-full px-2 py-0.5"}`}
            >{i}</button>
        )
    }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      dispatch(fetchProducts({keyword:search,category,sort,page}));
    },500);
    return()=> clearTimeout(timer);
  },[search,category,sort,page,dispatch]);

  return (
    <div className="p-4">

      <div className="flex gap-4 items-center justify-between">

        <input type="text" placeholder="search here..." onChange={(e)=>setSearch(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 w-1/2"/>
        
        <select name="category" value={category} onChange={(e)=>setCategory(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-lg w-50">
          <option value="">Category</option>
          <option value="fashion">Fashion</option>
          <option value="mobiles">Mobiles</option>
          <option value="beauty">Beauty</option>
          <option value="home">Home</option>
          <option value="electronics">Electronics</option>
        </select>
        
        <select name="sort" value={sort} onChange={(e)=>setSort(e.target.value)} className="border border-gray-300 px-4 py-2 rounded-lg w-50">
          <option value="">Sort by:</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
      
      <ProductList />
      <p className="flex justify-center gap-20">{pageButtons}</p>
    </div>
  )
}
