import {
  Row,
  Col,
  Icon,
  Input,
  AutoComplete,
  Button,
  Switch,
  Typography,
  Card,
  Tag,
  Spin,
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function getColor(project) {
  let color = "white";
  let currentDate = new Date();
  let date = new Date(project.dueDate);

  if (currentDate > date) {
    color = "red";
  } else if (project.status === "assigned") {
    color = "orange";
  } else if (project.status === "progress") {
    color = "green";
  }

  return color;
}

function getStatus(project) {
  let currentDate = new Date();
  let date = new Date(project.dueDate);

  let message;
  if (currentDate > date) {
    message = "DELAYED";
  } else if (project.status === "assigned") {
    message = "AT RISK";
  } else if (project.status === "progress") {
    message = "ON TRACK";
  }

  return message;
}

let data = ["Planning", "Development", "Content", "Creative", "Closure"];

class ActiveProjects extends Component {
  state = {
    filteredProjects: this.props.activeProjects,
    activeProjects: this.props.activeProjects,
    loading: "",
  };

  componentDidMount() {
    this.setState({ loading: "Loading..." });
    setTimeout(() => {
      this.setState({ loading: "" });
    }, 1000);
  }

  handleChange = (value) => {
    const filteredItems = this.state.activeProjects.filter(
      ({ key, projectName }) =>
        `${key} ${projectName.toUpperCase()}`.indexOf(value.toUpperCase()) !==
        -1
    );
    this.setState({ filteredProjects: filteredItems });
  };

  handleDelete = (key) => {
    this.setState({ loading: "Updating..." });
    setTimeout(() => {
      this.setState({ loading: "" });
    }, 1000);
    this.setState({
      filteredProjects: this.state.filteredProjects.filter(
        (project) => project.key !== key
      ),
      activeProjects: this.state.activeProjects.filter(
        (project) => project.key !== key
      ),
    });
  };

  render() {
    const { filteredProjects, loading } = this.state;

    return (
      <div style={{ margin: 32 }}>
        <Row type="flex" align="middle" justify="space-between">
          <Col>
            <Row type="flex" align="middle" gutter={12}>
              <Col>
                <AutoComplete
                  size="large"
                  style={{ width: "500px" }}
                  placeholder="Type Project Name or Project ID to search..."
                  optionLabelProp="value"
                  onChange={this.handleChange}
                >
                  <Input
                    suffix={<Icon type="search" style={{ color: "#056b6b" }} />}
                  />
                </AutoComplete>
              </Col>
              <Col>
                <Button type="primary" icon="filter" ghost>
                  Filter
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Typography.Text strong>My Primary Projects</Typography.Text>
            <Switch defaultChecked style={{ margin: "0px 12px" }} />
            <Typography.Text strong>All projects</Typography.Text>
          </Col>
        </Row>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            height: "655px",
            overflowY: "scroll",
          }}
        >
          <Spin tip={loading} size="large" spinning={loading}>
            {filteredProjects.map((project) => (
              <Card
                key={project.key}
                bodyStyle={{ padding: "8px 16px" }}
                style={{
                  marginBottom: 12,
                  borderTop: `2px solid ${getColor(project)}`,
                }}
              >
                <div>
                  <Row type="flex" justify="space-between">
                    <Col>
                      <Span style={{ color: "#1890ff" }}>ID: </Span>
                      <Typography.Text>{project.key}</Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text strong>
                        {project.projectName}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Span color="#1890ff">Campaign Name: </Span>
                      <Typography.Text strong>N/A</Typography.Text>
                    </Col>
                    <Col>
                      <Span>{project.viewers.join(" | ")}</Span>
                    </Col>
                    <Col>
                      <Span color="#1890ff">
                        {project.completionPercentage} / 100
                      </Span>
                    </Col>
                  </Row>
                  <Row
                    type="flex"
                    justify="space-between"
                    align="middle"
                    style={{ marginTop: 16 }}
                  >
                    <Col>
                      <Tag color={getColor(project)} key={project.key}>
                        {getStatus(project)}
                      </Tag>
                    </Col>
                    <Col>
                      <div style={{ color: "#1890ff" }}>Start</div>
                      <Typography.Text strong>
                        {project.dueDate}
                      </Typography.Text>
                    </Col>
                    <Col span={12}>
                      <Row type="flex" gutter={0}>
                        {data.map((text, ind) => (
                          <Col style={{ flex: 1, textAlign: "center" }}>
                            <div
                              style={{
                                padding: 8,
                                border: "1px solid #000000a6",
                                borderTopRightRadius:
                                  data.length === ind + 1 ? 16 : 0,
                                borderBottomRightRadius:
                                  data.length === ind + 1 ? 16 : 0,
                                borderTopLeftRadius: 0 === ind ? 16 : 0,
                                borderBottomLeftRadius: 0 === ind ? 16 : 0,
                              }}
                            >
                              {text}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col>
                      <div style={{ color: "#1890ff" }}>Planned Relese</div>
                      <Typography.Text strong>
                        {project.dueDate}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <a onClick={() => this.handleDelete(project.key)}>
                        <Icon type="delete" />
                      </a>
                    </Col>
                  </Row>
                </div>
              </Card>
            ))}
          </Spin>
        </div>
      </div>
    );
  }
}

const Span = styled.span`
  color: #1890ff;
`;

const mapStateToprops = ({ table }) => {
  return {
    activeProjects: table.tableData.filter(
      (data) => data.status !== "completed"
    ),
  };
};
export default connect(mapStateToprops, {})(ActiveProjects);
