import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAdminInstance } from '../axios';

export const adminsignIn = (formData) => axiosAdminInstance.post('/adminsignin', formData);
export const adminsignUp = (formData) => axiosAdminInstance.post('/adminsignup', formData);


export const adminlogin = createAsyncThunk("admin/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await adminsignIn(formValue)
    toast.success("Login Successfully");
    navigate('/admin')
    return response.data;

  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const getUserInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/users', config);
  if (data) {
    return data;
  }
};

export const blockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/blockUser/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const unblockUser = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/unblockUser/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const getGuidesInfo = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/guides', config);

  if (data) {
    return data;
  }
};

export const blockGuide = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/blockGuides/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const unblockGuide = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/unblockGuides/${id}`, config);
  if (data.status) {
    return data;
  }
};

export const approveGuides = async (token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/approveGuides', config);
  if (data) {
    return data;
  }
};

export const verifyGuide = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosAdminInstance.get(`/verifyGuides/${id}`, config);

  if (data.status) {
    return data;
  }
};

export const getAllBookings = async (token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosAdminInstance.get('/getAllBookings', config);
  if (data) {
    return data;
  }
} 

