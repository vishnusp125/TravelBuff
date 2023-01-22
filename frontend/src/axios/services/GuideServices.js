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