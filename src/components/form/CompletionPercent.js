import React from "react";
import { Form, InputNumber } from "antd";

const CompletionPercent = ({ getFieldDecorator, edit }) => {
  const style = edit
    ? {}
    : {
        border: "none",
        backgroundColor: "white",
        color: "black",
        fontWeight: 600,
      };
  const validate = (rule, value, callback) => {
    if (/[^0-9.]/.test(value)) {
      callback("Please enter valid number!.");
    }
    if (value && value > 100) {
      callback("Value exceeds maximum limit '100'.");
    } else if (value && value < 0) {
      callback("Value must be '0' or greater than '0'.");
    }
    callback();
  };
  return (
    <Form.Item label="Completed Percentage:">
      {getFieldDecorator("percentage", {
        rules: [
          { required: true, message: "This Field is required!" },
          { validator: validate },
        ],
      })(<InputNumber style={style} disabled={!edit} />)}
    </Form.Item>
  );
};

export default CompletionPercent;
