import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AppContext from "./components/Context/AppContext";
import "./index.css";
import store, { persistor } from "./store/index";
// import { PersistGate } from "redux-persist/integration/react";
ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <SnackbarProvider maxSnack={3}>
      <AppContext>
        <Router>
          <App />
        </Router>
      </AppContext>
    </SnackbarProvider>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
