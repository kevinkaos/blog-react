import React from "react";
import { PageHeader, Button } from "antd";
// import moment from "moment";
// import ReplyBox from "./ReplyBox";
// import Header from "./Header";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      {/* <Header authed={authed} logout={logout} /> */}
      <div className="dashboard-wrapper">
        <PageHeader
          title={
            <div>
              <Button onClick={() => history.push("/dashboard")}>
                Read up on all the cool blogs
              </Button>
            </div>
          }
        />

        {/* <PageHeader title="Leave a comment about our site!" /> */}
      </div>
    </div>
  );
};

export default Home;
