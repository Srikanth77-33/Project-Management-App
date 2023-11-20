import React, { Component } from "react";
import {
  Table,
  Tag,
  Card,
  Pagination,
  Alert,
  Col,
  Dropdown,
  Row,
  Menu,
} from "antd";
import { connect } from "react-redux";
import {
  getTableData,
  updatePageData,
  filterTableData,
} from "../store/table/tableActions";

const columns = [
  {
    title: "Project Name",
    dataIndex: "projectName",
    key: "projectName",
    render: (text) => <a href={`#${text}`}>{text}</a>,
  },
  {
    title: "Service Type",
    dataIndex: "serviceType",
    key: "serviceType",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => {
      let currentDate = new Date();
      let date = new Date(record.dueDate);
      let color;
      let message;
      if (currentDate > date && text !== "success") {
        color = "red";
        message = "DELAYED";
      } else if (text === "assigned") {
        color = "blue";
        message = "ASSIGNED";
      } else if (text === "progress") {
        color = "yellow";
        message = "PROGRESS";
      } else {
        color = "green";
        message = "SUCCESS";
      }
      return (
        <span>
          <Tag color={color} key={record.key}>
            {message}
          </Tag>
        </span>
      );
    },
  },
];

class TableComp extends Component {
  state = {
    filter: "all",
    pageNum: 1,
  };

  componentDidMount() {
    this.props.getTableData();
  }

  filterData = (e) => {
    if (e.key !== this.state.filter) {
      this.setState({ filter: e.key, pageNum: 1 });
      this.props.filterTableData(e.key);
    }
  };

  onPageChange = (page) => {
    this.props.updatePageData(page);
    this.setState({ pageNum: page });
  };

  tableHeader = () => (
    <Row type="flex" justify="space-between">
      <Col>Your Task Actions - {this.props.dataLength}</Col>
      <Col>
        <Dropdown.Button
          overlay={
            <Menu selectedKeys={[this.state.filter]} onClick={this.filterData}>
              <Menu.Item key="all">All</Menu.Item>
              <Menu.Item key="progress">Progress</Menu.Item>
              <Menu.Item key="assigned">Assigned</Menu.Item>
              <Menu.Item key="delay">Delay</Menu.Item>
              <Menu.Item key="success">Success</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <span style={{ width: "75px" }}>
            {this.state.filter.charAt(0).toUpperCase() +
              this.state.filter.slice(1)}
          </span>
        </Dropdown.Button>
      </Col>
    </Row>
  );

  render() {
    const { loading, pageData, errorMsg, dataLength } = this.props;

    return (
      <Card
        title={this.tableHeader()}
        bordered={false}
        headStyle={{ backgroundColor: "#52abff", borderRadius: "4px" }}
        style={{ borderRadius: "4px", height: "724px" }}
      >
        {errorMsg ? (
          <Alert message={errorMsg} type="error" showIcon />
        ) : (
          <Table
            loading={loading}
            columns={columns}
            dataSource={pageData}
            pagination={false}
            footer={() => (
              <Pagination
                current={this.state.pageNum}
                defaultPageSize={9}
                total={dataLength}
                onChange={(page) => this.onPageChange(page)}
              />
            )}
          />
        )}
      </Card>
    );
  }
}

const mapStateToProps = ({
  table: { loading, currentPageData, errorMsg, dataLength },
}) => ({
  loading: loading,
  pageData: currentPageData,
  errorMsg: errorMsg,
  dataLength: dataLength,
});

const mapDispatchToProps = { getTableData, updatePageData, filterTableData };

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);
