import React from "react";
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

const Header = ({ collapsed, toggle }) => {
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
              placeholder="Search..."
              optionLabelProp="value"
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
                  trigger={["click"]}
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

export default Header;
