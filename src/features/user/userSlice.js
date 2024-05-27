import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

// const auth = getAuth()
// console.log(auth);
const initialState = {
    user: [],
    singleUser:{},
    isLoading: false,
    message:'',
    isSuccess: false,
    isError: false ,
    updateSucess:false,
    updateError:false,
    id:'',
    adminStatus: false
}

export const checkAdminStatus = createAsyncThunk('auth/adminStatus',async(id,thunkAPI)=>{
    try {
        const userRef = doc(db,'users',id)
        const querySnap = await getDoc(userRef)

        if(querySnap.data().isAdmin){
            return true
        }else{
            return false
        }
    } catch (error) {
        
    }
})
export const fetchUsers = createAsyncThunk('user/getAll',async(id,thunkAPI)=>{
    try {
        const userRef = doc(db,'users', id) 

        const querySnap = await getDoc(userRef)
        if(querySnap.data().isAdmin){
            const docRef = collection(db,'users')
            const docSnap = await getDocs(docRef)

            let users = []

            docSnap.forEach((user)=>{
                users.push({
                    id:user.id,
                    data: user.data()
                })
            })
            // console.log(users);
            return users
        }else{
            throw new Error ('You are not authorised to view this page')
        }
    } catch (error) {
        const message = error.message

        // console.log(error.message);
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchUser = createAsyncThunk('user/getOne',async(id,thunkAPI)=>{
    try {
        const docRef = doc(db,'users',id)

        const docSnap = await getDoc(docRef)

        return docSnap.data()
    } catch (error) {
        const message = error.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUserStatus = createAsyncThunk('user/update', async(id, thunkAPI)=>{
    try {
        const userRef = doc(db,'users',id)
        await updateDoc(userRef,{
            isAdmin: true
        })
    } catch (error) {
        const message = error.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state)=>initialState,
        updateId:(state,action)=>{
            state.id = action.payload
        },
        resetSingleUser:(state)=>{
            state.singleUser = {}
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchUsers.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchUsers.fulfilled, (state,action)=>{
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(updateUserStatus.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(updateUserStatus.rejected, (state,action)=>{
                state.updateError = true
                state.message = action.payload
                state.isLoading = false
            })
            .addCase(updateUserStatus.fulfilled,(state,action)=>{
                state.isLoading = false
                state.updateSucess = true
                state.isSuccess = true
            })
            .addCase(fetchUser.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(fetchUser.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.singleUser = action.payload
            })
            .addCase(checkAdminStatus.fulfilled,(state,action)=>{
                state.adminStatus = action.payload
            })
    }
})

export const {reset,updateId, resetSingleUser} = userSlice.actions

export default userSlice.reducer