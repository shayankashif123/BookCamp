import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import searchReducer from "./searchSlice"
import bookReducer from "./bookSlice"
import purchaseReducer from "./purchaseSlice"
export const store = configureStore({
    reducer:{
        cart:cartReducer,
        search:searchReducer,
        book:bookReducer,
        purchase:purchaseReducer
    }
});