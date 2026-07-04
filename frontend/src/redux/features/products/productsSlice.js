import { createSlice } from "@reduxjs/toolkit";
import {fetchProducts,addProduct, deleteProduct, updateProduct} from "./productsThunk";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        totalPages:0,
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
                state.products=action.payload.products;
                state.totalPages = action.payload.totalPages;
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
            .addCase(deleteProduct.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.products=state.products.filter((product)=>product._id !== action.payload);
                state.loading=false;
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(updateProduct.pending,(state)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.error=null;

                const index = state.products.findIndex((product)=> product._id === action.payload._id);

                state.products[index]=action.payload;
            })
            .addCase(updateProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            } )
            
    }
    

})

export default productSlice.reducer;