import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./utils/PrivateRoute";
import apis from "./api/apis";
import "antd/dist/antd.css";
import Header from "./components/Header";
import Post from "./components/Post";

function App() {
  const [authed, setAuthed] = useState(
    // eslint-disable-next-line eqeqeq
    localStorage.getItem("authed") == "true" || false
  );

  const login = (token) => {
    localStorage.setItem("authed", true);
    localStorage.setItem("token", token);
    setAuthed(true);
  };

  const register = (token) => {
    localStorage.setItem("authed", true);
    localStorage.setItem("token", token);
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
      <Header authed={authed} logout={logout} />
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route
        path="/login"
        render={(props) => <Login {...props} login={login} />}
      />
      <Route
        path="/register"
        render={(props) => <Register {...props} register={register} />}
      />
      <PrivateRoute
        component={Dashboard}
        authed={authed}
        path="/dashboard"
        exact
      />
      <Switch>
        <Route path="/post/:postId" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
