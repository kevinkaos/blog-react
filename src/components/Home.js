import React, { useEffect, useState } from "react";
import { PageHeader, Button } from "antd";
// import moment from "moment";
import ReplyBox from "./ReplyBox";
// import Header from "./Header";
import apis from "../api/apis";
import { useHistory } from "react-router-dom";

const Home = ({ authed, logout }) => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apis.get.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  return (
    <div>
      {/* <Header authed={authed} logout={logout} /> */}
      <div className="dashboard-wrapper">
        <PageHeader title="Home" />
        <div>
          <Button onClick={() => history.push("/dashboard")}>
            Read up on all the cool blogs
          </Button>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {categories.map((category) => (
            <Button
              style={{ marginRight: "1rem", marginTop: "1rem" }}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <PageHeader title="Leave a comment about our site!" />
        <ReplyBox />
      </div>
    </div>
  );
};

export default Home;
