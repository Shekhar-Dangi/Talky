import { ADD_CONTACT, GET_CONTACTS } from "../actionTypes";
import { getContacts } from "../../api";

const initialState = [];

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [action.payload.email, ...state];
    case GET_CONTACTS:
      const contacts = action.payload.contacts;
      return contacts;
    default:
      return state;
  }
};

export default contactsReducer;
