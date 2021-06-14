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
      <div className="dashboard-wrapper">
        <PageHeader title="React/Laravel Blog Demo" />

        <PageHeader
          title={
            <div>
              <Button onClick={() => history.push("/dashboard")}>
                Read up on all the cool blogs
              </Button>
            </div>
          }
        />
        <PageHeader
          title={
            <div>
              <Button onClick={() => history.push("/create-blog")}>
                Create a new blog
              </Button>
            </div>
          }
        />

        <PageHeader title="Features" />
        <ul>
          <li>Authentication/Protected routes</li>
          <li>Comment on blog posts</li>
          <li>Display all posts by category or user</li>
          <li>Search by keywords</li>
          <li>Search by keyword AND category</li>
          <li>Pagination</li>
          <li>Post/edit a blog</li>
          <li>Logged in user profile page</li>
          <li>Post/edit authenticated user</li>
          <li>Blogs ordered by newest/last updated</li>
        </ul>

        <PageHeader title="To be added features" />
        <ul>
          <li>Vote/Like on blog posts</li>
          <li>Vote/Like on comments</li>
          <li>Blog pictures</li>
          <li>User gravatar</li>
          <li>Delete blogs/comments</li>
        </ul>

        <PageHeader title="Register to get started!!" />

        {/* <PageHeader title="Leave a comment about our site!" /> */}
      </div>
    </div>
  );
};

export default Home;
