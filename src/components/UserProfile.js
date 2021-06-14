import React, { useEffect, useState } from "react";
import { Drawer, Button, Input } from "antd";
import apis from "../api/apis";
import moment from "moment";

const UserProfile = ({ visible, onClose }) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    apis.get.getAuthenticatedUser().then((res) => {
      setUser(res.data.data);
    });
  }, []);

  const submitEditUser = () => {
    apis.post.updateUser(user).then((res) => {
      setEditing(false);
    });
  };

  const onChangeEmail = (e) => {
    setUser((prevState) => ({ ...prevState, email: e.target.value }));
  };

  const onChangeUsername = (e) => {
    setUser((prevState) => ({ ...prevState, username: e.target.value }));
  };

  return (
    <>
      <Drawer
        title={
          <div>
            <h1 style={{ textAlign: "center" }}>My Profile</h1>
            <Button
              disabled={editing}
              onClick={() => setEditing(true)}
              style={{ width: "100%" }}
            >
              Edit
            </Button>
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <h3>Email:</h3>
        <Input
          onChange={onChangeEmail}
          disabled={!editing}
          style={{ color: "black" }}
          value={user.email}
          bordered={editing}
        />
        <h3>Username:</h3>
        <Input
          onChange={onChangeUsername}
          disabled={!editing}
          style={{ color: "black" }}
          value={user.username}
          bordered={editing}
        />
        <h3>Creation time:</h3>
        <Input
          disabled={true}
          style={{ color: "black" }}
          value={moment(user.created_at).fromNow()}
          bordered={false}
        />
        {editing && (
          <div>
            <Button
              type="primary"
              onClick={() => submitEditUser()}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Submit
            </Button>
            <Button
              type="danger"
              onClick={() => {
                setEditing(false);
              }}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Cancel
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default UserProfile;
