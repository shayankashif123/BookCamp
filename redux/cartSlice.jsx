import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:JSON.parse(localStorage.getItem("cart"))|| [],
        totalAmount:JSON.parse(localStorage.getItem("totalAmount"))|| 0
    },
    reducers:{
        addToCart:(state,action)=>{
            const item = action.payload;
            const existingItem=state.items.find(cartItem=> cartItem._id===item._id);
            if(existingItem) {
                existingItem.quantity+=1
            } else{
                state.items.push({...item,quantity:1})
            }
            state.totalAmount= state.items.reduce((total,item)=> total + item.price* item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state.items))
            localStorage.setItem('totalAmount',JSON.stringify(state.totalAmount))
        },
        removeItems:(state,action)=>{
            const id = action.payload;
            state.items=state.items.filter(item=>item._id!=id);
            state.totalAmount=state.items.reduce((total,item)=> total + item.price * item.quantity,0);
            localStorage.setItem("cart",JSON.stringify(state.items))
            localStorage.setItem("totalAmount",JSON.stringify(state.totalAmount));

        }
    }
})
export const {addToCart,removeItems} =cartSlice.actions
export default cartSlice.reducer 