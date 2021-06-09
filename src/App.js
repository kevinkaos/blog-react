import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [authed, setAuthed] = useState(true);

  return (
    <Router>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} authed={authed} />}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/dashboard"
        render={(props) => <Dashboard {...props} authed={authed} />}
      />
    </Router>
  );
}

export default App;
