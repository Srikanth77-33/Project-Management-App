import React from "react";
import { Form, Select, Typography } from "antd";

const { Option } = Select;

const Viewers = ({ form, edit, formData, handleChange }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const handleSelect = (value) => {
    setFieldsValue({ viewers: value });
    handleChange();
  };

  return (
    <Form.Item label="viewers">
      {getFieldDecorator("viewers", {
        initialValue: formData.viewers,
        rules: [
          { required: true, message: "Please select at least one viewer!." },
        ],
      })(
        <Select
          mode="multiple"
          placeholder="Viewers"
          onChange={handleSelect}
          disabled={!edit}
          style={{ display: edit ? "block" : "none" }}
        >
          <Option value="Sunil">Sunil</Option>
          <Option value="Srikanth">Srikanth</Option>
          <Option value="Ragav">Ragav</Option>
          <Option value="Shetty">Shetty</Option>
          <Option value="Reddy">Reddy</Option>
        </Select>
      )}
      <Typography.Text
        strong
        style={{
          color: "black",
          marginLeft: 12,
          display: !edit ? "block" : "none",
        }}
      >
        {formData.viewers.join(", ")}
      </Typography.Text>
    </Form.Item>
  );
};

export default Viewers;
