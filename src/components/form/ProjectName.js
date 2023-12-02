import React from "react";
import { Form, Input } from "antd";

const ProjectName = ({ form, edit, formData }) => {
  const { getFieldDecorator } = form;
  const style = edit
    ? {}
    : {
        border: "none",
        backgroundColor: "white",
        color: "black",
        fontWeight: 600,
      };

  const validate = (rule, value, callback) => {
    if (value && /[^a-zA-Z0-9\s]/.test(value)) {
      callback("Please avoid using special characters!");
    }
    callback();
  };

  return (
    <Form.Item label="Project Name">
      {getFieldDecorator("projectName", {
        rules: [
          { required: true, message: "Project Name is required!" },
          { validator: validate },
        ],
        initialValue: formData.projectName,
      })(<Input style={style} disabled={!edit} />)}
    </Form.Item>
  );
};
export default ProjectName;
