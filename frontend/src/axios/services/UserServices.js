import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosUserInstance } from '../axios'

export const signIn = (formData) => axiosUserInstance.post('/signin',formData);
export const signUp = (formData) => axiosUserInstance.post('/signup',formData);  

export const login = createAsyncThunk("auth/login", async({ formValue, navigate, toast },{rejectWithValue}) => {
    try {
        const response = await signIn(formValue)
        toast.success("Login Successfully");
        navigate('/')
        return response.data;

    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});

export const register = createAsyncThunk("auth/register", 
async({ formValue, navigate, toast },{rejectWithValue}) => {
    try {
        const response = await signUp(formValue)
        toast.success("Register Successfully");
        navigate('/')
        return response.data;

    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})