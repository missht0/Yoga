const axios = require('axios').default;
const axiosOption = {
  // baseURL: 'http://121.5.5.157',
  baseURL: 'http://127.0.0.1:8000',
};
const instance = axios.create(axiosOption);

instance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: { data: any }) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
const request = instance;

class Api {
  Login(data: any) {
    return request.post('/login', data);
  }
  GetClassByMon(data: any) {
    return request.get('/getClassByMon', data);
  }
  AddClass(data: any) {
    return request.post('/addClass', data);
  }
  GetSignupUsers(data: any) {
    return request.get('/getSignupUsers', data);
  }
  AddDefault(data: any) {
    return request.post('/addDefault', data);
  }
}
export default Api;
export const GetClassByMon = (data: any) => request.get('/getClassByMon', data);
