import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase.config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";


const initialState = {
    orders:[],
    isLoading: false,
    message:'',
    isSuccess: false,
    isError: false 
}

export const fetchOrders = createAsyncThunk('order/getAll',async(thunkAPI)=>{
    try {
        // console.log("object");
        const docRef = collection(db,'orders')

        const docSnap = await getDocs(docRef)
        // console.log(docSnap);
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

export const closeOrder = createAsyncThunk('order/close',async(id,thunkAPI)=>{
    try {
        const orderRef = doc(db,'orders',id)

        await updateDoc(orderRef,{
            status:'closed'
        })
    } catch (error) {
        const message = error.message

        return thunkAPI.rejectWithValue(message)
    }
})


export const pendingOrder = createAsyncThunk('order/pending',async(id,thunkAPI)=>{
    try {
        const orderRef = doc(db,'orders',id)

        await updateDoc(orderRef,{
            status:'pending'
        })
        // fetchOrders()
    } catch (error) {
        const message = error.message

        return thunkAPI.rejectWithValue(message)
    }
})
// export const createCart = createAsyncThunk('order/cart', async(thunkAPI)=>{

//     const cartItems = [
//         {
//             name: 'Blue Shirt',
//             size: 'm',
//             quantity: 3
//         },
//         {
//             name: 'Red Shirt',
//             size: 'l',
//             quantity: 2
//         },
//         {
//             name: 'Green Shirt',
//             size: 'm',
//             quantity: 1
//         },
//         {
//             name: 'Blue Shirt',
//             size: 'm',
//             quantity: 4
//         }
//     ]
//     try {
//         await addDoc(collection(db,'carts'),{
//             items:cartItems
//         })
//     } catch (error) {
//         const message = error.message

//         console.log(message);
//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const orderslice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        reset:(state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchOrders.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchOrders.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchOrders.fulfilled,(state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(closeOrder.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(closeOrder.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(closeOrder.fulfilled,(state)=>{
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(pendingOrder.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(pendingOrder.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(pendingOrder.fulfilled,(state)=>{
                state.isLoading = false
                state.isSuccess = true
            })
    }
})

export const {reset} = orderslice.actions

export default orderslice.reducer