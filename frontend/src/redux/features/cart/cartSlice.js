import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[]
    },
    reducers:{
        addToCart(state,action){
            const item = action.payload;

            const existingItem = state.cartItems.find((product)=>product._id===item._id);
            if(existingItem) existingItem.quantity += 1;
            else{
                state.cartItems.push({
                    ...item,
                    quantity:1
                })
            }
        }
    }
})
export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;