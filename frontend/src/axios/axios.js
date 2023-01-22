import axios from 'axios';

export const axiosUserInstance = axios.create({baseURL:"http://localhost:5000/users"});
export const axiosAdminInstance = axios.create({baseURL:"http://localhost:5000/admin"});
export const axiosGuideInstance = axios.create({baseURL:"http://localhost:5000/guide"});




