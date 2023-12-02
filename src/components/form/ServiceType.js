import React from "react";
import { Form, Input } from "antd";

const ServiceType = ({ form, edit, formData }) => {
  const { getFieldDecorator } = form;
  const style = edit
    ? { width: 800 }
    : {
        border: "none",
        backgroundColor: "white",
        color: "black",
        fontWeight: 600,
        width: 800,
      };
  return (
    <Form.Item label="Service Type">
      {getFieldDecorator("serviceType", {
        initialValue: formData.serviceType,
        rules: [
          {
            required: true,
            message: "Please input your text!",
          },
          {
            validator: (rule, value, callback) => {
              if (value.length > 100) {
                callback("Exceeded word limit. Please shorten your content!.");
              }
              callback();
            },
          },
        ],
      })(<Input style={style} disabled={!edit} />)}
    </Form.Item>
  );
};

export default ServiceType;
