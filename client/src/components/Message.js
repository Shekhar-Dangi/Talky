import React from "react";
import { useSelector } from "react-redux";
import { getDetails } from "../utils/token";
import ReactMarkdown from "react-markdown";
import emoji from "node-emoji";

const Message = ({ id, from, text, time, seen }) => {
  const { token } = useSelector((state) => state.user);
  const { email } = token ? getDetails(token) : { email: null };
  return (
    <div id={id} className={`message ${from === email ? "" : "recieved"}`}>
      <p className="para">
        <ReactMarkdown>{emoji.emojify(text)}</ReactMarkdown>
      </p>
      <div className="bottom">
        <p className="small">{time}</p>
        <p className="small">
          {from === email ? (
            seen ? (
              <span class="material-symbols-outlined tick">done_all</span>
            ) : (
              <i className="tick fa-solid fa-check"></i>
            )
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default Message;
