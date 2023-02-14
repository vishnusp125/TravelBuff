import { axiosMessageInstance } from '../axios'


export const getMessages = async (conversationId) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosMessageInstance.get('/'+conversationId, config);
    if (data) {
      return data;
    }
  };

  export const postMessages = async (message) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosMessageInstance.post('/',message,config);
    if (data) {
      return data;
    }
  };
