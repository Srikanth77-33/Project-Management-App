import React from "react";
import { Form, Row, Col } from "antd";
import ProjectName from "./ProjectName";
import Status from "./Status";
import Viewers from "./Viewers";
import Duedate from "./Duedate";
import NUnits from "./NUnits";
import CompletionPercent from "./CompletionPercent";
import ServiceType from "./ServiceType";
import Description from "./Description";
import moment from "moment";

class ProjectDetailsForm extends React.Component {
  state = { formData: this.props.data };
  dateFormat = "YYYY-MM-DD";
  handleChange = () => {
    this.props.form.validateFields((err, values) => {
      this.props.setFormChanged(true);
      if (err) {
        this.props.setValidFormData({ err: err, values: values });
      } else {
        this.props.setValidFormData({ err: null, values: values });
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ formData: this.props.data });
      this.props.setName(this.props.data.projectName);
    }

    if (this.props.cancle) {
      console.log("Changes Cancled!.");
      this.props.form.setFieldsValue({
        ...this.state.formData,
        dueDate: moment(this.state.formData.dueDate, this.dateFormat),
      });
      this.props.setCancle(false);
    }
    if (this.props.save) {
      console.log("Form Saved!.");

      let fields = this.props.form.getFieldsValue([
        "status",
        "viewers",
        "dueDate",
        "projectName",
        "serviceType",
        "description",
        "noOfUnits",
        "completionPercentage",
      ]);
      this.props.setName(fields["projectName"]);
      this.setState({
        formData: {
          ...fields,
          dueDate: moment(fields.dueDate).format(this.dateFormat),
        },
      });
      this.props.updateProjectDetails({
        ...fields,
        dueDate: moment(fields.dueDate).format(this.dateFormat),
        key: this.props.data.key,
      });
      this.props.setSave(false);
    }
  }

  render() {
    const { edit } = this.props;

    return (
      <Form onChange={this.handleChange}>
        <Row type="flex" justify="space-between" gutter={32}>
          <Col span={8}>
            <ProjectName
              {...this.props}
              formData={this.state.formData}
              edit={edit}
            />
          </Col>
          <Col span={8}>
            <Status
              {...this.props}
              formData={this.state.formData}
              edit={edit}
              handleChange={this.handleChange}
            />
          </Col>
          <Col span={8}>
            <Viewers
              {...this.props}
              formData={this.state.formData}
              edit={edit}
              handleChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row type="flex" justify="space-between" gutter={32}>
          <Col span={8}>
            <Duedate
              {...this.props}
              formData={this.state.formData}
              edit={edit}
              handleChange={this.handleChange}
            />
          </Col>
          <Col span={8}>
            <NUnits
              {...this.props}
              edit={edit}
              formData={this.state.formData}
            />
          </Col>
          <Col span={8}>
            <CompletionPercent
              {...this.props}
              edit={edit}
              formData={this.state.formData}
            />
          </Col>
        </Row>
        <ServiceType
          {...this.props}
          edit={edit}
          formData={this.state.formData}
        />
        <Description
          {...this.props}
          edit={edit}
          formData={this.state.formData}
        />
      </Form>
    );
  }
}

export default ProjectDetailsForm = Form.create({ name: "Project_Details" })(
  ProjectDetailsForm
);
