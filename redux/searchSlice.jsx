import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchBooks=createAsyncThunk(
    'search/searchBooks',
    async(searchTerm,{rejectWithValue}) =>{
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
        const response = await axios.get(`http://localhost:3000/books/search`, {
            params: { title: searchTerm.trim() }
          });
          return response.data;
        } catch(error) {
            return rejectWithValue(error.response?.data?.message || "Search Failed")
        }
    }
    
);
const searchSlice= createSlice({
    name:"search",
    initialState:{
        searchTerm:"",
        searchResult:[],
        error:"",
        loading:false
    },
       reducers:{
        setSearchTerm:(state,action)=>{
            state.searchTerm=action.payload;

        },
        clearSearchResult:(state)=>{
            state.searchResult=[],
            state.error='';
        }
       },
       extraReducers:(builder)=>{
        builder
        .addCase(searchBooks.pending,(state)=>{
            state.loading=true;
            state.error='';
        })
        .addCase(searchBooks.fulfilled,(state,action)=>{
            state.loading=false;
            if(action.payload.success) {
                state.searchResult=action.payload.data
            } else{
                state.error=action.payload.message
            }
        })
        .addCase(searchBooks.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
            state.searchResult=[];
        })
       }
})
export const{setSearchTerm,clearSearchResult}=searchSlice.actions
export default searchSlice.reducer;