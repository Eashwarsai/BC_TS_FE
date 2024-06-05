import { useEffect } from "react";
import { DatePicker, Form, Input, Radio } from "antd";
import dayjs from 'dayjs';
import React from "react";
import { CurrentSuggestion } from "../../constants/TypesAndInterfaces";
const CollectionCreateForm = ({ onFormInstanceReady, data, name }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, [form,onFormInstanceReady]);
  if (data) {
    console.log(data);
    data.sort((item1 : CurrentSuggestion, item2 : CurrentSuggestion)  => {
      const downvotes1 : number = item1?.downvote_count;
      const upvotes1: number  = item1?.upvote_count;
      const downvotes2 : number = item2?.downvote_count;
      const upvotes2 : number = item2?.upvote_count;
      if (upvotes1 === upvotes2) return downvotes1 - downvotes2;
      return upvotes2 - upvotes1;
    });
  }
  return (
    <Form layout="vertical" form={form} name={name}>
      {data ? (
        <Form.Item
          name="suggestion"
          label="Select a suggestion"
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
            {data.map((suggestion, index) => (
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
                  value={suggestion}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {suggestion.place}
                    <div>
                      <span style={{ marginRight: "0.5rem", color: "#48BB78" }}>
                        {suggestion.upvote_count}
                      </span>
                      <span style={{ marginRight: "0.5rem", color: "#F56565" }}>
                        {suggestion.downvote_count}
                      </span>
                    </div>
                  </div>
                </Radio.Button>
              </div>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : (
        <>
          <Form.Item
            label="Name of Event"
            name="EventName"
            rules={[
              {
                required: true,
                message: "Enter a Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label=" Date and time"
            name="DateAndTime"
            rules={[
              {
                required: true,
                message: "Select date and time",
              },
            ]}
          >
            <DatePicker disabledDate={(current)=> current < dayjs().endOf('day')} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </>
      )}
    </Form>
  );
};
export default CollectionCreateForm;
