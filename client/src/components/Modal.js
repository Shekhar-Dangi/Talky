import React, { useState, useContext } from "react";
import "./styles/Modal.css";
import { useDispatch } from "react-redux";
import { addContact } from "../store/actions/contacts";
import { SocketContext } from "../context/socket";
import { getContactByEmail } from "../utils/util";
import { useSelector } from "react-redux";
import { getDetails } from "../utils/token";

const Modal = () => {
  const socket = useContext(SocketContext);
  const active = useSelector((state) => state.active);
  const { token } = useSelector((state) => state.user);
  const userEmail = getDetails(token).email;
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const close = () => {
    document.querySelector(`.modal-container`).style.display = "none";
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <i
          class="fa-solid fa-xmark cross"
          onClick={() => {
            close();
          }}
        ></i>
        <form className="body_down_input">
          <label className="heading" htmlFor="email">
            Email Address :{" "}
          </label>
          <input
            type="email"
            id="email"
            className="inputForm message_form"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <a
            type="submit"
            onClick={async (e) => {
              dispatch(addContact(email));
              document.querySelector(".modal-container").style.display = "none";
              
              socket.emit("new_contact", {email, userEmail,  userId: socket.id});
            }}
            className="btn-login"
          >
            Add Contact
          </a>
        </form>
      </div>
    </div>
  );
};

export default Modal;
