import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000"});

export const signIn = (formData) => API.post('/users/signin',formData);
export const signUp = (formData) => API.post('/users/signup',formData);    


export const adminsignIn = (formData) => API.post('/admin/adminsignin',formData);
export const adminsignUp = (formData) => API.post('/admin/adminsignup',formData); 
export const getUsers = () => API.get('/admin/adminUserMgt');     
