import { createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const initialState = {

    data:null,
    error: null,
    loading: false,
    loggedIn:false,
}

const userSlice = createSlice({

    name: 'user',
    initialState: initialState,
    reducers: {

        setUserData:(state,action)=>{

            state.data = action.payload;
            state.error = null;
            state.loading = false;
            state.loggedIn = true;

        },

    }
})


export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
