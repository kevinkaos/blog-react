import React, { useEffect, useState } from "react";
import { Comment, List } from "antd";
import moment from "moment";
// import ReplyBox from "./ReplyBox";
import Header from "./Header";
import apis from "../api/apis";

const Dashboard = ({ authed, logout }) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    apis.get.getAllPosts().then((res) => {
      console.log(res.data);
      setAllPosts([...res.data.data.data]);
    });
  }, []);

  return (
    <div>
      <Header authed={authed} logout={logout} />
      <div className="dashboard-wrapper">
        <List
          className="comment-list"
          header={`${allPosts.length && allPosts.length} blogs`}
          itemLayout="horizontal"
          dataSource={allPosts}
          renderItem={(item) => (
            <li>
              <Comment
                actions={[
                  <span key="comment-list-reply-to-0">
                    {item.category.name}
                  </span>,
                  <span key="comment-list-reply-to-0">Reply to</span>,
                ]}
                author={<a href="#">{item.user.username}</a>}
                content={item.body}
                datetime={moment(item.updated_at).fromNow()}
              />
            </li>
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
