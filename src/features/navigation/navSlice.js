import {createSlice,   } from "@reduxjs/toolkit";
// createAsyncThunk

const initialState = {
    showNav: false,
    hideNav: true
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers:{
        show: (state)=>{
            state.showNav = true
            state.hideNav = false
        },
        hide: (state)=>{
            state.showNav = false
            state.hideNav = true
        }
    }
})

export const {show,hide} = navSlice.actions

export default navSlice.reducer