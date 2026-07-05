import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts,deleteProduct } from "../redux/features/products/productsThunk";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom"

export default function ProductList() {

    const { products } = useSelector((state)=>state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user }= useSelector((state)=>state.user);
    
    const handleDelete = (id)=>{
       if(window.confirm('Are you sure you want to delete the product?')){
            dispatch(deleteProduct(id));
       }
    }
    

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

  return (
    <div>
        <h1>Products</h1>
        <div className="m-4 grid lg:grid-col-4 md:grid-cols-3 grid-col-1">
            {products.map((product)=>(
                <div key={product._id} className="border-0 rounded-lg m-4 p-4 shadow-xl">
                    
                    <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-2xl" />
                    <h3 className="font-bold text-xl ">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="font-medium text-lg">₹{product.price}</p>

                    {user?.role==='admin' &&
                        <div className="flex gap-4">
                            <button onClick={()=>navigate(`/edit-product/${product._id}`)}  className="text-white bg-blue-500 hover:cursor-pointer p-2 border-0 rounded-lg mt-2">Edit</button>
                            <button onClick={()=>handleDelete(product._id)}  className="text-white bg-blue-500 hover:cursor-pointer p-2 border-0 rounded-lg mt-2">Delete</button>
                        </div>
                    }
                    {user?.role==='user' &&
                    <button onClick={()=>dispatch(addToCart(product))} className="text-white bg-blue-500 hover:cursor-pointer p-2 border-0 rounded-lg mt-2">Add to cart</button>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}
