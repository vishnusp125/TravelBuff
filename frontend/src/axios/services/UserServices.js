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
        toast.success(response.message);
        navigate('/login')
        console.log("in axios user signup");
        console.log(response);
        return response;

    } catch (err) {
      console.log(err);
        return rejectWithValue(err.response)
    }
})


export const getGuides = async () => {
 
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' ,
        'Content-Type': 'application/json',
      },
    };

        const { data } = await axiosUserInstance.get('/getGuides', config);
        console.log("in userservicess");
        console.log(data);
        if (data) {
          return data;
        }
  };

  export const guideSingle = async (id) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
  
    const { data } = await axiosUserInstance.get(`/guideSingle/${id}`, config);
 
    if (data) {
      return data;
    }
  };



