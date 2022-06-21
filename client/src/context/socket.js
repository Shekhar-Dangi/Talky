import socketio from "socket.io-client";
import React from "react";
import { useSelector } from "react-redux";

const ENDPOINT = "http://localhost:8000";


export const socket = socketio.connect(ENDPOINT);
export const SocketContext = React.createContext();
