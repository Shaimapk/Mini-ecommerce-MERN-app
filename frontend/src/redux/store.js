import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice"
import userReducer from "./features/user/userSlice"
import cartReducer from "./features/cart/cartSlice"


const store = configureStore({
    reducer:{
        products:productsReducer,
        user:userReducer,
        cart:cartReducer
    }
})

export default store;