import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../../api/axios'

export const userRegister = createAsyncThunk(
    "user/register",
    async (loginData,thunkAPI)=>{
        try {
            const response = await api.post('/user/register/',loginData,{withCredentials:true});
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
)
export const userLogin = createAsyncThunk(
    "user/login",
    async (loginData,thunkAPI)=>{
        try {
            const response = await api.post('/user/login/',loginData,{withCredentials:true});
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
            
            
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    "user/currentUser",
    async(_,thunkAPI)=>{
        try {
            const response = await api.get('/user/me',{ withCredentials:true });
            return response.data;
        } catch (error) {
            if(error.response?.status===401){
                return thunkAPI.rejectWithValue(null);
            }
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Unauthorized")
        }
    }
)

export const userLogout = createAsyncThunk(
    "user/logout",
    async(_,thunkAPI)=>{
        try {
            const response = await api.post('/user/logout',{},{withCredentials:true});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);