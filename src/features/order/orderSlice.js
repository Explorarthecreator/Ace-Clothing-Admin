import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";


const initialState = {
    orders:[],
    isLoading: false,
    message:'',
    isSuccess: false,
    isError: false 
}

export const fetchOrders = createAsyncThunk('order/getAll',async(thunkAPI)=>{
    try {
        console.log("object");
        const docRef = collection(db,'orders')

        const docSnap = await getDocs(docRef)
        console.log(docSnap);
        let orders = []

        docSnap.forEach((doc)=>{
            orders.push({
                id: doc.id,
                data: doc.data()
            })
        })

        console.log(orders);
        return orders
    } catch (error) {
        const message = 'Error getting details'

        console.log(error.message);
        return thunkAPI.rejectWithValue(message)
    }
})

export const orderslice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.message = ''
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchOrders.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchOrders.rejected,(state,action)=>{
                state.isLoading=false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchOrders.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
    }
})

export const {reset} = orderslice.actions

export default orderslice.reducer