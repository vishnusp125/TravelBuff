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

// export const Guidesignin = async (value) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const { data } = await axiosGuideInstance.post(
//     '/guidesignin',
//     value,
//     config
//   );
//   if (data.status) {
//     return data;
//   }
// }; 

export const signIn = (formData) => axiosGuideInstance.post('/guideSignin', formData);

export const Guidesignin = createAsyncThunk("guide/guideSignin", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await signIn(formValue)
    console.log("success from guideservicessss");
    toast.success("Login Successfully");
    navigate('/GuideHome')
    return response.data;

  } catch (err) {
    console.log('error from guide servicessss');
    return rejectWithValue(err.response.data)
  }
});

export const activityPost = async (value) => {
  try {
    const { data } = await axiosGuideInstance.post('/activityPost', value);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const languagePost = async (value) => {
  try {
    const { data } = await axiosGuideInstance.post('/languagePost', value);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const descriptionPost = async (value) => {
  try {
    const { data } = await axiosGuideInstance.post('/descriptionPost', value);
    if (data.message) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};



export const pricePost = async (value) => {
  try {
    const { data } = await axiosGuideInstance.post('/pricePost', value);
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




