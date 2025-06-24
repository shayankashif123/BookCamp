import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const handlePurchase = createAsyncThunk(
    "book/purchase",
    async({id,quantity},{rejectWithValue})=>{
        try {
        const response =  await axios.post(`http://localhost:3000/purchase/${id}`,{quantity});
        return response.data.data.data;
    } catch(error) {
        return rejectWithValue(error.response?.data?.message || "Purchase failed")
    }
}
)
export const handleMultiplePurchase=createAsyncThunk(
    "books/purchase",
    async(books,{rejectWithValue})=>{
        try{
            const response= await axios.post(`http://localhost:3000/multiplePurchase`, { books });
            return response.data.data.data;
        } catch(error) {
            return rejectWithValue(error.response?.data?.message || "Purchase failed")
        }
    }
)
const purchaseSlice=createSlice({
    name:'purchase',
    initialState:{
      purchaseBook:null,
      multiplePurchaseBook:[],
    },
    extraReducers: (builder)=>{
        builder
        .addCase(handlePurchase.pending,(state)=>{
            state.purchaseBook=null;
        })
        .addCase(handlePurchase.fulfilled,(state,action)=>{
                state.purchaseBook=action.payload.data
        })
        .addCase(handlePurchase.rejected,(state)=>{
            state.purchaseBook=null;
        })
        .addCase(handleMultiplePurchase.pending,(state)=>{
            state.multiplePurchaseBook=[];
        })
        .addCase(handleMultiplePurchase.fulfilled,(state,action)=>{
             state.multiplePurchaseBook=action.payload
        })
        .addCase(handleMultiplePurchase.rejected,(state)=>{
            state.multiplePurchaseBook=[];
        })
    }
})
export default purchaseSlice.reducer
