import * as api from "../../api";
import { showAlert } from "../../utils/alert";
import { AUTH, LOGOUT } from "../actionTypes";

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    if (data.token) dispatch({ type: AUTH, payload: { token: data.token } });
  } catch (error) {
    showAlert(error);
  }
};
export const signup = (formData) => async (dispatch) => {
  try {
    const fData = new FormData();
    fData.append("email", formData.email);
    fData.append("password", formData.password);
    fData.append("name", formData.name);
    fData.append("file", formData.file);
    const { data } = await api.register(fData);
    if (data.token) dispatch({ type: AUTH, payload: { token: data.token } });
  } catch (error) {
    showAlert(error);
  }
};
