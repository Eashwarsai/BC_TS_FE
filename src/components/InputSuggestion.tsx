import { Button, Form, Input, Select } from "antd";
import { categories } from "../constants/Constants";
import { useAddSuggestion } from "../constants/query/PostQuery";
import { CurrentEvent } from "../constants/TypesAndInterfaces";
import React from "react";

const InputSuggestion = ({event } : {event:CurrentEvent}) => {
  const [form] = Form.useForm();
  const { mutate } = useAddSuggestion();
  const handleFinish = (values:{place:string,category:string}) => {
    form.resetFields();
    const updatedValues = { ...values,event_id: event.event_id };
    mutate(updatedValues);
  }
  return (
    <Form
      layout={"inline"}
      form={form}
      style={{
        display: "flex",
        gap: "4px 0",
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        name="place"
        rules={[
          {
            required: true,
            message: "Please input your Suggested place!",
          },
        ]}
      >
        <Input placeholder="eg: cricket @game point gachibowli "/>
      </Form.Item>
      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: "Please input your Category!",
          },
        ]}
      >
        <Select defaultValue={"Choose one"}>
          {categories.map((item, index) => (
            <Select.Option key={index} value={item.key}>
              {item.key}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default InputSuggestion;
