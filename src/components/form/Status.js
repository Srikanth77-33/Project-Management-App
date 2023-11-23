import React from "react";
import { Form, Select, Typography } from "antd";

const { Option } = Select;

const Status = ({ getFieldDecorator, edit, status }) => {
  return (
    <Form.Item label="Status">
      {edit ? (
        getFieldDecorator("status", {
          rules: [{ required: true, message: "Status is required!." }],
        })(
          <Select>
            <Option value="progress">Progress</Option>
            <Option value="assigned">Assigned</Option>
            <Option value="completed">Completed</Option>
          </Select>
        )
      ) : (
        <Typography.Text strong style={{ color: "black", marginLeft: 12 }}>
          {status}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default Status;
