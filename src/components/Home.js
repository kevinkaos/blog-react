import React from "react";
import { PageHeader } from "antd";
// import moment from "moment";
// import ReplyBox from "./ReplyBox";
import Header from "./Header";
// import apis from "../api/apis";

const Home = ({ authed, logout }) => {
  return (
    <div>
      <Header authed={authed} logout={logout} />
      <div className="dashboard-wrapper">
        <PageHeader title="Home" />
      </div>
    </div>
  );
};

export default Home;
