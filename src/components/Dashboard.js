import React, { useEffect, useState } from "react";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import ReplyBox from "./ReplyBox";
import Header from "./Header";
import apis from "../api/apis";

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

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
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={allPosts}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.username}
                content={item.body}
                datetime={item.updated_at}
              />
            </li>
          )}
        />
        <ReplyBox />
      </div>
    </div>
  );
};

export default Dashboard;
