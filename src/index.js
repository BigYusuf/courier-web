import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/index.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/main.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { persistor, store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
