import { Button, Row, Col, Typography, Spin } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router";

import { updateProjectDetails } from "../store/table/tableActions";
import { connect } from "react-redux";
import ProjectDetailsForm from "./form/ProjectDetailsForm";

const Form = (props) => {
  const { state } = useLocation();

  const [edit, setEdit] = useState(false);
  const [validFormData, setValidFormData] = useState({ err: null, values: {} });
  const [formChanged, setFormChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancle, setCancle] = useState(false);
  const [save, setSave] = useState(false);
  const [name, setName] = useState(state.projectName);

  const handleCancle = () => {
    setEdit(false);
    setCancle(true);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setSave(true);
      setFormChanged(false);
      setLoading(false);
      setEdit(false);
    }, 1000);
  };

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
                <Typography.Text code>{name}</Typography.Text>
              </Typography.Title>
            </Col>
            <Col>
              {edit ? (
                <>
                  <Button
                    type="primary"
                    style={{ marginRight: 16, width: 70 }}
                    disabled={validFormData.err || !formChanged}
                    onClick={handleSave}
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
                <ProjectDetailsForm
                  data={state}
                  edit={edit}
                  setName={setName}
                  setValidFormData={setValidFormData}
                  setFormChanged={setFormChanged}
                  cancle={cancle}
                  setCancle={setCancle}
                  save={save}
                  setSave={setSave}
                  updateProjectDetails={props.updateProjectDetails}
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
