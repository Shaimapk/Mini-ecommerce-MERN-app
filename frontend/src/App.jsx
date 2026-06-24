import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import Homepage from './pages/Homepage'
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/add-product' element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;