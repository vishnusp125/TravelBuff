import { axiosConversationInstance } from '../axios'

export const getConversations = async (userid) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  try {
    const data = await axiosConversationInstance.get('/' + userid, config)
    if (data) {
      return data
    }
  } catch (err) {
    console.log(err);
  }
}

export const guideDetails = async (guideId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosConversationInstance.get('/guidedetails/' + guideId, config);
  if (data) {
    return data;
  }
};

export const userDetails = async (userId) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosConversationInstance.get('/userdetails/' + userId, config);
  if (data) {
    return data;
  }
};

export const postConversation = async (userid, guideid) => {
  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ',
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axiosConversationInstance.post('/', { userid, guideid, config })
  if (data) {
    return data
  }
}

