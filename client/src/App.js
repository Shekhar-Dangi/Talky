import React, { useEffect } from "react";
import { SocketContext, socket } from "./context/socket";
import Auth from "./components/Auth";
import { useSelector, useDispatch } from "react-redux";
import { getDetails } from "./utils/token";
import Alert from "./components/Alert";
import Chat from "./components/Chat";
import socketIOClient from "socket.io-client";
import Modal from "./components/Modal";
import { getContacts } from "./store/actions/contacts";
import {
  ADD_ACTIVE,
  ADD_CONTACT,
  ADD_NOTIFY,
  REMOVE_ACTIVE,
  REMOVE_TYPING,
  SET_ACTIVE,
  SET_TYPING,
  UPDATE_SEEN,
} from "./store/actionTypes";
import { addContact } from "./store/actions/contacts";
import { addMessage, updateSeen } from "./store/actions/messages";
import { setLastSeen, setOnline } from "./api";
import { isScrolled, scrollToDown } from "./utils/util";

const App = () => {
  const { token } = useSelector((state) => state.user);
  const contacts = useSelector((state) => state.contacts);
  const messages = useSelector((state) => state.messages);
  const active = useSelector((state) => state.active);
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();
  const { email } = token ? getDetails(token) : { email: null };
  const current = useSelector((state) => state.current);
  useEffect(() => {
    if (contacts.length > 0) {
      const { email } = getDetails(token);
      socket.auth = { email, contacts };
      if (!socket.connected) {
        socket.connect();
        setOnline();
      }
      socket.on("users", (users) => {
        dispatch({ type: SET_ACTIVE, payload: { users } });
      });
      socket.on("user", (user) => {
        dispatch({ type: ADD_ACTIVE, payload: { newUser: user } });
      });
      socket.on("remove_user", (user) => {
        dispatch({ type: REMOVE_ACTIVE, payload: { user } });
      });
      socket.on("new_contact", (user) => {
        dispatch({ type: ADD_ACTIVE, payload: { newUser: user } });
        dispatch(addContact(user.email, false));
        socket.emit("contact_response", {
          email,
          userId: socket.id,
          emitTo: user.userId,
        });
      });
      socket.on("contact_response", (user) => {
        dispatch({ type: ADD_ACTIVE, payload: { newUser: user } });
      });
      socket.on("seen", ({ email, id }) => {
        dispatch(updateSeen(email, id));
      });

      socket.on("message", (message) => {
        if (current && current.email === message.from && isScrolled()) {
          socket.emit("sendseen", {
            email: message.to,
            to: message.from,
            id: message._id,
          });
          const newMessage = { ...message, seen: true };
          dispatch(addMessage(message.from, newMessage, false));
          setTimeout(scrollToDown, 500);
        } else {
          dispatch({ type: ADD_NOTIFY, payload: { email: message.from } });
          dispatch(addMessage(message.from, message, false));
        }
      });
      socket.on("user_typing", (email) => {
        dispatch({ type: SET_TYPING, payload: { email } });
      });
      socket.on("user_not_typing", (email) => {
        dispatch({ type: REMOVE_TYPING, payload: { email } });
      });
      return () => socket.removeAllListeners("message");
    }
  }, [contacts, current]);
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>
      <Alert />

      {email ? (
        <>
          <Modal />
          <Chat />
        </>
      ) : (
        <Auth />
      )}
    </SocketContext.Provider>
  );
};

export default App;
