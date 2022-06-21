import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../store/actions/current";
import { knowStatus } from "../utils/util";

const BodyTop = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.current);
  const active = useSelector((state) => state.active);
  const typing = useSelector((state) => state.typing);
  const [online, setOnline] = useState(false);
  const [isTyping, setTyping] = useState(false);
  useEffect(() => {
    setOnline(knowStatus(active, current.email));
  }, [current, active]);
  useEffect(() => {
    setTyping(typing.includes(current.email));
  }, [typing]);
  useEffect(() => {
    dispatch(setCurrent(current.email));
  }, [active]);
  return (
    <div className="body_top">
      {current.image ? (
        <img src={current.image} alt="profile image" className="profile-img" />
      ) : (
        <i class="fa-solid fa-user-tie profile_image"></i>
      )}
      <div className="details">
        <h3>{current.name}</h3>
        <p className="small">
          {isTyping
            ? "typing..."
            : online
            ? "online"
            : "Last seen at " + current.lastSeen}
        </p>
      </div>
    </div>
  );
};

export default BodyTop;
