import { useSelector } from "react-redux"


export default function Cart() {


    const {cartItems} = useSelector((state)=>state.cart)

  return (
    <div className="w-full">
        {cartItems.length >0 && 
            <div>
                <div className="flex my-5 mx-10 text-xl font-bold border-b p-4">
                    <h2 className="w-1/2">Items</h2>
                    <h2 className="w-1/4 text-center">Price</h2>
                    <h2 className="w-1/4 text-center">Qty</h2>
                </div>
                {cartItems.map((item)=>(
                    <div key={item.id} className="flex my-5 mx-10 border-b p-4 border-b-gray-300 shadow-black " >
                        <h3 className="w-1/2">{item.name}</h3>
                        <p className="w-1/4 text-center">{item.price}</p>
                        <p className="w-1/4 text-center">{item.quantity}</p>
                    </div>
                ))}
            </div>
        }

        {cartItems.length === 0 && 
            <div>
                <p className="m-5 text-lg">Your cart is empty.</p>
            </div>
        }
        
    </div>
  )
}
