import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";


const initialState = {
    cart:{},
    isLoading:false,
    isError: false,
    isSuccess: false,
    message: null
}

export const fetchCart = createAsyncThunk('cart/getOne',async(id,thunkAPI)=>{
    try {
        const docRef = doc(db,'carts',id)
        const docSnap = await getDoc(docRef)

        console.log(docSnap.data());
        return docSnap.data()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers :{
        reset:(state)=> initialState
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCart.pending,(state)=>{
                state.isLoading = true 
            })
            .addCase(fetchCart.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchCart.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.cart = action.payload
            })
    }
})

export const  {reset} = CartSlice.actions
export default CartSlice.reducer