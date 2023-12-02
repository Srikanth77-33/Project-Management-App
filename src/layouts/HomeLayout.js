import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import { SideMenu, Header } from "../components";

class HomeLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <SideMenu collapsed={this.state.collapsed ? 1 : 0} />
        <Layout>
          <Header
            toggle={this.toggle}
            collapsed={this.state.collapsed ? 1 : 0}
          />
          <Outlet />
        </Layout>
      </Layout>
    );
  }
}

export default HomeLayout;
