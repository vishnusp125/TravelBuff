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

  export const Guidesignin = async (value) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosGuideInstance.post(
      '/guidesignin',
      value,
      config
    );
    if (data.status) {
      return data;
    }
  };