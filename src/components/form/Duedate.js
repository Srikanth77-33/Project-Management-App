import React from "react";
import { Form, DatePicker, Typography } from "antd";
import moment from "moment";

const Duedate = ({ form, edit, formData, handleChange }) => {
  const { getFieldDecorator, setFieldsValue } = form;
  const dateFormat = "YYYY-MM-DD";

  const onChange = (value) => {
    setFieldsValue({ dueDate: value });
    handleChange();
  };

  return (
    <Form.Item label="Due Date">
      {getFieldDecorator("dueDate", {
        initialValue: moment(formData.dueDate, dateFormat),
        rules: [
          { type: "object", required: true, message: "Please select Date!" },
        ],
      })(
        <DatePicker
          format={dateFormat}
          onChange={onChange}
          disabled={!edit}
          style={{ display: edit ? "block" : "none" }}
        />
      )}
      <Typography.Text
        strong
        style={{
          color: "black",
          marginLeft: 12,
          display: !edit ? "block" : "none",
        }}
      >
        {formData.dueDate}
      </Typography.Text>
    </Form.Item>
  );
};

export default Duedate;
