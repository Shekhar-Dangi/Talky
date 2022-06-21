import * as api from "../../api";
import { showAlert } from "../../utils/alert";
import { ADD_CONTACT, GET_CONTACTS } from "../actionTypes";

export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await api.getContacts();
    dispatch({ type: GET_CONTACTS, payload: { contacts: data.contacts } });
  } catch (error) {
    showAlert(error);
  }
};

export const addContact =
  (email, actual = true) =>
  async (dispatch) => {
    try {
      if (actual) {
        const data = await api.addContact(email);
        if (data.data.user) {
          dispatch({ type: ADD_CONTACT, payload: { email } });
        }
      } else {
        dispatch({ type: ADD_CONTACT, payload: { email } });
      }
    } catch (error) {
      showAlert(error);
    }
  };
