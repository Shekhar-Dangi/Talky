import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from "../store/actions/contacts";

const SideBottom = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const messages = useSelector((state) => state.messages);
  const notify = useSelector((state) => state.notify);
  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div className="side_bottom">
      {contacts &&
        contacts.map((contact) => {
          return contact !== "test@gmail.com" ? (
            <ChatMessage
              notification={
                notify?.length > 0 ? notify.includes(contact) : false
              }
              user={contact}
              message={
                messages &&
                messages[contact]?.length > 0 &&
                messages[contact][messages[contact]?.length - 1].message
              }
            />
          ) : (
            ""
          );
        })}
    </div>
  );
};

export default SideBottom;
