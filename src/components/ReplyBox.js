import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import apis from "../api/apis";

const { TextArea } = Input;

const CommentList = ({ comments }) => {
  console.log(comments);
  return (
    <div style={{ padding: "2rem" }}>
      <List
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(props) => (
          <Comment
            author={<span>{props.user.username}</span>}
            content={
              <div>
                <p>{props.body}</p>
              </div>
            }
            datetime={moment(props.updated_at).fromNow()}
          />
        )}
      />
    </div>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Reply
      </Button>
    </Form.Item>
  </>
);

const ReplyBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    apis.get.getCommentsByPostId(postId).then((res) => {
      setComments(res.data.data);
    });
  }, [postId]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments((prevState) => [
        ...prevState,
        { author: "me", content: <p>{value}</p>, datetime: moment().fromNow() },
      ]);
    }, 1000);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default ReplyBox;
