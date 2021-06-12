import React, { useState } from "react";
import { Form, Input, Button, PageHeader } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import apis from "../api/apis";
import { useHistory } from "react-router-dom";

const Login = ({ login }) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const onFinish = (values) => {
    apis.get.csrfCookie().then(() => {
      apis.post
        .login(values)
        .then((res) => {
          if (res.status === 201) {
            login(res.data.token);
            history.push("/");
          }
        })
        .catch((err) => {
          setErrors(err.response.data);
        });
    });
  };

  return (
    <div id="components-form-demo-normal-login" className="center">
      <PageHeader title="Login" />
      {Object.keys(errors).length !== 0 && (
        <div style={{ color: "red" }}>{errors.message}</div>
      )}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          // remember: true,
          username: "",
          password: "",
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
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
