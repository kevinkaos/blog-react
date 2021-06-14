import React, { useEffect, useState } from "react";
import { Form, Input, PageHeader, Select, Button } from "antd";
import apis from "../api/apis";
import { useHistory } from "react-router-dom";

const CreateEditBlog = ({ location: { state } }) => {
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(1);
  const [editBlogValues, setEditBlogValues] = useState({
    body: state ? state.body : "",
    category_id: state ? state.category_id : 1,
    title: state ? state.title : "",
  });
  const history = useHistory();

  useEffect(() => {
    apis.get.getCategories().then((res) => {
      setCategories(res.data.data);
    });

    setEditBlogValues(state);
  }, [state]);

  const onFinish = (values, type) => {
    if (type === "edit") {
      apis.post.updatePost(values, state.id).then((res) => {
        history.push({
          pathname: `/post/${res.data.data.id}`,
          state: res.data.data,
        });
      });
    } else {
      apis.post.createPost(values).then((res) => {
        history.push({
          pathname: `/post/${res.data.data.id}`,
          state: res.data.data,
        });
      });
    }
  };

  const handleSelectChange = (value) => {
    setSelected(value);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

  return (
    <div className="dashboard-wrapper">
      <PageHeader title={state ? "Edit your blog" : "Create a blog"} />
      <Form
        {...formItemLayout}
        initialValues={
          state
            ? {
                title: editBlogValues.title,
                category_id: editBlogValues.category_id,
                body: editBlogValues.body,
              }
            : { title: "", category_id: selected, body: "" }
        }
        name="nest-messages"
        onFinish={(values) => onFinish(values, state ? "edit" : "create")}
      >
        <Form.Item
          name={"title"}
          label="Title"
          {...{
            rules: [
              {
                type: "string",
                required: true,
                message: "Please input a title",
              },
            ],
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"category_id"} label="Category">
          <Select value={selected} onChange={handleSelectChange}>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...{
            rules: [
              {
                type: "string",
                required: true,
                message: "Please input a body",
              },
            ],
          }}
          name={"body"}
          label="Body"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            {state ? "Save Edit" : "Create blog"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEditBlog;
