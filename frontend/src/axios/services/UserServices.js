import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosUserInstance } from '../axios'

export const signIn = (formData) => axiosUserInstance.post('/signin', formData);
export const signUp = (formData) => axiosUserInstance.post('/signup', formData);

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
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
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await signUp(formValue)
      const id = response.data.data.userId
      toast.success(response.message);
      navigate(`/verification/${id}`)
      return response;

    } catch (err) {
      return rejectWithValue(err.response)
    }
  })


export const getGuides = async (token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.get('/getGuides', config);
  if (data) {
    return data;
  }
};

export const guideSingle = async (id, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.get(`/guideSingle/${id}`, config);

  if (data) {
    return data;
  }
};

export const verifyOtp = async (otp, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const payload = {
    id: id,
    otp: otp
  };
  const { data } = await axiosUserInstance.post('/verifyOtp', payload, config);
  if (data) {
    return data;
  }
}

export const guideSearch = async (location) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosUserInstance.get(`/guideSearch?location=${location}`, config);
    if (response.data) {
      // navigate('/guideList')
      return response.data;
    }
  } catch (error) {
    return error.response.data.error;
  }
}

export const guideBooking = async (bookingDetails, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosUserInstance.post('/guideBooking', { config, bookingDetails });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

export const orderVerifyPayment = async (token, res, order) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const value = {}
    value.res = res;
    value.order = order;
    const { data } = await axiosUserInstance.post('/verifyPayment', value, config);
    if (data) {
      console.log("orderverify axios", data)
      return data;
    }
  } catch (error) {
    return error;
  }
}

export const getAllBookings = async (id, token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.get(`/getAllBookings/${id}`, config);
  if (data) {
    return data;
  }

}

export const resendOTP = async (values) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosUserInstance.post('/resentOtp', {values, config})
  if (data) {
    return data
  }

}









