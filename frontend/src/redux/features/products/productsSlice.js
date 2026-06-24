import { createSlice } from "@reduxjs/toolkit";
import {fetchProducts,addProduct} from "./productsThunk";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        loading:false,
        error:null
    },

    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.loading = true;
                state.error=null;
            })
            .addCase(fetchProducts.fulfilled, (state,action)=>{
                state.loading = false;
                state.products=action.payload;
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
            })
            .addCase(addProduct.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(addProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
    }
    

})

export default productSlice.reducer;