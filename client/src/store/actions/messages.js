import * as api from "../../api";
import { showAlert } from "../../utils/alert";
import { scrollToDown } from "../../utils/util";
import { ADD_MESSAGE, GET_MESSAGES, UPDATE_SEEN } from "../actionTypes";

export const setMessages = (emails) => async (dispatch) => {
  try {
    const { data } = await api.getMessages(emails);
    dispatch({ type: GET_MESSAGES, payload: { messages: data.messages } });
  } catch (error) {
    showAlert(error);
  }
};

export const addMessage =
  (email, message, actual, socket) => async (dispatch) => {
    try {
      if (actual) {
        const { data } = await api.sendMessage(email, message);
        dispatch({
          type: ADD_MESSAGE,
          payload: { message: data.message, email },
        });
        socket.emit("message", { email, message: data.message });
      } else {
        dispatch({ type: ADD_MESSAGE, payload: { message, email } });
      }
    } catch (error) {
      showAlert(error);
    }
  };

export const updateSeen = (email, id) => async (dispatch) => {
  try {
    const { data } = await api.updateSeen(id);
    dispatch({ type: UPDATE_SEEN, payload: { email, id } });
  } catch (error) {
    showAlert(error);
  }
};
