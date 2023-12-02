import React from "react";
import { Form, InputNumber } from "antd";

const NUnits = ({ form, edit, formData }) => {
  const { getFieldDecorator } = form;
  const style = edit
    ? {}
    : {
        border: "none",
        backgroundColor: "white",
        color: "black",
      };

  const validate = (rules, value, callback) => {
    if (/[^0-9-]/.test(value)) {
      callback("Please enter valid number!.");
    }
    if (value > 100) {
      callback("Value exceeds maximum limit '100'.");
    } else if (value && value < 1) {
      callback("Value must be greater than '0'.");
    } else if (value === 0) {
      callback("Value must be greater than '0'.");
    }
    callback();
  };
  return (
    <Form.Item label="No.of Units">
      {getFieldDecorator("noOfUnits", {
        initialValue: formData.noOfUnits,
        rules: [
          { required: true, message: "This field is required!" },
          { validator: validate },
        ],
      })(<InputNumber style={style} disabled={!edit} />)}
    </Form.Item>
  );
};

export default NUnits;
