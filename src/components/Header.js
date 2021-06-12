import { PageHeader, Button, Descriptions } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const Header = ({ authed, logout }) => {
  const history = useHistory();

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title={<Button onClick={() => history.push("/")}>Home</Button>}
        onClick={() => history.push("/")}
        onBack={() => window.history.back()}
        // subTitle={
        //   <button onClick={() => history.push("/dashboard")}>
        //     Read up on cool blogs
        //   </button>
        // }
        extra={
          authed
            ? [
                <Button
                  key="3"
                  onClick={() => {
                    logout();
                    history.push("/login");
                  }}
                >
                  Logout
                </Button>,
                <Button key="1" type="primary">
                  Profile
                </Button>,
              ]
            : [
                <Button key="2" onClick={() => history.push("/register")}>
                  Register
                </Button>,
                <Button
                  key="1"
                  type="primary"
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>,
              ]
        }
      >
        {/* <Descriptions size="small" column={3}>
          <Descriptions.Item label="Categories"></Descriptions.Item>
        </Descriptions> */}
      </PageHeader>
    </div>
  );
};

export default Header;
