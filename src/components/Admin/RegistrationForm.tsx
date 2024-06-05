import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import axios from "axios";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>('')

  const onFinish = async (values: {username: string, password: string, email: string, is_admin: boolean}) => {
    try {
      const data = {
        username: values.username,
        password_hash: values.password,
        email: values.email,
        is_admin: values.is_admin
      };
      await axios.post(`/users`,data);
      form.resetFields();
      setError("")
      setSuccessMessage('User Added Successfully');
    } catch (e) {
      setError('Error adding new user')
      console.log("Error", e);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
        {error&&<div>{error}</div>}
        {successMessage&&successMessage}
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="is_admin"
          label="add user as"
          rules={[
            {
              required: true,
              message: "Please pick an item!",
            },
          ]}
        >
          <Radio.Group
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {['admin', 'user'].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Radio.Button
                  style={{ width: "100%", borderRadius: "0.5rem" }}
                  value={item==='admin'}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item}
                  </div>
                </Radio.Button>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;
