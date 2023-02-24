import axios from 'axios';

export const axiosUserInstance = axios.create({baseURL:"http://localhost:5000/users"});
export const axiosAdminInstance = axios.create({baseURL:"http://localhost:5000/admin"});
export const axiosGuideInstance = axios.create({baseURL:"http://localhost:5000/guide"});
export const axiosConversationInstance = axios.create({baseURL:"http://localhost:5000/conversations"});
export const axiosMessageInstance = axios.create({baseURL:"http://localhost:5000/messages"});


// export const axiosUserInstance = axios.create({baseURL:"http://54.238.178.62/users"});
// export const axiosAdminInstance = axios.create({baseURL:"http://54.238.178.62/admin"});
// export const axiosGuideInstance = axios.create({baseURL:"http://54.238.178.62/guide"});
// export const axiosConversationInstance = axios.create({baseURL:"http://54.238.178.62/conversations"});
// export const axiosMessageInstance = axios.create({baseURL:"http://54.238.178.62/messages"});

// export const axiosUserInstance = axios.create({baseURL:"https://travelbuffbackend.onrender.com/users"});
// export const axiosAdminInstance = axios.create({baseURL:"https://travelbuffbackend.onrender.com/admin"});
// export const axiosGuideInstance = axios.create({baseURL:"https://travelbuffbackend.onrender.com/guide"});
// export const axiosConversationInstance = axios.create({baseURL:"https://travelbuffbackend.onrender.com/conversations"});
// export const axiosMessageInstance = axios.create({baseURL:"https://travelbuffbackend.onrender.com/messages"});



