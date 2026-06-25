import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/features/products/productsThunk";

export default function ProductList() {

    const {products} = useSelector((state)=>state.products);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());
    },[]);

  return (
    <div>
        <h1>Products</h1>
        <div className="m-4 grid lg:grid-col-4 md:grid-cols-3 grid-col-1">
            {products.map((product)=>(
                <div key={product.id} className="border rounded-lg m-4 p-4 shadow-md">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    
                </div>
            ))}
        </div>
    </div>
  )
}
