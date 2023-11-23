import React from "react";
import { Row, Col, Form } from "antd";
import ProjectName from "./ProjectName";
import CompletionPercent from "./CompletionPercent";
import Description from "./Description";
import Duedate from "./Duedate";
import NUnits from "./NUnits";
import ServiceType from "./ServiceType";
import Status from "./Status";
import Viewers from "./Viewers";

const FormCreator = Form.create({
  name: "project-details",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        ...props.fields.name,
        value: props.fields.name.value,
      }),
      status: Form.createFormField({
        ...props.fields.status,
        value: props.fields.status.value,
      }),
      serviceType: Form.createFormField({
        ...props.fields.serviceType,
        value: props.fields.serviceType.value,
      }),
      viewers: Form.createFormField({
        ...props.fields.viewers,
        value: props.fields.viewers.value,
      }),
      dueDate: Form.createFormField({
        ...props.fields.dueDate,
        value: props.fields.dueDate.value,
      }),
      nUnits: Form.createFormField({
        ...props.fields.nUnits,
        value: props.fields.nUnits.value,
      }),
      desc: Form.createFormField({
        ...props.fields.desc,
        value: props.fields.desc.value,
      }),
      percentage: Form.createFormField({
        ...props.fields.percentage,
        value: props.fields.percentage.value,
      }),
    };
  },
  onValuesChange(_, values) {
    // console.log(values);
  },
})((props) => {
  const {
    setValidFormData,
    form: { getFieldDecorator, validateFields },
  } = props;

  const handleChange = () => {
    validateFields((errors, values) => {
      setValidFormData({ err: errors, values: values });
    });
  };

  return (
    <Form hideRequiredMark={!props.edit} onChange={handleChange}>
      <Row type="flex" justify="space-between" gutter={32}>
        <Col span={8}>
          <ProjectName
            getFieldDecorator={getFieldDecorator}
            edit={props.edit}
          />
        </Col>
        <Col span={8}>
          <Status
            getFieldDecorator={getFieldDecorator}
            edit={props.edit}
            status={props.fields.status.value}
          />
        </Col>
        <Col span={8}>
          <Viewers
            getFieldDecorator={getFieldDecorator}
            edit={props.edit}
            viewers={props.fields.viewers.value}
          />
        </Col>
      </Row>
      <Row type="flex" justify="space-between" gutter={32}>
        <Col span={8}>
          <Duedate
            getFieldDecorator={getFieldDecorator}
            edit={props.edit}
            date={props.fields.dueDate.value}
          />
        </Col>
        <Col span={8}>
          <NUnits getFieldDecorator={getFieldDecorator} edit={props.edit} />
        </Col>
        <Col span={8}>
          <CompletionPercent
            getFieldDecorator={getFieldDecorator}
            edit={props.edit}
          />
        </Col>
      </Row>
      <ServiceType getFieldDecorator={getFieldDecorator} edit={props.edit} />
      <Description getFieldDecorator={getFieldDecorator} edit={props.edit} />
    </Form>
  );
});

export default FormCreator;
