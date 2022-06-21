import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../api";
import { SocketContext } from "../context/socket";
import { setCurrent } from "../store/actions/current";
import { REMOVE_NOTIFY } from "../store/actionTypes";
import emoji from "node-emoji";

const ChatMessage = ({ user, message, notification }) => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const notify = useSelector((state) => state.notify);
  const current = useSelector((state) => state.current);
  const messages = useSelector((state) => state.messages);
  const { token } = useSelector((state) => state.user);
  const { email } = token ? getDetails(token) : { email: null };
  const [data, setData] = useState({});
  useEffect(() => {
    let d;
    const getData = async () => {
      d = await getDetails(user);
      setData(d?.data);
    };
    getData();
  }, []);
  return (
    <div
      onClick={() => {
        console.log(current)
        dispatch(setCurrent(user, email, messages, socket));
        dispatch({ type: REMOVE_NOTIFY, payload: { email: user } });
        console.log(current)
      }}
      className="chat_message"
    >
      <h3>{data?.user?.name ? data?.user?.name : user}</h3>
      <div className="bottom">
        <p>{emoji.emojify(message)}</p>
        <p>{notification ? <i class="fa-solid fa-circle"></i> : ""}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
