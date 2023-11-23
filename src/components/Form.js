import { Button, Row, Col, Typography, Spin } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import { updateProjectDetails } from "../store/table/tableActions";
import { connect } from "react-redux";
import FormCreator from "./form/FormCreator";

const Form = (props) => {
  const dateFormat = "YYYY-MM-DD";
  const { state } = useLocation();

  let [currentFormData, setCurrentFormData] = useState({
    name: { value: state.projectName || "" },
    serviceType: { value: state.serviceType || "" },
    status: { value: state.status || "" },
    viewers: { value: state.viewers || [] },
    dueDate: { value: moment(state.dueDate, dateFormat) || {} },
    nUnits: { value: state.noOfUnits || 0 },
    desc: { value: state.description || "" },
    percentage: { value: state.completionPercentage || 0 },
  });

  const [fields, setFields] = useState({
    name: { value: state.projectName || "" },
    serviceType: { value: state.serviceType || "" },
    status: { value: state.status || "" },
    viewers: { value: state.viewers || [] },
    dueDate: { value: moment(state.dueDate, dateFormat) || {} },
    nUnits: { value: state.noOfUnits || 0 },
    desc: { value: state.description || "" },
    percentage: { value: state.completionPercentage || 0 },
  });

  const [edit, setEdit] = useState(false);
  const [validFormData, setValidFormData] = useState({ err: null, values: {} });
  const [formChanged, setFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (changedFields) => {
    setFormChanged(true);
    setFields((fields) => ({ ...fields, ...changedFields }));
  };

  const handleCancle = () => {
    setEdit(false);
    setFields({ ...currentFormData });
  };

  const handleSubmit = () => {
    const details = {
      key: state.key,
      projectName: fields.name.value,
      serviceType: fields.serviceType.value,
      dueDate: moment(fields.dueDate.value).format(dateFormat),
      status: fields.status.value,
      viewers: fields.viewers.value,
      description: fields.desc.value,
      noOfUnits: fields.nUnits.value,
      completionPercentage: fields.percentage.value,
    };

    setLoading(true);
    setTimeout(() => {
      props.updateProjectDetails(details);
      setFormChanged(false);
      setLoading(false);
      setEdit(false);
    }, 1000);
    setCurrentFormData({ ...fields });
  };

  // moment(date).format(dateFormat)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Row style={{ margin: 24, width: 1000 }}>
        <Col>
          <Row justify="space-between" type="flex" style={{ marginBottom: 16 }}>
            <Col>
              <Typography.Title level={4}>
                Project Name:
                <Typography.Text code>{fields.name.value}</Typography.Text>
              </Typography.Title>
            </Col>
            <Col>
              {edit ? (
                <>
                  <Button
                    type="primary"
                    style={{ marginRight: 16, width: 70 }}
                    disabled={validFormData.err || !formChanged}
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    {loading ? "" : "save"}
                  </Button>
                  <Button
                    type="primary"
                    style={{ width: 70 }}
                    ghost
                    onClick={handleCancle}
                  >
                    cancle
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}
            </Col>
          </Row>
        </Col>
        <Col
          style={{
            border: "1px solid #a6a6a6",
            backgroundColor: "white",
            borderRadius: 6,
          }}
        >
          <Row>
            <Col
              style={{
                backgroundColor: "#1890ff",
                padding: 8,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              }}
            >
              <Typography.Text
                strong
                style={{
                  fontSize: "18px",
                  color: "white",
                }}
              >
                Project Details
              </Typography.Text>
            </Col>
            <Col style={{ padding: 24 }}>
              <Spin tip="Updating..." size="large" spinning={loading}>
                <FormCreator
                  state={state}
                  fields={fields}
                  onChange={handleFormChange}
                  edit={edit}
                  setValidFormData={setValidFormData}
                />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { updateProjectDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
