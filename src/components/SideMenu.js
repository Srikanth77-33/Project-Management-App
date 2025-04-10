import React from "react";
import { Layout, Menu, Icon, Affix } from "antd";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";

const logo = process.env.PUBLIC_URL + "/logo.png";

const { Sider } = Layout;

const SideMenu = ({ collapsed }) => {
  const img = collapsed
    ? logo
    : "https://resources.indegene.com/indegene/v2/images/nextjs12/images/logo/indegene-logo.svg";

  return (
    <Affix offsetTop>
      <StyledSider
        width={collapsed ? "auto" : "150px"}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <NavLink to="/">
            <img src={img} alt="Indegene_logo" />
          </NavLink>
        </div>
        <Menu mode="inline" collapsed={collapsed}>
          <Menu.Item key="1">
            <NavLink to="/active-projects">
              <Icon type="project" />
              <span>Active Projects</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/resources">
              <Icon type="file-search" />
              <span>Resources</span>
            </NavLink>
          </Menu.Item>
          {/* <Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="project" />
                <span>Projects</span>
              </span>
            }
          >
            <Menu.Item key="3">
              <NavLink to="/projects/a">
                <Icon type="caret-right" />
                <span>Project-A</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/projects/b">
                <Icon type="caret-right" />
                <span>Project-B</span>
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu> */}
        </Menu>
      </StyledSider>
    </Affix>
  );
};

const StyledSider = styled(Sider)`
  height: 100vh;
  background-color: white;
  box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.5);
  .logo {
    padding: 20px;
    height: 64px;
  }
`;

export default SideMenu;
