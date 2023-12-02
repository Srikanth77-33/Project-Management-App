import React, { useState } from "react";
import {
  Icon,
  Row,
  Col,
  AutoComplete,
  Input,
  Badge,
  Dropdown,
  Menu,
  Layout,
  Affix,
} from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const Header = (props) => {
  const { collapsed, toggle, data } = props;
  const nav = useNavigate();

  const [value, setValue] = useState("");

  const handleSelect = (value) => {
    let key = value.split(" ")[0];
    let state = data.filter((item) => item.key === Number(key))[0];
    nav(`/projects/${state.projectName.replace(/ /g, "-")}`, { state: state });
    setValue("");
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Affix offsetTop>
      <StyledHeader>
        <Row type="flex" justify="space-between">
          <Col style={{ color: "white" }}>
            <Icon
              className="trigger"
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={toggle}
            />
          </Col>
          <Col>
            <AutoComplete
              size="large"
              style={{ width: "300px" }}
              value={value}
              placeholder="Search..."
              optionLabelProp="value"
              onSelect={handleSelect}
              onChange={handleChange}
              dataSource={data.map(
                ({ projectName, key }) => `${key} ${projectName}`
              )}
              filterOption={(inputValue, option) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            >
              <Input
                suffix={<Icon type="search" style={{ color: "#056b6b" }} />}
              />
            </AutoComplete>
          </Col>
          <Col style={{ color: "white" }}>
            <Row type="flex" justify="space-between" gutter={16}>
              <Col>
                <Badge dot>
                  <StyledIcon type="bell" />
                </Badge>
              </Col>
              <Col>
                <StyledIcon type="setting" />
              </Col>
              <Col>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="0">1st menu item</Menu.Item>
                      <Menu.Item key="1">2nd menu item</Menu.Item>
                      <Menu.Item key="3">3rd menu item</Menu.Item>
                    </Menu>
                  }
                  trigger={["click", "hover"]}
                >
                  <div>
                    <StyledIcon type="user" />
                    <Icon style={{ fontSize: "11px" }} type="caret-down" />
                  </div>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledHeader>
    </Affix>
  );
};

const StyledIcon = styled(Icon)`
  font-size: 18px;
`;

const StyledHeader = styled(Layout.Header)`
  background: #056bcb;
  padding: 0 16px;
  box-shadow: 0px 25px 20px -20px rgba(0, 0, 0, 0.45);
  position: relative;
  top: -1px;
`;

const mapStateToProps = (state) => {
  return { data: state.table.tableData };
};

export default connect(mapStateToProps, {})(Header);
