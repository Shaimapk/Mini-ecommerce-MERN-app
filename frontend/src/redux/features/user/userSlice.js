import { createSlice } from "@reduxjs/toolkit";
import { userRegister,userLogin } from "./userThunk.js";

const userSlice = createSlice({
    name: "user",
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:""
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(userRegister.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(userRegister.fulfilled,(state,action)=>{
                state.loading=false;
                state.user =action.payload.user;
                state.message=action.payload.message;
                state.error=null;
            })
            .addCase(userRegister.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(userLogin.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(userLogin.fulfilled,(state,action)=>{
                state.loading=false;
                state.user =action.payload.user;
                state.message=action.payload.message;
                state.error=null;
            })
            .addCase(userLogin.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
    }
})
export default userSlice.reducer;