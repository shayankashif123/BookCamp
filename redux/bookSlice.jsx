import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchData = createAsyncThunk(
    'book/fetchData',
    async(id,{rejectWithValue}) =>{
        try{
            const response=await axios.get (`http://localhost:3000/book/${id}`);
            return response.data.data.data; 
        } catch(error) {
            return rejectWithValue(error.response?.data?.message || "Fetch failed")
        }
    }   
);
const bookSlice = createSlice({
    name:"book",
    initialState:{
        selectedBook:null
    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(fetchData.pending,(state)=>{
            state.selectedBook=null;
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
                state.selectedBook=action.payload
        })
        .addCase(fetchData.rejected,(state)=>{
            state.selectedBook=null;
        })
    }
})
export default bookSlice.reducer;