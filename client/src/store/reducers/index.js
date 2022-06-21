import { combineReducers } from "redux";
import user from "./user";
import contacts from "./contacts";
import active from "./active";
import current from "./current";
import messages from "./messages";
import notify from "./notify";
import typing from "./typing";

const reducer = combineReducers({
  user,
  contacts,
  active,
  current,
  messages,
  notify,
  typing,
});

export default reducer;
