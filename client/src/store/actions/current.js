import * as api from "../../api";
import { showAlert } from "../../utils/alert";
import { SET_CURRENT } from "../actionTypes";

export const setCurrent =
  (email, email2, messages, socket) => async (dispatch) => {
    try {
      const { data } = await api.getDetails(email);
      dispatch({
        type: SET_CURRENT,
        payload: { user: data.user, email: email2, messages, socket },
      });
    } catch (error) {
      showAlert(error);
    }
  };
