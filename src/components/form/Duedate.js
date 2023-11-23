import React from "react";
import { Form, DatePicker, Typography } from "antd";
import moment from "moment";

const Duedate = ({ getFieldDecorator, edit, date }) => {
  const dateFormat = "YYYY-MM-DD";

  return (
    <Form.Item label="Due Date">
      {edit ? (
        getFieldDecorator("dueDate", {
          rules: [
            { type: "object", required: true, message: "Please select Date!" },
          ],
        })(<DatePicker format={dateFormat} />)
      ) : (
        <Typography.Text strong style={{ color: "black", marginLeft: 12 }}>
          {moment(date).format(dateFormat)}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export default Duedate;
