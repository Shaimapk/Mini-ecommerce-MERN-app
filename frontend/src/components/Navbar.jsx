import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {

  const {user} = useSelector((state)=>state.user);
  const role = user?.role
  return (
    <nav className="bg-orange-700 p-4 text-white flex justify-between">
        <div className="flex gap-6">
            <Link to='/'>Home</Link>
            {role==='admin'?
            <Link to='/add-product'>Add Product</Link>:
            <Link to='/cart'>Go to cart</Link>
            }
        </div>
        <div>
          {user?
          <p>Hello, {user.username}</p> :
          <Link to='/login'>Login</Link>
          }
        </div>
        
    </nav>
  )
}
