import React from "react";
import ChatBody from "./ChatBody";
import ChatSideBar from "./ChatSideBar";
import "./styles/Chat.css";

const Chat = () => {
  return <div>
    <div className="chat_container">
      <ChatSideBar />
      <ChatBody />
    </div>
  </div>;
};

export default Chat;
