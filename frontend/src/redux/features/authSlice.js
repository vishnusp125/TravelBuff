import { createSlice } from "@reduxjs/toolkit"
import { login, register } from '../../axios/services/UserServices'


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setLogout:(state, action) => {
            localStorage.removeItem("profile");
            state.user = null;
        },
    },
    extraReducers:{
        [login.pending]: (state, action) =>{
            state.loading = true;
        },
        [login.fulfilled]: (state,action) =>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [login.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [register.pending]: (state, action) =>{
            state.loading = true;
        },
        [register.fulfilled]: (state,action) =>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload
        },
        [register.rejected]:(state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    },
});


export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;