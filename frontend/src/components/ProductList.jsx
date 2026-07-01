import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/features/products/productsThunk";

export default function ProductList() {

    const { products } = useSelector((state)=>state.products);
    const dispatch = useDispatch();
    const API_URL= 'http://localhost:5000';
    
    

    useEffect(()=>{
        dispatch(fetchProducts());
    },[]);

  return (
    <div>
        <h1>Products</h1>
        <div className="m-4 grid lg:grid-col-4 md:grid-cols-3 grid-col-1">
            {products.map((product)=>(
                <div key={product.id} className="border-0 rounded-lg m-4 p-4 shadow-xl">
                    
                    <img src={`${API_URL}/uploads/${product.image}`} alt={product.name} className="w-48 h-48 object-cover rounded-2xl" />
                    <h3 className="font-bold text-xl ">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="font-medium text-lg">₹{product.price}</p>

                </div>
            ))}
        </div>
    </div>
  )
}
