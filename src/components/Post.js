import React from "react";
import { Comment } from "antd";
import moment from "moment";
import ReplyBox from "./ReplyBox";

const Post = ({ location: { state } }) => {
  return (
    <div className="dashboard-wrapper">
      <Comment
        actions={[
          <span key="comment-list-reply-to-0">
            <span>{state.category.name}</span>
          </span>,
        ]}
        author={<span>{state.user.username}</span>}
        content={
          <div>
            <h2>{state.title}</h2>
            <p>{state.body}</p>
          </div>
        }
        datetime={moment(state.updated_at).fromNow()}
      />
      <ReplyBox postId={state.id} />
    </div>
  );
};

export default Post;
