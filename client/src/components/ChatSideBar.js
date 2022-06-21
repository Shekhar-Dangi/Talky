import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_NOTIFY } from "../store/actionTypes";
import { getNotify } from "../utils/util";
import SideBottom from "./SideBottom";
import SideTop from "./SideTop";

const ChatSideBar = () => {
  const messages = useSelector((state) => state.messages);
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (messages && notify.length == 0) {
  //     const n = getNotify(messages);
  //     n.forEach((nn) => {
  //       dispatch({ type: ADD_NOTIFY, payload:{email: nn} });
  //     });
  //   }
  // }, [messages]);
  return (
    <div className="chat_sidebar">
      <SideTop />
      <SideBottom />
    </div>
  );
};

export default ChatSideBar;
