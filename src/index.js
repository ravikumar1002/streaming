import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import { AuthProvider } from "./context/auth-context";
import { UserDataProvider } from "./context/user-data-context";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <AuthProvider>
          <UserDataProvider>
          <App />
          </UserDataProvider>
        </AuthProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
