import { useSelector } from "react-redux"


export default function Cart() {


    const {cartItems} = useSelector((state)=>state.cart)

  return (
    <div>
        {cartItems.map((item)=>(
            <div key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
            </div>
        ))}
    </div>
  )
}
