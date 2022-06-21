import axios from "axios";
import qs from "qs";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Auth"))
    req.headers.Authorization = `Bearer ${localStorage.getItem("Auth")}`;
  return req;
});

export const login = (formData) => API.post(`/auth/login`, formData);
export const register = (formData) => API.post(`/auth/register`, formData);

export const getContacts = () => API.get(`/user/getContacts`);
export const addContact = (email) => API.put(`/user/addContact`, { email });

export const getDetails = (email) => {
  const payload = { email };
  return API.get(`/user/getDetails?email=${email}`);
};

export const sendMessage = (email, message) =>
  API.post(`/message/send`, { to: email, message });
export const getMessages = (emails) => {
  return API.get(`/message/recieve`, {
    params: { emails },
    paramsSerializer: (param) => qs.stringify(param),
  });
};

export const setOnline = () => {
  return API.put(`/user/setLastSeen`, { online: true });
};

export const setLastSeen = () => {
  return API.put(`/user/setLastSeen`, { online: false });
};

export const updateSeen = (id) => {
  return API.put(`/message/updateSeen`, {id});
}
export const updateMultiSeen = (ids) => {
  return API.put(`/message/updateMultiSeen`, {ids});
}