import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-orange-700 p-4 text-white">
        <div className="flex gap-6">
            <Link to='/'>Home</Link>
            <Link to='/add-product'>Add Product</Link>
        </div>
        
    </nav>
  )
}
