import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/actions/messages";
import BodyDown from "./BodyDown";
import BodyMain from "./BodyMain";
import BodyTop from "./BodyTop";
import Welcome from "./Welcome";

const ChatBody = () => {
  const current = useSelector((state) => state.current);
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contacts.length > 0) {
      dispatch(setMessages(contacts));
    }
  }, [contacts]);
  return (
    <div className="chat_body">
      {current ? (
        <>
          {" "}
          <BodyTop />
          <BodyMain />
          <BodyDown />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default ChatBody;
