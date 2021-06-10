import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
import apis from "./api/apis";

function App() {
  const [authed, setAuthed] = useState(
    Boolean(sessionStorage.getItem("authed")) === true || false
  );

  const login = () => {
    sessionStorage.setItem("authed", true);
    setAuthed(true);
  };

  const register = () => {
    sessionStorage.setItem("authed", true);
    setAuthed(true);
  };

  const logout = () => {
    sessionStorage.setItem("authed", false);
    setAuthed(false);
  };

  return (
    <Router>
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
