import React from "react";
import { Form, Select, Typography } from "antd";

const { Option } = Select;

const Status = ({ form, edit, formData, handleChange }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const handleSelect = (value) => {
    setFieldsValue({ status: value });
    handleChange();
  };
  return (
    <Form.Item label="Status">
      {getFieldDecorator("status", {
        initialValue: formData.status,
        rules: [{ required: true, message: "Status is required!." }],
      })(
        <Select
          onSelect={handleSelect}
          disabled={!edit}
          style={{ display: edit ? "block" : "none" }}
        >
          <Option value="progress">Progress</Option>
          <Option value="assigned">Assigned</Option>
          <Option value="completed">Completed</Option>
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
        {formData.status}
      </Typography.Text>
    </Form.Item>
  );
};

export default Status;
