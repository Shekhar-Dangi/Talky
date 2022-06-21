import React, { useContext, useEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getUnSeenIds, updateSeenIds } from "../utils/util";
import { SocketContext } from "../context/socket";
import { getDetails } from "../utils/token";
import { updateSeen } from "../store/actions/messages";

const BodyMain = () => {
  const socket = useContext(SocketContext);
  const messages = useSelector((state) => state.messages);
  const current = useSelector((state) => state.current);
  const { token } = useSelector((state) => state.user);
  const { email } = token ? getDetails(token) : { email: null };
  let data;
  let ids, docs;
  useEffect(() => {
    let res = getUnSeenIds(messages, current.email);
    ids = res.ids;
    docs = res.docs;
  }, [current, messages]);
  const dispatch = useDispatch();
  const checkSeen = () => {
    if(docs){
      data = updateSeenIds(ids, docs);
      data.forEach((d) => {
        dispatch(updateSeen(current.email, d));
        socket.emit("sendseen", { email, to: current.email, id: d });
      });
    }
  };
  useEffect(() => {
    // const { ids, docs } = getUnSeenIds(messages, current.email);
    data = updateSeenIds(ids, docs);
    data.forEach((d) => {
      if (email) {
        dispatch(updateSeen(current.email, d));
        socket.emit("sendseen", {
          email,
          to: current.email,
          id: d,
        });
      }
    });
  }, [current]);
  return (
    <div className="body_main" onScroll={checkSeen}>
      {messages[current.email]?.map((m) => (
        <Message
          seen={m.seen ? true : false}
          id={m._id}
          from={m.from}
          text={m.message}
          time={m.timeStamp}
        />
      ))}
    </div>
  );
};

export default BodyMain;
