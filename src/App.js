import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
// import PrivateRoute from "./utils/PrivateRoute";
import apis from "./api/apis";
import "antd/dist/antd.css";

function App() {
  const [authed, setAuthed] = useState(
    Boolean(localStorage.getItem("authed")) === true || false
  );

  const login = (token) => {
    localStorage.setItem("authed", true);
    localStorage.setItem("token", token);
    setAuthed(true);
  };

  const register = () => {
    localStorage.setItem("authed", true);
    setAuthed(true);
  };

  const logout = () => {
    apis.post.logout();
    localStorage.removeItem("token");
    localStorage.setItem("authed", false);
    setAuthed(false);
  };

  return (
    <Router history={createBrowserHistory}>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} logout={logout} authed={authed} />}
      />
      <Route
        path="/login"
        render={(props) => <Login {...props} login={login} />}
      />
      <Route
        path="/register"
        render={(props) => <Register {...props} register={register} />}
      />
      <Route
        path="/dashboard"
        render={(props) => (
          <Dashboard {...props} logout={logout} authed={authed} />
        )}
      />
    </Router>
  );
}

export default App;
