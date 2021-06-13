import React, { useEffect, useState } from "react";
import { Form, Input, PageHeader, Select, Button } from "antd";
import apis from "../api/apis";

const CreateEditBlog = () => {
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    apis.get.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
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
      <PageHeader title="Create a blog" />
      <Form
        {...formItemLayout}
        initialValues={{ title: "", category: selected, body: "" }}
        name="nest-messages"
        onFinish={onFinish}
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
        <Form.Item name={"category"} label="Category">
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
            Create blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEditBlog;
