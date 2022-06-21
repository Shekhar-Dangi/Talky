import React, { useState } from "react";
import { login, signup } from "../store/actions/user";
import "./styles/Auth.css";
import "./styles/Button.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../utils/token";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(undefined);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  return (
    <div className="container">
      <div className="auth_top">
        <i class="fa-solid fa-message chat_icon"></i>
        <h1>Vshecz</h1>
      </div>
      <div className="auth_mid">
        <form>
          {register ? (
            <>
              <input
                className="inputForm"
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="off"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          ) : (
            ""
          )}
          <input
            className="inputForm"
            type="email"
            name="email"
            required
            id="email"
            placeholder="Email address"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="inputForm"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {register && (
            
            <div className="inputForm label">
              <label  for="files">Select profile pic</label><br />
              <input onChange={e => {setFile(e.target.files[0])}}  id="files" type="file" name="file" />
              </div>
        
          )}
          <a
            onClick={() => {
              if (!register) dispatch(login({ email, password }));
              else dispatch(signup({ email, password, name, file }));
              setEmail("");
              setPassword("");
              setName("");
            }}
            className="btn-login"
          >
            {register ? "Register" : "Login"}
          </a>
        </form>
      </div>
      <div className="auth_bottom">
        {register ? (
          <p
            className="identifier"
            onClick={() => {
              setRegister((prev) => !prev);
            }}
          >
            Already have an account? <strong>Log In</strong>
          </p>
        ) : (
          <p
            className="identifier"
            onClick={() => {
              setRegister((prev) => !prev);
            }}
          >
            Don't have an account? <strong>Register</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
