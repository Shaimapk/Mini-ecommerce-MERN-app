import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice"
import userReducer from "./features/user/userSlice"


const store = configureStore({
    reducer:{
        products:productsReducer,
        user:userReducer
    }
})

export default store;