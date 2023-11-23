import React from "react";
import { Form, Select, Typography } from "antd";

const { Option } = Select;

const Viewers = ({ getFieldDecorator, edit, viewers }) => {
  return (
    <Form.Item label="viewers">
      {edit ? (
        getFieldDecorator("viewers", {
          rules: [
            { required: true, message: "Please select at least one viewer!." },
          ],
        })(
          <Select mode="multiple" placeholder="Viewers">
            <Option value="1">Sunil</Option>
            <Option value="2">Srikanth</Option>
            <Option value="3">Ragav</Option>
            <Option value="4">Shetty</Option>
            <Option value="5">Reddy</Option>
          </Select>
        )
      ) : (
        <Typography.Text strong style={{ color: "black", marginLeft: 12 }}>
          {viewers.join(", ")}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default Viewers;
