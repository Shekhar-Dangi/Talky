import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/socket";
import { addMessage } from "../store/actions/messages";
import { getDetails } from "../utils/token";
import { scrollToDown } from "../utils/util";

const BodyDown = () => {
  const { token } = useSelector((state) => state.user);
  const { email } = getDetails(token);
  let [typing, setTyping] = useState(false);
  let [time, setTime] = useState(undefined);
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const active = useSelector((state) => state.active);
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  function autoResize() {
    let textarea = document.querySelector("#autoresizing");
    if (textarea.scrollHeight > 60) {
      textarea.style.height = "auto";
      textarea.style.height = this.scrollHeight + "px";
    }
  }
 
  const sendMessage = (e) => {
    clearTimeout(time);
    setTyping(false);
    socket.emit("not_typing", { email, to: current.email });
    e.preventDefault();
    dispatch(addMessage(current.email, message, true, socket));
    setMessage("");
    setTimeout(scrollToDown, 500);
  };
  const sendNotTyping = () => {
    setTyping(false);
    socket.emit("not_typing", { email, to: current.email });
  };
  const sendEvent = () => {
    if (!typing) {
      setTyping(true);
      socket.emit("typing", { email, to: current.email });
      setTime(setTimeout(sendNotTyping, 2000));
    } else {
      clearTimeout(time);
      setTime(setTimeout(sendNotTyping, 2000));
    }
  };

  return (
    <div className="body_down">
      <form onSubmit={sendMessage} className="body_down_input">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          
          onKeyDown={sendEvent}
          row={1}
          className="inputForm message_form"
        />
        <button type="submit" className="hidden">
          Send
        </button>
      </form>
    </div>
  );
};

export default BodyDown;
