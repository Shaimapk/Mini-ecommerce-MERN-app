import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Homepage from './pages/user/Homepage'
import AddProduct from './pages/admin/AddProduct';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/user/Cart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/features/user/userThunk";
import EditProduct from "./pages/admin/EditProduct";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCurrentUser());
  },[dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/edit-product/:id' element={<EditProduct />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;