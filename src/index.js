import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AppContext from "./components/Context/AppContext";
import "./index.css";
import store from "./store/index";
ReactDOM.render(
  <Provider store={store}>
    {/* text cái context trong react*/}
    <SnackbarProvider maxSnack={3}>
      <AppContext>
        <Router>
          <App />
        </Router>
      </AppContext>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
