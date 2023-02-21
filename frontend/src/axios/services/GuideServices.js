import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGuideInstance } from '../axios'


export const Guidesignup = async (value) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosGuideInstance.post(
    '/guidesignup',
    value,
    config
  );
  if (data.status) {
    return data;
  }
};

export const signIn = (formData) => axiosGuideInstance.post('/guideSignin', formData);

export const Guidesignin = createAsyncThunk("guide/guideSignin", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await signIn(formValue)
    toast.success("Login Successfully");
    navigate('/GuideHome')
    return response.data;

  } catch (err) {
    return rejectWithValue(err.response.data)
  }
});

export const activityPost = async (value, token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosGuideInstance.post('/activityPost', value, config);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const languagePost = async (value, token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axiosGuideInstance.post('/languagePost', value, config);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const descriptionPost = async (value, token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosGuideInstance.post('/descriptionPost', value, config);
    if (data.message) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



export const pricePost = async (value, token) => {

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosGuideInstance.post('/pricePost', value, config);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const guideDetails = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosGuideInstance.get(`/guideHome/${id}`, config);
  if (data) {
    return data;
  }
};

export const guideBookings = async (token, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axiosGuideInstance.get(`/guideBookings/${id}`, config);
  if (data) {
    return data;
  }
};

export const editProfile = async (token, values, id) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosGuideInstance.post(`/editProfile/${id}`, values, config);
  if (data) {
    return data;
  }
};

export const activityDelete = async (guideId, index, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosGuideInstance.delete(`/${guideId}/activities/${index}`, config);
    if (data) {
      return data.message;
    }
  } catch (err) {
    console.log(err);
  }
}

export const languageDelete = async (guideId, index, token) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const { data } = await axiosGuideInstance.delete(`/${guideId}/languages/${index}`, config);
    if (data) {
      return data.message;
    }
  } catch (err) {
    console.log(err);
  }
}







