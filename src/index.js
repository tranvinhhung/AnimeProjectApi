import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/index";
import AppContext from "./components/Context/AppContext";
ReactDOM.render(
  <Provider store={store}>
    {/* text cái context trong react*/}
    <AppContext>
      <Router>
        <App />
      </Router>
    </AppContext>
  </Provider>,
  document.getElementById("root")
);
