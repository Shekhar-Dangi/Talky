import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetails, getMessages } from "../api";
import jwt_decode from "jwt-decode";


const SideTop = () => {
  const contacts = useSelector((state) => state.contacts);
  const { token } = useSelector((state) => state.user);
  let [ user, setUser ] = useState({});
  useEffect(() => {
    const {email} = jwt_decode(token);
    const get = async () => {
      const { data } = await getDetails(email);
      console.log(email);
      console.log(data);
      setUser(data.user);
    };
    get();
  }, [token]);
  const showModal = () => {
    const modal = document.querySelector(".modal-container");
    modal.style.display = "flex";
  };
  return (
    <div className="side_top">
      {/*  */}
      {user?.image ? (
        <img src={user.image} alt="profile image" className="profile-img" />
      ) : (
        <i class="fa-solid fa-user-tie profile_image"></i>
      )}
      <i class="fa-solid fa-message new_chat" onClick={showModal}></i>
    </div>
  );
};

export default SideTop;
