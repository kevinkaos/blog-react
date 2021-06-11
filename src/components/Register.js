import { Form, Input, Button, PageHeader } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import apis from "../api/apis";
import { useHistory } from "react-router-dom";

const Register = ({ register }) => {
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    apis.get.csrfCookie().then(() => {
      apis.post.register(values).then((res) => {
        if (res.status === 201) {
          register(res.data.token);
          history.push("/");
        }
      });
    });
  };

  return (
    <div id="components-form-demo-normal-login" className="center">
      <PageHeader title="Register" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          email: "",
          username: "",
          password: "",
          password_confirmation: "",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "Not a valid Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-Mail"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: "Please input your Password again!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password Confirmation"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
