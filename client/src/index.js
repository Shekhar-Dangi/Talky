import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import reducers from "./store/reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
