import { getUnSeenIds, updateSeenIds } from "../../utils/util";
import { REMOVE_NOTIFY, SET_CURRENT } from "../actionTypes";

const initialState = null;

const currentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT:
      return action.payload.user;
    default:
      return state;
  }
};

export default currentReducer;
